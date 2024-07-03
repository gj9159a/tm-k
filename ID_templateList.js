// ==UserScript==
// @name         ID_templateList
// @namespace    http://tampermonkey.net/
// @version      1.0.4
// @description  Показывает ID доков в разделе Возможности
// @author       gj9159a
// @match        https://klientiks.ru/clientix/settings/features*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=klientiks.ru
// @grant        none
// @updateURL    https://raw.githubusercontent.com/gj9159a/tm-k/main/ID_templateList.js
// @downloadURL  https://raw.githubusercontent.com/gj9159a/tm-k/main/ID_templateList.js
// ==/UserScript==

(function() {
    'use strict';

    let checkAndModifyDOM = function() {
        let rows = document.querySelectorAll('.p-settings-documentList_row.jsElement_listItem.BModelSearchListElement');
        rows.forEach(row => {
            if (!row.classList.contains('processed')) {
                let dataRowId = row.getAttribute('data-id');
                let td = document.createElement('div');
                td.className = 'p-settings-documentList_cell';
                let tdContent = document.createElement('div');
                tdContent.className = 'p-settings-documentList_ct';
                let tdText = document.createElement('div');
                tdText.className = 'p-settings-documentList_text';
                tdText.textContent = dataRowId;
                tdContent.appendChild(tdText);
                td.appendChild(tdContent);
                row.appendChild(td);
                row.classList.add('processed');
            }
        });

        let table = document.querySelector('.p-settings-documentList_table.jsTable.forLoadNexPageElements');
        if (table) {
            let thead = table.querySelector('.p-settings-documentList_head');
            if (thead && !thead.querySelector('.id-header')) {
                let emptyHeader = document.createElement('div');
                emptyHeader.className = 'p-settings-documentList_cell';
                let emptyHeaderContent = document.createElement('div');
                emptyHeaderContent.className = 'p-settings-documentList_ct';
                let emptyHeaderText = document.createElement('div');
                emptyHeaderText.className = 'p-settings-documentList_text';
                emptyHeaderContent.appendChild(emptyHeaderText);
                emptyHeader.appendChild(emptyHeaderContent);
                thead.appendChild(emptyHeader);

                let newHeader = document.createElement('div');
                newHeader.className = 'p-settings-documentList_cell id-header';
                let newHeaderContent = document.createElement('div');
                newHeaderContent.className = 'p-settings-documentList_ct';
                let newHeaderText = document.createElement('div');
                newHeaderText.className = 'p-settings-documentList_text';
                newHeaderText.textContent = 'ID';
                newHeaderContent.appendChild(newHeaderText);
                newHeader.appendChild(newHeaderContent);
                thead.appendChild(newHeader);
            }
        }
    };

    let observer = new MutationObserver((mutationsList, observer) => {
        setTimeout(checkAndModifyDOM, 3000);
    });

    observer.observe(document, { childList: true, subtree: true });
})();
