// ==UserScript==
// @name         Remove_Duplicate_paramDirectory
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  определяет кол-во дубликатов справочников и позволяет их удалить, оставляя при этом самую НОВУЮ версию.
// @author       gj9159a
// @match        https://klientiks.ru/clientix/admin/paramdirectory
// @match        https://klientiks.ru/clientix/admin/paramDirectory
// @icon         https://www.google.com/s2/favicons?sz=64&domain=klientiks.ru
// @grant        none
// @updateURL    https://raw.githubusercontent.com/gj9159a/tm-k/main/Remove_Duplicate_paramDirectory.js
// @downloadURL  https://raw.githubusercontent.com/gj9159a/tm-k/main/Remove_Duplicate_paramDirectory.js
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {
        let button = document.createElement('button');
        button.textContent = 'Удалить дубликаты справочников';
        button.style.position = 'absolute';
        button.style.right = '10%';
        document.querySelector("#ParamDirectory > div.element-cr._label-left._inline").appendChild(button);

        let duplicateCountLabel = document.createElement('span');
        duplicateCountLabel.style.position = 'absolute';
        duplicateCountLabel.style.right = '27%';
        document.querySelector("#ParamDirectory > div.element-cr._label-left._inline").appendChild(duplicateCountLabel);

        let observer = new MutationObserver(updateDuplicateCount);
        observer.observe(document.querySelector(".p-settings-adminParamDirectory"), { childList: true, subtree: true });

        updateDuplicateCount();

        function updateDuplicateCount() {
            let elements = Array.from(document.querySelectorAll(".p-admin-table_row.BModelSearchListElement"));
            let duplicates = {};

            elements.forEach(el => {
                let name = el.querySelector(".p-admin-table_cell:nth-child(2)").textContent;
                let model = el.querySelector(".p-admin-table_cell:nth-child(3)").textContent;
                let account = el.querySelector(".p-admin-table_cell:nth-child(4)").textContent;
                let key = `${name}-${model}-${account}`;

                if (!duplicates[key]) {
                    duplicates[key] = [];
                }
                duplicates[key].push(el);
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

            duplicateCountLabel.textContent = 'Найдено дубликатов справочников: ';
            duplicateCountLabel.appendChild(countSpan);
        }

        button.addEventListener('click', async (event) => {
            event.preventDefault();

            button.textContent = 'Удаляю дубликаты...';
            button.style.backgroundColor = 'yellow';
            button.style.color = 'black';

            let elements = Array.from(document.querySelectorAll(".p-admin-table_row.BModelSearchListElement"));
            let duplicates = {};

            elements.forEach(el => {
                let name = el.querySelector(".p-admin-table_cell:nth-child(2)").textContent;
                let model = el.querySelector(".p-admin-table_cell:nth-child(3)").textContent;
                let account = el.querySelector(".p-admin-table_cell:nth-child(4)").textContent;
                let key = `${name}-${model}-${account}`;

                if (!duplicates[key]) {
                    duplicates[key] = [];
                }
                duplicates[key].push(el);
            });

            let items = [];
            for (let key in duplicates) {
                if (duplicates[key].length > 1) {
                    duplicates[key].sort((a, b) => b.dataset.id - a.dataset.id);
                    duplicates[key].shift();
                    duplicates[key].forEach(el => {
                        items.push({
                            id: el.dataset.id,
                        });
                    });
                }
            }

            await itemProcessing(items);

            button.textContent = 'Дубликаты удалены!';
            button.style.backgroundColor = 'green';
            button.style.color = 'white';

            setTimeout(() => {
                button.textContent = 'Удалить дубликаты справочников';
                button.style.backgroundColor = '';
                button.style.color = '';
            }, 5000);
        });

        async function itemProcessing(items) {
            let requestCount = 0;
            for (let i = 0; i < items.length; i++) {
                let currentItem = items[i];
                let data = {
                    wid: "deleteParamDirectory",
                    mode: "submit",
                    data: {
                        ...currentItem
                    }
                };
                try {
                    let response = await fetch("https://klientiks.ru/clientix/admin/paramdirectory", {
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
    }, 5000);
})();
