// ==UserScript==
// @name         Pos_eO_ID_dynamicFields
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  показывает позицию, эл.ордер и ID всех динполей в админке динполей
// @author       gj9159a
// @match        https://klientiks.ru/clientix/admin/dynamicfields
// @icon         https://www.google.com/s2/favicons?sz=64&domain=klientiks.ru
// @grant        none
// @updateURL    https://raw.githubusercontent.com/gj9159a/tm-k/main/Pos_eO_ID_dynamicFields.js
// @downloadURL  https://raw.githubusercontent.com/gj9159a/tm-k/main/Pos_eO_ID_dynamicFields.js
// ==/UserScript==

(function() {
    'use strict';

    let checkAndModifyDOM = function() {
        let allListItems = $W.viewDynamicFields.allListItems;
        if (!allListItems) {
            return;
        }
        for (let key in allListItems) {
            if (allListItems.hasOwnProperty(key)) {
                let item = allListItems[key];
                if (!item) {
                    continue;
                }
                let row = document.querySelector(`.BModelSearchListElement[data-id="${item.id}"]`);
                if (!row) {
                    continue;
                }
                if (!row.classList.contains('processed')) {
                    let positionTd = document.createElement('td');
                    positionTd.textContent = item.position;

                    let elementOrderTd = document.createElement('td');
                    elementOrderTd.textContent = item.config ? item.config.elementOrder : '';

                    let idTd = document.createElement('td');
                    idTd.textContent = item.id;

                    let referenceTd = row.querySelector('td[style="margin:6px;"]');
                    if (!referenceTd) {
                        continue;
                    }
                    referenceTd.parentNode.insertBefore(positionTd, referenceTd.nextSibling);
                    referenceTd.parentNode.insertBefore(elementOrderTd, positionTd.nextSibling);
                    referenceTd.parentNode.insertBefore(idTd, elementOrderTd.nextSibling);

                    row.classList.add('processed');
                }
            }
        }

        let table = document.querySelector('.p-settings-adminDynamicFields-table');
        if (!table) {
            return;
        }
        let thead = table.querySelector('thead');
        if (!thead) {
            return;
        }
        let headerRow = thead.rows[0];
        if (!headerRow) {
            return;
        }
        if (!headerRow.querySelector('.position-header')) {
            let positionHeader = document.createElement('th');
            positionHeader.textContent = 'Position';
            positionHeader.className = 'position-header';
            headerRow.appendChild(positionHeader);
        }
        if (!headerRow.querySelector('.elementOrder-header')) {
            let elementOrderHeader = document.createElement('th');
            elementOrderHeader.textContent = 'elementOrder';
            elementOrderHeader.className = 'elementOrder-header';
            headerRow.appendChild(elementOrderHeader);
        }
        if (!headerRow.querySelector('.id-header')) {
            let idHeader = document.createElement('th');
            idHeader.textContent = 'ID';
            idHeader.className = 'id-header';
            headerRow.appendChild(idHeader);
        }
    };

    const observer = new MutationObserver(checkAndModifyDOM);

    observer.observe(document, { childList: true, subtree: true });
})();
