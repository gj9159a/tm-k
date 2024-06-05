// ==UserScript==
// @name         word_editDF
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  редактирует все поля word...word9 в зоне видимости под МКБ-10
// @author       gj9159a
// @match        https://klientiks.ru/clientix/admin/dynamicfields
// @match        https://klientiks.ru/clientix/admin/dynamicFields
// @icon         https://www.google.com/s2/favicons?sz=64&domain=klientiks.ru
// @grant        none
// @updateURL    https://raw.githubusercontent.com/gj9159a/tm-k/main/word_editDF.js
// @downloadURL  https://raw.githubusercontent.com/gj9159a/tm-k/main/word_editDF.js
// ==/UserScript==

(function() {
    'use strict';
    console.info('Starting script...');

    setTimeout(function() {
        console.info('Creating button...');
        let button = document.createElement('button');
        button.textContent = 'Обработать все word...word9 под МКБ-10';
        button.style.position = 'absolute';
        button.style.right = '5%';
        button.style.top = '6%';
        document.querySelector("#DynamicFields > div.element-cr._label-left._inline").appendChild(button);
        console.info('Button created.');

        console.info('Creating field count label...');
        let fieldCountLabel = document.createElement('span');
        fieldCountLabel.style.position = 'absolute';
        fieldCountLabel.style.right = '25%';
        fieldCountLabel.style.top = '6%';
        document.querySelector("#DynamicFields > div.element-cr._label-left._inline").appendChild(fieldCountLabel);
        console.info('Field count label created.');

        console.info('Creating mutation observer...');
        let observer = new MutationObserver(updateFieldCount);
        observer.observe(document.querySelector("#viewDynamicFields"), { childList: true, subtree: true });
        console.info('Mutation observer created.');

        console.info('Updating field count...');
        updateFieldCount();
        console.info('Field count updated.');

        function updateFieldCount() {
            console.info('Getting elements...');
            let elements = Array.from(document.querySelectorAll("#viewDynamicFields .BModelSearchListElement"));
            let fields = {};

            console.info('Processing elements...');
            elements.forEach(el => {
                let field_name = el.children[0].textContent;
                let model = el.children[2].textContent;
                let scenario = el.children[3].textContent;
                let key = `${field_name}-${model}-${scenario}`;

                if (model === 'DynamicObjects' && ['word', 'word1', 'word2', 'word3', 'word4', 'word5', 'word6', 'word7', 'word8', 'word9'].includes(field_name)) {
                    if (!fields[key]) {
                        fields[key] = [];
                    }
                    fields[key].push(el);
                }
            });

            console.info('Counting fields...');
            let fieldCount = 0;
            for (let key in fields) {
                fieldCount += fields[key].length;
            }

            console.info('Creating count span...');
            let countSpan = document.createElement('span');
            countSpan.textContent = fieldCount;

            if (fieldCount === 0) {
                countSpan.style.color = 'green';
            } else {
                countSpan.style.color = 'red';
            }

            console.info('Updating field count label...');
            fieldCountLabel.textContent = 'Найдено полей word...word9: ';
            fieldCountLabel.appendChild(countSpan);
            console.info('Field count label updated.');
        }

        console.info('Adding event listener to button...');
        button.addEventListener('click', async (event) => {
            event.preventDefault();

            console.info('Button clicked. Updating button...');
            button.textContent = 'Обрабатываю поля...';
            button.style.backgroundColor = 'yellow';
            button.style.color = 'black';
            console.info('Button updated.');

            console.info('Getting elements...');
            let elements = Array.from(document.querySelectorAll("#viewDynamicFields .BModelSearchListElement"));
            let fields = {};

            console.info('Processing elements...');
            elements.forEach(el => {
                let field_name = el.children[0].textContent;
                let model = el.children[2].textContent;
                let scenario = el.children[3].textContent;
                let key = `${field_name}-${model}-${scenario}`;

                if (model === 'DynamicObjects' && ['word', 'word1', 'word2', 'word3', 'word4', 'word5', 'word6', 'word7', 'word8', 'word9'].includes(field_name)) {
                    if (!fields[key]) {
                        fields[key] = [];
                    }
                    fields[key].push(el);
                }
            });

            console.info('Creating items...');
            let items = [];
            for (let key in fields) {
                fields[key].forEach(el => {
                    let field_name = el.children[0].textContent;
                    let model = el.children[2].textContent;
                    let scenario = el.children[3].textContent;
                    items.push({
                        id: el.dataset.id,
                        scenario: scenario, // добавляем scenario в объект
                        config2: `{"_autoCompleteAttributes":{"${scenario}":{"${field_name}":{"arg_fields":"self","template":"application.modules.clientix.views.clients.acMkb10","model":"Words","scenario":"wordSuggestMkb10","preload":false,"firstItems":true,"type":"plain","filterByInput":true,"limit":20,"enableNextPageLoad":true,"enabledCustomScroll":true,"delay":700}}},"paramDirectoryOptions":[],"setRules":[["${field_name}","safe"]]}`,
                    });
                });
            }

            console.info('Processing items...');
            await itemProcessing(items);
            console.info('Items processed.');

            console.info('Updating button...');
            button.textContent = 'Поля обработаны!';
            button.style.backgroundColor = 'green';
            button.style.color = 'white';

            setTimeout(() => {
                console.info('Resetting button...');
                button.textContent = 'Обработать все word...word9 под МКБ-10';
                button.style.backgroundColor = '';
                button.style.color = '';
                console.info('Button reset.');
            }, 5000);
        });

        async function itemProcessing(items) {
            console.info('Starting item processing...');
            let requestCount = 0;
            for (let i = 0; i < items.length; i++) {
                let currentItem = items[i];
                let scenario = currentItem.scenario;
                let data = {
                    wid: 'editDynamicField',
                    mode: 'submit',
                    data: {
                        ...currentItem,
                        field_number: 0,
                        scenarios: scenario
                    }
                };
                try {
                    console.info('Sending request...');
                    let response = await fetch('https://klientiks.ru/clientix/admin/dynamicfields', {
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
                    console.info('Request sent.');
                } catch (error) {
                    console.info('Error:', error);
                }
            }
            console.info('JS has completed its work. Total requests:', requestCount);
        }
    }, 5000);
})();
