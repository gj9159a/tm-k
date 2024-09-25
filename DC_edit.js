// ==UserScript==
// @name         DC_edit
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  вносит всем карточкам "Название одной сущности"
// @author       gj9159a
// @match        https://klientiks.ru/clientix/admin/dynamiccards
// @match        https://klientiks.ru/clientix/admin/dynamicCards
// @icon         https://www.google.com/s2/favicons?sz=64&domain=klientiks.ru
// @grant        none
// @updateURL    https://raw.githubusercontent.com/gj9159a/tm-k/main/DC_edit.js
// @downloadURL  https://raw.githubusercontent.com/gj9159a/tm-k/main/DC_edit.js
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {
        let button = document.createElement('button');
        button.textContent = 'Обработать все карточки под ЕГИСЗ';
        button.style.position = 'absolute';
        button.style.right = '5%';
        button.style.top = '5%';
        document.querySelector("#viewDynamicCards > div").appendChild(button);

        button.addEventListener('click', async (event) => {
            event.preventDefault();

            button.textContent = 'Обрабатываю карточки...';
            button.style.backgroundColor = 'yellow';
            button.style.color = 'black';

            let items = $W.viewDynamicCards.allListItems.map(item => ({
                id: item.id,
                name: item.name,
                item_name: item.name
            }));

            await itemProcessing(items);

            button.textContent = 'Карточки обработаны!';
            button.style.backgroundColor = 'green';
            button.style.color = 'white';

            setTimeout(() => {
                button.textContent = 'Обработать все карточки под ЕГИСЗ';
                button.style.backgroundColor = '';
                button.style.color = '';
            }, 5000);
        });

        async function itemProcessing(items) {
            let requestCount = 0;
            for (let i = 0; i < items.length; i++) {
                let currentItem = items[i];
                let data = {
                    wid: 'editDynamicCard',
                    mode: 'submit',
                    data: {
                        id: currentItem.id,
                        name: currentItem.name,
                        item_name: currentItem.item_name
                    }
                };
                try {
                    let response = await fetch('https://klientiks.ru/clientix/admin/dynamiccards', {
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
