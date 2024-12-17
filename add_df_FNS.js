// ==UserScript==
// @name         add_df_FNS
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  добавляет необходимые поля для справки ФНС в карточку клиента.
// @author       gj9159a
// @match        https://klientiks.ru/clientix/admin/dynamicfields
// @match        https://klientiks.ru/clientix/admin/dynamicFields
// @match        https://klientiks.ru/clientix/admin/DynamicFields
// @icon         https://www.google.com/s2/favicons?sz=64&domain=klientiks.ru
// @grant        none
// @updateURL    https://raw.githubusercontent.com/gj9159a/tm-k/main/add_df_FNS.js
// @downloadURL  https://raw.githubusercontent.com/gj9159a/tm-k/main/add_df_FNS.js
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(() => {
        const container = document.querySelector("#DynamicFields > div.element-cr._label-left._inline");

        // Create "Справка ФНС" button
        const fnsButton = createButton('Справка ФНС', '5%', '22%');
        container.appendChild(fnsButton);

        // Create "Добавить поля" and "Отмена" buttons (hidden initially)
        const addFieldsButton = createButton('Добавить поля', '5%', '22%', true);
        const cancelButton = createButton('Отмена', '5%', '26%', true);
        container.appendChild(addFieldsButton);
        container.appendChild(cancelButton);

        // Event listener for "Справка ФНС" button
        fnsButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent page refresh
            fnsButton.style.display = 'none';
            addFieldsButton.style.display = 'block';
            cancelButton.style.display = 'block';
        });

        // Event listener for "Отмена" button
        cancelButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent any default action
            reset();
        });

        // Event listener for "Добавить поля" button
        addFieldsButton.addEventListener('click', async (event) => {
            event.preventDefault(); // Prevent any default action
            addFieldsButton.textContent = 'Добавляю поля...';
            addFieldsButton.style.backgroundColor = 'yellow';

            await addFNSFields();

            addFieldsButton.textContent = 'Поля добавлены!';
            addFieldsButton.style.backgroundColor = 'green';
            addFieldsButton.style.color = 'white';

            setTimeout(reset, 5000);
        });

        function reset() {
            fnsButton.style.display = 'block';
            addFieldsButton.style.display = 'none';
            cancelButton.style.display = 'none';
            addFieldsButton.textContent = 'Добавить поля';
            addFieldsButton.style.backgroundColor = '';
            addFieldsButton.style.color = '';
        }

        async function addFNSFields() {
            const fields = [
                { name: 'fns_collapsible', label: '[НОВАЯ Справка ФНС] Если плательщик и пациент РАЗНЫЕ лица', model: 'Clients', scenarios: 'edit', type: 'collapsible', config: '{"position":"500","elementOrder":1,"items":["fns_payer_f","fns_payer_i","fns_payer_o","fns_payer_birthdate","fns_payer_inn","fns_payer_passport_serial","fns_payer_passport_number","fns_payer_passport_date"]}', position: '500' },
                { name: 'fns_payer_f', label: 'Фамилия плательщика', model: 'Clients', scenarios: 'edit', type: 'text', config: '{"position":"501","elementOrder":1}', position: '501' },
                { name: 'fns_payer_i', label: 'Имя плательщика', model: 'Clients', scenarios: 'edit', type: 'text', config: '{"position":"502","elementOrder":1}', position: '502' },
                { name: 'fns_payer_o', label: 'Отчество плательщика', model: 'Clients', scenarios: 'edit', type: 'text', config: '{"position":"503","elementOrder":1}', position: '503' },
                { name: 'fns_payer_birthdate', label: 'Дата рождения плательщика', model: 'Clients', scenarios: 'edit', type: 'text', config: '{"position":"504","elementOrder":1,"getValueWithMask":"true","mask":"dd.mm.yyyy"}', position: '504' },
                { name: 'fns_payer_inn', label: 'ИНН плательщика', model: 'Clients', scenarios: 'edit', type: 'text', config: '{"position":"505","elementOrder":1}', position: '505' },
                { name: 'fns_payer_passport_serial', label: 'Серия паспорта плательщика', model: 'Clients', scenarios: 'edit', type: 'text', config: '{"position":"506","elementOrder":1}', position: '506' },
                { name: 'fns_payer_passport_number', label: 'Номер паспорта плательщика', model: 'Clients', scenarios: 'edit', type: 'text', config: '{"position":"507","elementOrder":1}', position: '507' },
                { name: 'fns_payer_passport_date', label: 'Дата выдачи паспорта плательщика', model: 'Clients', scenarios: 'edit', type: 'text', config: '{"position":"508","elementOrder":1,"getValueWithMask":"true","mask":"dd.mm.yyyy"}', position: '508' }
            ];

            for (const field of fields) {
                const data = {
                    wid: 'addDynamicField',
                    mode: 'submit',
                    data: { ...field }
                };

                try {
                    const response = await fetch('https://klientiks.ru/clientix/admin/dynamicfields', {
                        method: 'POST',
                        headers: {
                            'accept': '*/*',
                            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            'x-requested-with': 'XMLHttpRequest'
                        },
                        body: 'data=' + encodeURIComponent(JSON.stringify([data])),
                        credentials: 'include'
                    });
                    const result = await response.json();
                    console.table(result);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }

        function createButton(text, right, top, hidden = false) {
            const button = document.createElement('button');
            button.textContent = text;
            button.style.position = 'absolute';
            button.style.right = right;
            button.style.top = top;
            button.style.display = hidden ? 'none' : 'block';
            return button;
        }
    }, 5000);
})();
