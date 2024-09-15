// ==UserScript==
// @name         Remove_Duplicate_paramDirectory
// @namespace    http://tampermonkey.net/
// @version      1.1.1
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
        button.textContent = 'Удалить все дубликаты справочников, оставив новейшие';
        button.style.position = 'absolute';
        button.style.right = '10%';
        button.style.top = '5%';
        document.querySelector("#ParamDirectory > div.element-cr._label-left._inline").appendChild(button);

        let viewButton = document.createElement('button');
        viewButton.textContent = 'Посмотреть и удалить дубликаты справочников вручную';
        viewButton.style.position = 'absolute';
        viewButton.style.right = '10%';
        viewButton.style.top = '9%';
        document.querySelector("#ParamDirectory > div.element-cr._label-left._inline").appendChild(viewButton);

        let duplicateCountLabel = document.createElement('span');
        duplicateCountLabel.style.position = 'absolute';
        duplicateCountLabel.style.right = '10%';
        document.querySelector("#ParamDirectory > div.element-cr._label-left._inline").appendChild(duplicateCountLabel);

        let observer = new MutationObserver(updateDuplicateCount);
        observer.observe(document.querySelector(".p-settings-adminParamDirectory"), { childList: true, subtree: true });

        updateDuplicateCount();

        function updateDuplicateCount() {
            let elements = Array.from(document.querySelectorAll(".p-admin-table_row.BModelSearchListElement"));
            let duplicates = {};

            elements.forEach(el => {
                let name = el.querySelector(".p-admin-table_cell:nth-child(2)").textContent.trim();
                let model = el.querySelector(".p-admin-table_cell:nth-child(3)").textContent.trim();
                let account = el.querySelector(".p-admin-table_cell:nth-child(4)").textContent.trim();
                let key = `${name}-${model}-${account}`;

                if (!duplicates[key]) {
                    duplicates[key] = [];
                }
                duplicates[key].push({ element: el });
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

        viewButton.addEventListener('click', (event) => {
            event.preventDefault();

            let duplicateList = document.getElementById('duplicateList');

            if (viewButton.textContent === 'Посмотреть и удалить дубликаты справочников вручную') {
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

                duplicateList = document.createElement('div');
                duplicateList.id = 'duplicateList';
                duplicateList.style.position = 'absolute';
                duplicateList.style.top = '50%';
                duplicateList.style.left = '75%';
                duplicateList.style.transform = 'translate(-50%, -50%)';
                duplicateList.style.backgroundColor = 'white';
                duplicateList.style.border = '1px solid black';
                duplicateList.style.padding = '10px';
                duplicateList.style.zIndex = '1000';
                duplicateList.style.maxHeight = '500px';
                duplicateList.style.maxWidth = '500px';
                duplicateList.style.overflowY = 'auto';

                for (let key in duplicates) {
                    if (duplicates[key].length > 1) {
                        let title = document.createElement('h3');
                        title.textContent = `Дубликаты для ключа: ${key}`;
                        duplicateList.appendChild(title);

                        let maxIdElement = duplicates[key].reduce((maxEl, currentEl) => {
                            return parseInt(currentEl.dataset.id) > parseInt(maxEl.dataset.id) ? currentEl : maxEl;
                        });

                        duplicates[key].forEach((el) => {
                            let item = document.createElement('div');
                            item.textContent = `ID: ${el.dataset.id}, Название: ${el.querySelector(".p-admin-table_cell:nth-child(2)").textContent}`;

                            if (el === maxIdElement) {
                                item.style.color = 'green';
                            } else {
                                item.style.color = 'red';
                            }

                            let deleteButton = document.createElement('button');
                            deleteButton.textContent = '✖';
                            deleteButton.style.marginLeft = '10px';
                            deleteButton.addEventListener('click', async () => {
                                await itemProcessing([{ id: el.dataset.id }]);
                                item.remove();
                            });

                            item.appendChild(deleteButton);
                            duplicateList.appendChild(item);
                        });
                    }
                }

                document.body.appendChild(duplicateList);

                viewButton.textContent = 'Закрыть просмотр дубликатов справочников';
                viewButton.style.backgroundColor = 'lightcoral';
            } else {
                if (duplicateList) {
                    document.body.removeChild(duplicateList);
                }

                viewButton.textContent = 'Посмотреть и удалить дубликаты справочников вручную';
                viewButton.style.backgroundColor = '';
            }
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
