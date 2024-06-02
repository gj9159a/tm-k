// ==UserScript==
// @name         mod_accountInfo
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  делает табличку фин.Инфо более наглядной.
// @author       gj9159a
// @match        https://klientiks.ru/clientix/admin/accountInfo/a/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=klientiks.ru
// @grant        none
// @updateURL    https://raw.githubusercontent.com/gj9159a/tm-k/main/mod_accountInfo.js
// @downloadURL  https://raw.githubusercontent.com/gj9159a/tm-k/main/mod_accountInfo.js
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {
        var tables = document.getElementsByTagName("table");

        for (var i = 0; i < tables.length; i++) {
            var rows = tables[i].getElementsByTagName("tr");
            var rowCount = (i === 0) ? rows.length : Math.min(10, rows.length);

            for (var j = 0; j < rowCount; j++) {
                var cells = rows[j].querySelectorAll("td, th");

                if (j % 2 == 0) {
                    for (var m = 0; m < cells.length; m++) {
                        cells[m].style.backgroundColor = 'WhiteSmoke';
                    }
                }

                for (var k = 0; k < cells.length; k++) {
                    cells[k].style.border = "1px solid #ccc";

                    if (i === 0) {
                        if (k === 9 && cells[k].innerText == '1') {
                            cells[k].style.backgroundColor = 'LightGreen';
                            cells[10].innerText = cells[18].innerText;
                            cells[10].style.backgroundColor = 'LightGreen';
                        }

                        if (k === 9 && cells[k].innerText == '1') {
                            var activeTillCell = cells[6];
                            var activeTillDate = new Date(activeTillCell.innerText);
                            var currentDate = new Date();
                            var diff = activeTillDate - currentDate;

                            if (diff < 3 * 24 * 60 * 60 * 1000) {
                                activeTillCell.style.backgroundColor = 'IndianRed';
                            } else if (diff < 7 * 24 * 60 * 60 * 1000) {
                                activeTillCell.style.backgroundColor = 'Gold';
                            } else {
                                activeTillCell.style.backgroundColor = 'LightGreen';
                            }
                        }
                    }
                }
            }
        }
    }, 1000);
})();
