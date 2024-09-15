// ==UserScript==
// @name         autoadd_paramDirectory
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  Автоматизированное добавление и заполнение справочников
// @author       gj9159a
// @match        https://klientiks.ru/clientix/admin/paramdirectory
// @match        https://klientiks.ru/clientix/admin/paramDirectory
// @icon         https://www.google.com/s2/favicons?sz=64&domain=klientiks.ru
// @grant        none
// @updateURL    https://raw.githubusercontent.com/gj9159a/tm-k/main/autoadd_paramDirectory.js
// @downloadURL  https://raw.githubusercontent.com/gj9159a/tm-k/main/autoadd_paramDirectory.js
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {
        let button = document.createElement('button');
        button.textContent = 'Добавить и заполнить справочники';
        button.style.position = 'absolute';
        button.style.right = '10%';
        button.style.top = '13%';
        document.querySelector("#ParamDirectory > div.element-cr._label-left._inline").appendChild(button);

        let container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = '17%';
        container.style.right = '27%';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '10px';
        document.querySelector("#ParamDirectory > div.element-cr._label-left._inline").appendChild(container);

        let delimiterInput = document.createElement('textarea');
        delimiterInput.rows = 1;
        delimiterInput.cols = 1;
        delimiterInput.placeholder = 'Введите символ разделителя';
        delimiterInput.style.display = 'none';
        delimiterInput.style.whiteSpace = 'nowrap';
        container.appendChild(delimiterInput);

        let rowContainer = document.createElement('div');
        rowContainer.style.display = 'flex';
        rowContainer.style.gap = '10px';
        container.appendChild(rowContainer);

        let nameInput = document.createElement('textarea');
        nameInput.rows = 20;
        nameInput.cols = 30;
        nameInput.placeholder = 'Введите названия справочников, каждый с новой строки';
        nameInput.style.display = 'none';
        nameInput.style.whiteSpace = 'nowrap';
        rowContainer.appendChild(nameInput);

        let valueInput = document.createElement('textarea');
        valueInput.rows = 20;
        valueInput.cols = 30;
        valueInput.placeholder = 'Введите значения для каждого справочника из области слева в соответствующие строки, используя необходимый разделитель (например, Слабый#Нормальный#Сильный)';
        valueInput.style.display = 'none';
        valueInput.style.whiteSpace = 'nowrap';
        rowContainer.appendChild(valueInput);

        let addButton = document.createElement('button');
        addButton.textContent = 'Добавить справочники';
        addButton.style.position = 'absolute';
        addButton.style.right = '10%';
        addButton.style.top = '17%';
        addButton.style.display = 'none';
        document.querySelector("#ParamDirectory > div.element-cr._label-left._inline").appendChild(addButton);

        let fillButton = document.createElement('button');
        fillButton.textContent = 'Заполнить справочники';
        fillButton.style.position = 'absolute';
        fillButton.style.right = '10%';
        fillButton.style.top = '21%';
        fillButton.style.display = 'none';
        document.querySelector("#ParamDirectory > div.element-cr._label-left._inline").appendChild(fillButton);

        let goAddButton = document.createElement('button');
        goAddButton.textContent = 'Поехали добавлять справочники!';
        goAddButton.style.position = 'absolute';
        goAddButton.style.right = '10%';
        goAddButton.style.top = '17%';
        goAddButton.style.display = 'none';
        document.querySelector("#ParamDirectory > div.element-cr._label-left._inline").appendChild(goAddButton);

        let goFillButton = document.createElement('button');
        goFillButton.textContent = 'Поехали заполнять справочники!';
        goFillButton.style.position = 'absolute';
        goFillButton.style.right = '10%';
        goFillButton.style.top = '17%';
        goFillButton.style.display = 'none';
        document.querySelector("#ParamDirectory > div.element-cr._label-left._inline").appendChild(goFillButton);

        let stopButton = document.createElement('button');
        stopButton.textContent = 'На сегодня хватит';
        stopButton.style.position = 'absolute';
        stopButton.style.right = '10%';
        stopButton.style.top = '13%';
        stopButton.style.display = 'none';
        document.querySelector("#ParamDirectory > div.element-cr._label-left._inline").appendChild(stopButton);

        button.addEventListener('click', function(event) {
            event.preventDefault();
            button.style.display = 'none';
            addButton.style.display = 'inline-block';
            fillButton.style.display = 'inline-block';
            stopButton.style.display = 'inline-block';
        });

        stopButton.addEventListener('click', function(event) {
            event.preventDefault();
            button.style.display = 'inline-block';
            delimiterInput.style.display = 'none';
            nameInput.style.display = 'none';
            valueInput.style.display = 'none';
            addButton.style.display = 'none';
            fillButton.style.display = 'none';
            goAddButton.style.display = 'none';
            goFillButton.style.display = 'none';
            stopButton.style.display = 'none';
        });

        addButton.addEventListener('click', function(event) {
            event.preventDefault();
            addButton.style.display = 'none';
            fillButton.style.display = 'none';
            delimiterInput.style.display = 'inline-block';
            nameInput.style.display = 'inline-block';
            goAddButton.style.top = '17%';
            goAddButton.style.display = 'inline-block';
            stopButton.style.display = 'inline-block';
        });

        fillButton.addEventListener('click', function(event) {
            event.preventDefault();
            fillButton.style.display = 'none';
            addButton.style.display = 'none';
            nameInput.style.display = 'inline-block';
            valueInput.style.display = 'inline-block';
            goFillButton.style.top = '17%';
            goFillButton.style.display = 'inline-block';
            stopButton.style.display = 'inline-block';
        });

        goAddButton.addEventListener('click', async function(event) {
            event.preventDefault();
            goAddButton.textContent = 'Добавляю справочники...';
            goAddButton.style.backgroundColor = 'yellow';

            let attributes = nameInput.value.split('\n');
            let separator = delimiterInput.value;
            let items = attributes.map(attribute => ({
                attribute: attribute,
                model: 'DynamicObjects',
                separator: separator
            }));

            await itemProcessing(items);

            goAddButton.textContent = 'Справочники добавлены!';
            goAddButton.style.backgroundColor = 'green';
            goAddButton.style.color = 'white';

            setTimeout(function() {
                alert('Сейчас страница будет обновлена, после чего можете заполнить только что созданные справочники, нажав кнопку "Заполнить справочники"');
                location.reload();
            }, 500);
        });

        goFillButton.addEventListener('click', async function(event) {
            event.preventDefault();
            goFillButton.textContent = 'Заполняю справочники...';
            goFillButton.style.backgroundColor = 'yellow';

            let names = nameInput.value.split('\n');
            let values = valueInput.value.split('\n');
            let items = [];

            for (let i = 0; i < names.length; i++) {
                let name = names[i];
                let value = values[i];

                let id = await findIdByName(name);
                if (id) {
                    items.push({
                        id: id,
                        key_values: value
                    });
                }
            }

            await itemProcessing(items);

            goFillButton.textContent = 'Справочники заполнены!';
            goFillButton.style.backgroundColor = 'green';
            goFillButton.style.color = 'white';
        });

        async function findIdByName(name) {
            let rows = document.querySelectorAll('.p-admin-table_row.BModelSearchListElement');
            for (let row of rows) {
                let rowName = row.querySelector('.p-admin-table_cell:nth-child(2)').textContent.trim();
                if (rowName === name) {
                    return row.getAttribute('data-id');
                }
            }
            return null;
        }

        async function itemProcessing(items) {
            let requestCount = 0;
            for (let i = 0; i < items.length; i++) {
                let currentItem = items[i];
                let data = {
                    wid: 'editParamDirectory',
                    mode: 'submit',
                    data: {
                        ...currentItem
                    }
                };
                try {
                    let response = await fetch('https://klientiks.ru/clientix/admin/paramdirectory', {
                        method: 'POST',
                        headers: {
                            'accept': '*/*',
                            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            'x-requested-with': 'XMLHttpRequest'
                        },
                        body: 'data=' + encodeURIComponent(JSON.stringify([data])),
                        credentials: 'include'
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
