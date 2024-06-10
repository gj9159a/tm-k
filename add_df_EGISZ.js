// ==UserScript==
// @name         add_df_EGISZ
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  добавляет динполя ЕГИСЗ в указанные протоколы, а также в карточку клиента и сотрудника
// @author       gj9159a
// @match        https://klientiks.ru/clientix/admin/dynamicfields
// @match        https://klientiks.ru/clientix/admin/dynamicFields
// @match        https://klientiks.ru/clientix/admin/DynamicFields
// @icon         https://www.google.com/s2/favicons?sz=64&domain=klientiks.ru
// @grant        none
// @updateURL    https://raw.githubusercontent.com/gj9159a/tm-k/main/add_df_EGISZ.js
// @downloadURL  https://raw.githubusercontent.com/gj9159a/tm-k/main/add_df_EGISZ.js
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {
        let addButton = document.createElement('button');
        addButton.textContent = 'Добавить поля ЕГИСЗ';
        addButton.style.position = 'absolute';
        addButton.style.right = '5%';
        addButton.style.top = '10%';
        document.querySelector("#DynamicFields > div.element-cr._label-left._inline").appendChild(addButton);

        let scenarioInput = document.createElement('textarea');
        scenarioInput.rows = 10;
        scenarioInput.cols = 50;
        scenarioInput.placeholder = 'Введите сценарии, каждый с новой строки';
        scenarioInput.style.position = 'absolute';
        scenarioInput.style.right = '25%';
        scenarioInput.style.top = '10%';
        scenarioInput.style.display = 'none';
        scenarioInput.style.whiteSpace = 'nowrap';
        document.querySelector("#DynamicFields > div.element-cr._label-left._inline").appendChild(scenarioInput);

        let createButton = document.createElement('button');
        createButton.textContent = 'Поехали!';
        createButton.style.position = 'absolute';
        createButton.style.right = '5%';
        createButton.style.top = '14%';
        createButton.style.display = 'none';
        document.querySelector("#DynamicFields > div.element-cr._label-left._inline").appendChild(createButton);

        addButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (scenarioInput.style.display === 'none') {
                scenarioInput.style.display = 'block';
                createButton.style.display = 'block';
                addButton.textContent = 'На сегодня хватит';
            } else {
                scenarioInput.style.display = 'none';
                createButton.style.display = 'none';
                addButton.textContent = 'Добавить поля ЕГИСЗ';
                createButton.textContent = 'Поехали!';
                createButton.style.backgroundColor = '';
                createButton.style.color = '';
            }
        });

                createButton.addEventListener('click', async function(event) {
            event.preventDefault();

            createButton.textContent = 'Добавляю поля...';
            createButton.style.backgroundColor = 'yellow';

            let scenarios = scenarioInput.value.split('\n');

            let fields = [
                {name: 'egisz_id', label: 'номер клиента в ЕГИСЗ', model: 'Clients', scenarios: 'add,edit', type: 'textoutput', config: '{"position":"0.1","elementOrder":1,}', position: '0.1'},
                {name: 'status_egisz', label: 'история статусов', model: 'Clients', scenarios: 'add,edit', type: 'textoutput', config: '{"position":"0.11","elementOrder":1}', position: '0.11'},
				{name: 'family_name', label: 'фамилия', model: 'Users', scenarios: 'edit,editEmployee,editOwner', type: 'text', config: '{"position":"0.1","elementOrder":1}', position: '0.1'},
				{name: 'given_name', label: 'имя', model: 'Users', scenarios: 'edit,editEmployee,editOwner', type: 'text', config: '{"position":"0.11","elementOrder":1}', position: '0.11'},
				{name: 'middle_name', label: 'отчество', model: 'Users', scenarios: 'edit,editEmployee,editOwner', type: 'text', config: '{"position":"0.12","elementOrder":1}', position: '0.12'},
				{name: 'snils', label: 'снилс', model: 'Users', scenarios: 'edit,editEmployee,editOwner', type: 'text', config: '{"position":"0.13","elementOrder":1}', position: '0.13'},
				{name: 'id_speciality', label: 'специальность', model: 'Users', scenarios: 'edit,editEmployee,editOwner', type: 'ac', config: '{"position":"0.14","elementOrder":1,"readonly":true}', position: '0.14'},
				{name: 'id_position', label: 'должность', model: 'Users', scenarios: 'edit,editEmployee,editOwner', type: 'ac', config: '{"position":"0.15","elementOrder":1,"readonly":true}', position: '0.15'},
				{name: 'snils', label: 'СНИЛС', model: 'Clients', scenarios: 'add,edit', type: 'text', config: '{"position":"0.12","elementOrder":1}', position: '0.12'},
				{name: 'inn', label: 'ИНН', model: 'Clients', scenarios: 'add,edit', type: 'text', config: '{"position":"0.13","elementOrder":1}', position: '0.13'},
				{name: 'remd_adress_code', label: 'Субъект федерации', model: 'Clients', scenarios: 'add,edit', type: 'ac', config: '{"position":"0.14","elementOrder":1,"paramDirectorySaveDisabled":true,"readonly":true}', position: '0.14'},
				{name: 'doc_number_nu', label: 'Номер договора', model: 'Clients', scenarios: 'add,edit', type: 'text', config: '{"position":"0.15","elementOrder":1,"customModelDefaultValue":{"model":"Clients","value":"number"}}', position: '0.15'},
				{name: 'date_doc_nu', label: 'Дата договора', model: 'Clients', scenarios: 'add,edit', type: 'calendar', config: '{"position":"0.16","elementOrder":1,"customModelDefaultValue":{"model":"Clients","value":"last_appointment_date_human_readable_dmy"}}', position: '0.16'},
				{name: 'date_doc_nu_YYYYMMDD', label: '', model: 'Clients', scenarios: 'add,edit', type: 'hidden', config: '{"position":"0.17","elementOrder":1}', position: '0.17'}
            ];

            for (let field of fields) {
                let data = {
                    wid: 'addDynamicField',
                    mode: 'submit',
                    data: {
                        ...field,
                    }
                };

                try {
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
                } catch (error) {
                    console.info('Error:', error);
                }
            }

            for (let scenario of scenarios) {
                let fieldsTemplate = [
                    {name: 'egisz_fields', label: 'Поля ЕГИСЗ', model: 'DynamicObjects', scenarios: 'scenariy', type: 'collapsible', config: '{"position":"0.1","elementOrder":1,"items":["status_egisz","last_status_egisz","send_egisz","id_visit_purpose","case_visit_type","admission_condition","id_case_result","word8","doctor_comment","id_payment_type","remd_execution_place","remd_service_event_type","id_document_type","remd_document_title","start_datetime","finish_datetime","remdLifeAnamnesis","remdAnamnesis","remdObjectiveStatus","remdConclusion","word9","remd_payment_type","remd_payment_doc_type","signature","signature_info"]}', position: '0.1'},
                    {name: 'case_egisz', label: 'Тип осмотра', model: 'DynamicObjects', scenarios: 'scenariy', type: 'hidden', config: '{"position":"0.11","elementOrder":1,"defaultValue":"CaseAmb"}', position: '0.11'},
					{name: 'status_egisz', label: 'статус отправки данных', model: 'DynamicObjects', scenarios: 'scenariy', type: 'textoutput', config: '{"position":"0.12","elementOrder":1}', position: '0.12'},
					{name: 'last_status_egisz', label: 'последний статус отправки данных', model: 'DynamicObjects', scenarios: 'scenariy', type: 'textoutput', config: '{"position":"0.13","elementOrder":1}', position: '0.13'},
					{name: 'send_egisz', label: 'чекбокс отправки данных', model: 'DynamicObjects', scenarios: 'scenariy', type: 'checkbox', config: '{"position":"0.14","elementOrder":1,"elementClass":"_block"}', position: '0.14'},
					{name: 'id_case_result', label: 'Результат осмотра', model: 'DynamicObjects', scenarios: 'scenariy', type: 'ac', config: '{"position":"0.15","elementOrder":1,"defaultValue":"Без перемен","readonly":true}', position: '0.15'},
					{name: 'id_visit_purpose', label: 'Цель визита', model: 'DynamicObjects', scenarios: 'scenariy', type: 'ac', config: '{"position":"0.16","elementOrder":1,"defaultValue":"Лечебно-диагностическая","readonly":true}', position: '0.16'},
					{name: 'case_visit_type', label: 'Первичность', model: 'DynamicObjects', scenarios: 'scenariy', type: 'ac', config: '{"position":"0.17","elementOrder":1,"defaultValue":"Первичный","readonly":true}', position: '0.17'},
					{name: 'admission_condition', label: 'Состояние пациента', model: 'DynamicObjects', scenarios: 'scenariy', type: 'ac', config: '{"position":"0.18","elementOrder":1,"defaultValue":"Удовлетворительное","readonly":true}', position: '0.18'},
					{name: 'id_payment_type', label: 'Способ оплаты', model: 'DynamicObjects', scenarios: 'scenariy', type: 'ac', config: '{"position":"0.19","elementOrder":1,"defaultValue":"Платные услуги","readonly":true}', position: '0.19'},
					{name: 'word8', label: 'Диагноз ЕГИСЗ', model: 'DynamicObjects', scenarios: 'scenariy', type: 'ac', config: '{"position":"0.2","elementOrder":1,"egisz_name":["DynamicObjects","MkbCode"],"additionalACValue":[{"key_index":"dictionary_param1","value":"dictionary_param1","element":"word9"}],"readonly":true}', position: '0.2'},
					{name: 'doctor_comment', label: 'Комментарий врача', model: 'DynamicObjects', scenarios: 'scenariy', type: 'textarea', config: '{"position":"0.21","elementOrder":1,"egisz_name":["DynamicObjects","doctor_comment"]}', position: '0.21'},
					{name: 'remd_service_event_type', label: 'Тип документированного события', model: 'DynamicObjects', scenarios: 'scenariy', type: 'ac', config: '{"position":"0.22","elementOrder":1,"paramDirectorySaveDisabled":true,"defaultValue":"Консультация","readonly":true}', position: '0.22'},
					{name: 'remd_payment_type', label: 'Источник оплаты', model: 'DynamicObjects', scenarios: 'scenariy', type: 'ac', config: '{"position":"0.23","elementOrder":1,"paramDirectorySaveDisabled":true,"defaultValue":"Средства пациента","readonly":true}', position: '0.23'},
					{name: 'remd_payment_doc_type', label: 'Документ-основание оплаты', model: 'DynamicObjects', scenarios: 'scenariy', type: 'ac', config: '{"position":"0.24","elementOrder":1,"paramDirectorySaveDisabled":true,"defaultValue":"Договор на оказание платных медицинских услуг","readonly":true}', position: '0.24'},
					{name: 'id_document_type', label: 'Тип Мед Документа', model: 'DynamicObjects', scenarios: 'scenariy', type: 'ac', config: '{"position":"0.25","elementOrder":1,"paramDirectorySaveDisabled":true,"defaultValue":"Протокол консультации (CDA) Редакция 4","readonly":true}', position: '0.25'},
					{name: 'start_datetime', label: 'Время начала осмотра', model: 'DynamicObjects', scenarios: 'scenariy', type: 'text', config: '{"position":"0.26","elementOrder":1,"customModelDefaultValue":{"datetime":true,"format":"d.m.Y H:i"}}', position: '0.26'},
					{name: 'finish_datetime', label: 'Время окончания осмотра', model: 'DynamicObjects', scenarios: 'scenariy', type: 'text', config: '{"position":"0.27","elementOrder":1,"customModelDefaultValue":{"datetime":true,"format":"d.m.Y H:i"}}', position: '0.27'},
					{name: 'start_datetime_YYYYMMDDHHIIGMT', label: '', model: 'DynamicObjects', scenarios: 'scenariy', type: 'hidden', config: '{"position":"0.28","elementOrder":1}', position: '0.28'},
					{name: 'finish_datetime_YYYYMMDDHHIIGMT', label: '', model: 'DynamicObjects', scenarios: 'scenariy', type: 'hidden', config: '{"position":"0.29","elementOrder":1}', position: '0.29'},
					{name: 'signature', label: 'Подпись ЕГИСЗ', model: 'DynamicObjects', scenarios: 'scenariy', type: 'signature', config: '{"position":"0.9","elementOrder":1}', position: '0.9'},
					{name: 'signature_info', label: 'Информация о подписи', model: 'DynamicObjects', scenarios: 'scenariy', type: 'textoutput', config: '{"position":"0.91","elementOrder":1}', position: '0.91'},
					{name: 'remd_document_title', label: 'Заголовок документа РЭМД', model: 'DynamicObjects', scenarios: 'scenariy', type: 'text', config: '{"position":"0.291","elementOrder":1,"defaultValue":"Протокол консультации врача <Специальность>"}', position: '0.291'},
					{name: 'remd_execution_place', label: 'Место оказания услуги', model: 'DynamicObjects', scenarios: 'scenariy', type: 'ac', config: '{"position":"0.292","elementOrder":1,"paramDirectorySaveDisabled":true,"defaultValue":"Амбулаторно-поликлиническое учреждение","readonly":true}', position: '0.292'},
					{name: 'remdAnamnesis', label: 'Анамнез заболевания', model: 'DynamicObjects', scenarios: 'scenariy', type: 'textarea', config: '{"position":"0.293","elementOrder":1,"egisz_name":["DynamicObjects","remdAnamnesis"]}', position: '0.293'},
					{name: 'remdLifeAnamnesis', label: 'Анамнез жизни', model: 'DynamicObjects', scenarios: 'scenariy', type: 'textarea', config: '{"position":"0.294","elementOrder":1,"egisz_name":["DynamicObjects","remdLifeAnamnesis"]}', position: '0.294'},
					{name: 'remdObjectiveStatus', label: 'Объективный статус', model: 'DynamicObjects', scenarios: 'scenariy', type: 'textarea', config: '{"position":"0.295","elementOrder":1,"egisz_name":["DynamicObjects","remdObjectiveStatus"]}', position: '0.295'},
					{name: 'remdConclusion', label: 'Заключение', model: 'DynamicObjects', scenarios: 'scenariy', type: 'textarea', config: '{"position":"0.296","elementOrder":1,"egisz_name":["DynamicObjects","remdConclusion"]}', position: '0.296'},
					{name: 'word9', label: 'Диагноз РЭМД', model: 'DynamicObjects', scenarios: 'scenariy', type: 'ac', config: '{"position":"0.297","elementOrder":1,"egisz_name":["DynamicObjects","remdDiagnosis"],"readonly":true}', position: '0.297'}
                ];

                let fields = fieldsTemplate.map((field) => {
                    return {...field, scenarios: scenario};
                });

                for (let field of fields) {
                    let data = {
                        wid: 'addDynamicField',
                        mode: 'submit',
                        data: {
                            ...field,
                        }
                    };

                    try {
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
                    } catch (error) {
                        console.info('Error:', error);
                    }
                }
            }

            createButton.textContent = 'Поля ЕГИСЗ добавлены!';
            createButton.style.backgroundColor = 'green';
            createButton.style.color = 'white';
        });
    }, 3000);
})();
