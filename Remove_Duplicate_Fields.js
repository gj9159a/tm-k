// ==UserScript==
// @name         Remove_Duplicate_Fields
// @namespace    http://tampermonkey.net/
// @version      1.0.10
// @description  определяет кол-во дубликатов динполей и позволяет их удалить, оставляя при этом самую НОВУЮ версию динполя.
// @author       gj9159a
// @match        https://klientiks.ru/clientix/admin/dynamicfields
// @match        https://klientiks.ru/clientix/admin/dynamicFields
// @match        https://klientiks.ru/clientix/admin/DynamicFields
// @icon         https://www.google.com/s2/favicons?sz=64&domain=klientiks.ru
// @grant        none
// @updateURL    https://raw.githubusercontent.com/gj9159a/tm-k/main/Remove_Duplicate_Fields.js
// @downloadURL  https://raw.githubusercontent.com/gj9159a/tm-k/main/Remove_Duplicate_Fields.js
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(() => {
        let scheduled = false;

        let button = document.createElement('button');
        button.textContent = 'Удалить дубликаты динполей';
        button.style.position = 'absolute';
        button.style.right = '10%';
        document.querySelector("#DynamicFields > div.element-cr._label-left._inline").appendChild(button);

        let duplicateCountLabel = document.createElement('span');
        duplicateCountLabel.style.position = 'absolute';
        duplicateCountLabel.style.right = '25%';
        document.querySelector("#DynamicFields > div.element-cr._label-left._inline").appendChild(duplicateCountLabel);

        let observer = new MutationObserver(() => {
            if (!scheduled) {
                scheduled = true;
                requestAnimationFrame(updateDuplicateCount);
            }
        });

        observer.observe(document.querySelector("#viewDynamicFields"), { childList: true, subtree: true });

        updateDuplicateCount();

        function updateDuplicateCount() {

            let allElements = Array.from(document.querySelectorAll("#viewDynamicFields .BModelSearchListElement"));
            allElements.forEach(el => {
                el.removeAttribute('Remove_Duplicate_Fields');
            });

            let elements = Array.from(document.querySelectorAll("#viewDynamicFields .BModelSearchListElement:not([Remove_Duplicate_Fields='true'])"));
            let duplicates = {};

            elements.forEach(el => {
                let field_name = el.children[0].textContent;
                let model = el.children[2].textContent;
                let scenario = el.children[3].textContent;
                let key = `${field_name}-${model}-${scenario}`;

                if (!duplicates[key]) {
                    duplicates[key] = [];
                }
                duplicates[key].push(el);
                el.setAttribute('Remove_Duplicate_Fields', 'true');
            });

            let duplicateCount = 0;
            for (let key in duplicates) {
                if (duplicates[key].length > 1) {
                    duplicateCount += duplicates[key].length - 1;
                }
            }

            let countSpan = document.createElement('span');
            countSpan.textContent = duplicateCount;

            if (duplicateCount === 0) {
                countSpan.style.color = 'green';
            } else {
                countSpan.style.color = 'red';
            }

            duplicateCountLabel.textContent = 'Найдено дубликатов динполей: ';
            duplicateCountLabel.appendChild(countSpan);

            scheduled = false;
        }

        button.addEventListener('click', async (event) => {
            event.preventDefault();

            button.textContent = 'Удаляю дубликаты...';
            button.style.backgroundColor = 'yellow';
            button.style.color = 'black';

            let elements = Array.from(document.querySelectorAll("#viewDynamicFields .BModelSearchListElement[Remove_Duplicate_Fields='true']"));
            let duplicates = {};

            elements.forEach(el => {
                let field_name = el.children[0].textContent;
                let model = el.children[2].textContent;
                let scenario = el.children[3].textContent;
                let key = `${field_name}-${model}-${scenario}`;

                if (!duplicates[key]) {
                    duplicates[key] = [];
                }
                duplicates[key].push(el);
                el.setAttribute('Remove_Duplicate_Fields', 'true');
            });

            let items = [];
            for (let key in duplicates) {
                if (duplicates[key].length > 1) {
                    duplicates[key].sort((a, b) => b.dataset.id - a.dataset.id);
                    duplicates[key].shift();
                    duplicates[key].forEach(el => {
                        items.push({
                            row_id: el.dataset.id,
                            field_number: 0,
                            field_name: el.children[0].textContent
                        });
                    });
                }
            }

            await itemProcessing(items);

            button.textContent = 'Дубликаты удалены!';
            button.style.backgroundColor = 'green';
            button.style.color = 'white';

            setTimeout(() => {
                button.textContent = 'Удалить дубликаты динполей';
                button.style.backgroundColor = '';
                button.style.color = '';
            }, 5000);
        });

        async function itemProcessing(items) {
            let requestCount = 0;
            for (let i = 0; i < items.length; i++) {
                let currentItem = items[i];
                let data = {
                    wid: "deleteDynamicField",
                    mode: "submit",
                    data: {
                        ...currentItem
                    }
                };
                try {
                    let response = await fetch("https://klientiks.ru/clientix/admin/dynamicfields", {
                        method: "POST",
                        headers: {
                            "accept": "*/*",
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                            "x-requested-with": "XMLHttpRequest"
                        },
                        body: "data=" + encodeURIComponent(JSON.stringify([data])),
                        credentials: "include"
                    });
                    let result = await response.json();
                    console.table(result);
                    requestCount++;
                } catch (error) {
                    console.info('Error:', error);
                }
            }
            console.info('JS has completed its work. Total requests:', requestCount);
        }
    }, 3000);
})();
