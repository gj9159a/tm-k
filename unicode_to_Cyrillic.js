// ==UserScript==
// @name         unicode_to_Cyrillic
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Конвертация Unicode в кириллицу
// @author       gj9159a
// @match        https://klientiks.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=klientiks.ru
// @grant        none
// @updateURL    https://raw.githubusercontent.com/gj9159a/tm-k/main/unicode_to_Cyrillic.js
// @downloadURL  https://raw.githubusercontent.com/gj9159a/tm-k/main/unicode_to_Cyrillic.js
// ==/UserScript==

(function() {
    'use strict';

    // Функция для конвертации Unicode в кириллицу
    function unicodeToCyrillic(text) {
        return text.replace(/\\u0410/g, 'А')
                   .replace(/\\u0411/g, 'Б')
                   .replace(/\\u0412/g, 'В')
                   .replace(/\\u0413/g, 'Г')
                   .replace(/\\u0414/g, 'Д')
                   .replace(/\\u0415/g, 'Е')
                   .replace(/\\u0416/g, 'Ж')
                   .replace(/\\u0417/g, 'З')
                   .replace(/\\u0418/g, 'И')
                   .replace(/\\u0419/g, 'Й')
                   .replace(/\\u041A/g, 'К')
                   .replace(/\\u041B/g, 'Л')
                   .replace(/\\u041C/g, 'М')
                   .replace(/\\u041D/g, 'Н')
                   .replace(/\\u041E/g, 'О')
                   .replace(/\\u041F/g, 'П')
                   .replace(/\\u0420/g, 'Р')
                   .replace(/\\u0421/g, 'С')
                   .replace(/\\u0422/g, 'Т')
                   .replace(/\\u0423/g, 'У')
                   .replace(/\\u0424/g, 'Ф')
                   .replace(/\\u0425/g, 'Х')
                   .replace(/\\u0426/g, 'Ц')
                   .replace(/\\u0427/g, 'Ч')
                   .replace(/\\u0428/g, 'Ш')
                   .replace(/\\u0429/g, 'Щ')
                   .replace(/\\u042A/g, 'Ъ')
                   .replace(/\\u042B/g, 'Ы')
                   .replace(/\\u042C/g, 'Ь')
                   .replace(/\\u042D/g, 'Э')
                   .replace(/\\u042E/g, 'Ю')
                   .replace(/\\u042F/g, 'Я')
                   .replace(/\\u0430/g, 'а')
                   .replace(/\\u0431/g, 'б')
                   .replace(/\\u0432/g, 'в')
                   .replace(/\\u0433/g, 'г')
                   .replace(/\\u0434/g, 'д')
                   .replace(/\\u0435/g, 'е')
                   .replace(/\\u0436/g, 'ж')
                   .replace(/\\u0437/g, 'з')
                   .replace(/\\u0438/g, 'и')
                   .replace(/\\u0439/g, 'й')
                   .replace(/\\u043A/g, 'к')
                   .replace(/\\u043B/g, 'л')
                   .replace(/\\u043C/g, 'м')
                   .replace(/\\u043D/g, 'н')
                   .replace(/\\u043E/g, 'о')
                   .replace(/\\u043F/g, 'п')
                   .replace(/\\u0440/g, 'р')
                   .replace(/\\u0441/g, 'с')
                   .replace(/\\u0442/g, 'т')
                   .replace(/\\u0443/g, 'у')
                   .replace(/\\u0444/g, 'ф')
                   .replace(/\\u0445/g, 'х')
                   .replace(/\\u0446/g, 'ц')
                   .replace(/\\u0447/g, 'ч')
                   .replace(/\\u0448/g, 'ш')
                   .replace(/\\u0449/g, 'щ')
                   .replace(/\\u044A/g, 'ъ')
                   .replace(/\\u044B/g, 'ы')
                   .replace(/\\u044C/g, 'ь')
                   .replace(/\\u044D/g, 'э')
                   .replace(/\\u044E/g, 'ю')
                   .replace(/\\u044F/g, 'я')
                   .replace(/\\u0401/g, 'Ё')
                   .replace(/\\u0451/g, 'ё');
    }

    // Функция для обхода и обновления DOM
    function traverseDOM(node) {
        if (node.nodeType === 3) { // Текстовый узел
            node.nodeValue = unicodeToCyrillic(node.nodeValue);
        } else if (node.nodeType === 1 && (node.tagName === 'TEXTAREA' || node.tagName === 'INPUT')) { // Если это элемент <textarea> или <input>
            try {
                let json = JSON.parse(node.value);
                for (let key in json) {
                    if (json.hasOwnProperty(key) && typeof json[key] === 'string') {
                        json[key] = unicodeToCyrillic(json[key]);
                    }
                }
                node.value = JSON.stringify(json);
            } catch (e) {
                console.error('Ошибка при разборе JSON:', e);
            }
        } else if (node.nodeType === 1 && node.tagName === 'PRE') { // Если это элемент <pre>
            try {
                let json = JSON.parse(node.textContent);
                for (let key in json) {
                    if (json.hasOwnProperty(key) && typeof json[key] === 'string') {
                        json[key] = unicodeToCyrillic(json[key]);
                    }
                }
                node.textContent = JSON.stringify(json);
            } catch (e) {
                console.error('Ошибка при разборе JSON:', e);
            }
        } else {
            for (let i = 0; i < node.childNodes.length; i++) {
                traverseDOM(node.childNodes[i]);
            }
        }
    }

    // Функция для периодического запуска скрипта с использованием requestAnimationFrame
    function runScript() {
        traverseDOM(document.body);
        setTimeout(() => {
            requestAnimationFrame(runScript);
        }, 2000); // Задержка в 2 секунды
    }

    // Запуск скрипта через 5 секунд
    setTimeout(() => {
        requestAnimationFrame(runScript);
    }, 5000);

})();
