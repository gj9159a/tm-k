// ==UserScript==
// @name         update_accountSettings
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  улучшение админпанели настроек
// @author       gj9159a
// @match        https://klientiks.ru/clientix/admin/accountsettings
// @match        https://klientiks.ru/clientix/admin/accountSettings
// @match        https://klientiks.ru/clientix/admin/accountSettings/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=klientiks.ru
// @grant        none
// @updateURL    https://raw.githubusercontent.com/gj9159a/tm-k/main/update_accountSettings.js
// @downloadURL  https://raw.githubusercontent.com/gj9159a/tm-k/main/update_accountSettings.js
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {
        var selector = location.pathname.match(/\/\d+$/) ? '#accountSettingsAdmin' : '#editAllSettings';
        var container = document.querySelector(selector);
        if (container) {
            var elements = container.querySelectorAll('.element_label.element-textarea_label, .element_label-span');
            elements.forEach(function(element) {
                element.style.userSelect = 'text';
                element.style.cursor = 'default';
            });

            var button = document.querySelector('.element_button.element-button_button[data-id="submit"]');
            if (button) {
                button.style.position = 'fixed';
                button.style.top = '100px';
                button.style.left = '50%';
                button.style.transform = 'translate(-50%, 0)';
                button.style.backgroundColor = 'rgb(215, 215, 215)';

                button.addEventListener('click', function() {
                    var originalColor = button.style.backgroundColor;
                    var originalTextColor = button.style.color;
                    var originalText = button.textContent;

                    button.style.backgroundColor = 'green';
                    button.style.color = 'white';
                    button.textContent = 'Сохранено!';

                    setTimeout(function() {
                        button.style.backgroundColor = originalColor;
                        button.style.color = originalTextColor;
                        button.textContent = originalText;
                    }, 5000);
                });
            }
        }
    }, 5000);
})();
