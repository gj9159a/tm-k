// ==UserScript==
// @name         unicode_to_Cyrillic
// @namespace    http://tampermonkey.net/
// @version      1.0.1
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
    // Сначала заменяем двойное экранирование на временные маркеры
    text = text.replace(/\\\\u0410/g, '__TEMP_A__')
               .replace(/\\\\u0411/g, '__TEMP_B__')
               .replace(/\\\\u0412/g, '__TEMP_V__')
               .replace(/\\\\u0413/g, '__TEMP_G__')
               .replace(/\\\\u0414/g, '__TEMP_D__')
               .replace(/\\\\u0415/g, '__TEMP_E__')
               .replace(/\\\\u0416/g, '__TEMP_ZH__')
               .replace(/\\\\u0417/g, '__TEMP_Z__')
               .replace(/\\\\u0418/g, '__TEMP_I__')
               .replace(/\\\\u0419/g, '__TEMP_Y__')
               .replace(/\\\\u041A/g, '__TEMP_K__')
               .replace(/\\\\u041B/g, '__TEMP_L__')
               .replace(/\\\\u041C/g, '__TEMP_M__')
               .replace(/\\\\u041D/g, '__TEMP_N__')
               .replace(/\\\\u041E/g, '__TEMP_O__')
               .replace(/\\\\u041F/g, '__TEMP_P__')
               .replace(/\\\\u0420/g, '__TEMP_R__')
               .replace(/\\\\u0421/g, '__TEMP_S__')
               .replace(/\\\\u0422/g, '__TEMP_T__')
               .replace(/\\\\u0423/g, '__TEMP_U__')
               .replace(/\\\\u0424/g, '__TEMP_F__')
               .replace(/\\\\u0425/g, '__TEMP_H__')
               .replace(/\\\\u0426/g, '__TEMP_TS__')
               .replace(/\\\\u0427/g, '__TEMP_CH__')
               .replace(/\\\\u0428/g, '__TEMP_SH__')
               .replace(/\\\\u0429/g, '__TEMP_SCH__')
               .replace(/\\\\u042A/g, '__TEMP_HARD__')
               .replace(/\\\\u042B/g, '__TEMP_YI__')
               .replace(/\\\\u042C/g, '__TEMP_SOFT__')
               .replace(/\\\\u042D/g, '__TEMP_E__')
               .replace(/\\\\u042E/g, '__TEMP_YU__')
               .replace(/\\\\u042F/g, '__TEMP_YA__')
               .replace(/\\\\u0430/g, '__TEMP_a__')
               .replace(/\\\\u0431/g, '__TEMP_b__')
               .replace(/\\\\u0432/g, '__TEMP_v__')
               .replace(/\\\\u0433/g, '__TEMP_g__')
               .replace(/\\\\u0434/g, '__TEMP_d__')
               .replace(/\\\\u0435/g, '__TEMP_e__')
               .replace(/\\\\u0436/g, '__TEMP_zh__')
               .replace(/\\\\u0437/g, '__TEMP_z__')
               .replace(/\\\\u0438/g, '__TEMP_i__')
               .replace(/\\\\u0439/g, '__TEMP_y__')
               .replace(/\\\\u043A/g, '__TEMP_k__')
               .replace(/\\\\u043B/g, '__TEMP_l__')
               .replace(/\\\\u043C/g, '__TEMP_m__')
               .replace(/\\\\u043D/g, '__TEMP_n__')
               .replace(/\\\\u043E/g, '__TEMP_o__')
               .replace(/\\\\u043F/g, '__TEMP_p__')
               .replace(/\\\\u0440/g, '__TEMP_r__')
               .replace(/\\\\u0441/g, '__TEMP_s__')
               .replace(/\\\\u0442/g, '__TEMP_t__')
               .replace(/\\\\u0443/g, '__TEMP_u__')
               .replace(/\\\\u0444/g, '__TEMP_f__')
               .replace(/\\\\u0445/g, '__TEMP_h__')
               .replace(/\\\\u0446/g, '__TEMP_ts__')
               .replace(/\\\\u0447/g, '__TEMP_ch__')
               .replace(/\\\\u0448/g, '__TEMP_sh__')
               .replace(/\\\\u0449/g, '__TEMP_sch__')
               .replace(/\\\\u044A/g, '__TEMP_hard__')
               .replace(/\\\\u044B/g, '__TEMP_yi__')
               .replace(/\\\\u044C/g, '__TEMP_soft__')
               .replace(/\\\\u044D/g, '__TEMP_e__')
               .replace(/\\\\u044E/g, '__TEMP_yu__')
               .replace(/\\\\u044F/g, '__TEMP_ya__')
               .replace(/\\\\u0401/g, '__TEMP_YO__')
               .replace(/\\\\u0451/g, '__TEMP_yo__');

    // Затем заменяем одинарное экранирование
    text = text.replace(/\\u0410/g, 'А')
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

    // Возвращаем временные маркеры обратно в кириллицу
    return text.replace(/__TEMP_A__/g, 'А')
           .replace(/__TEMP_B__/g, 'Б')
           .replace(/__TEMP_V__/g, 'В')
           .replace(/__TEMP_G__/g, 'Г')
           .replace(/__TEMP_D__/g, 'Д')
           .replace(/__TEMP_E__/g, 'Е')
           .replace(/__TEMP_ZH__/g, 'Ж')
           .replace(/__TEMP_Z__/g, 'З')
           .replace(/__TEMP_I__/g, 'И')
           .replace(/__TEMP_Y__/g, 'Й')
           .replace(/__TEMP_K__/g, 'К')
           .replace(/__TEMP_L__/g, 'Л')
           .replace(/__TEMP_M__/g, 'М')
           .replace(/__TEMP_N__/g, 'Н')
           .replace(/__TEMP_O__/g, 'О')
           .replace(/__TEMP_P__/g, 'П')
           .replace(/__TEMP_R__/g, 'Р')
           .replace(/__TEMP_S__/g, 'С')
           .replace(/__TEMP_T__/g, 'Т')
           .replace(/__TEMP_U__/g, 'У')
           .replace(/__TEMP_F__/g, 'Ф')
           .replace(/__TEMP_H__/g, 'Х')
           .replace(/__TEMP_TS__/g, 'Ц')
           .replace(/__TEMP_CH__/g, 'Ч')
           .replace(/__TEMP_SH__/g, 'Ш')
           .replace(/__TEMP_SCH__/g, 'Щ')
           .replace(/__TEMP_HARD__/g, 'Ъ')
           .replace(/__TEMP_YI__/g, 'Ы')
           .replace(/__TEMP_SOFT__/g, 'Ь')
           .replace(/__TEMP_E__/g, 'Э')
           .replace(/__TEMP_YU__/g, 'Ю')
           .replace(/__TEMP_YA__/g, 'Я')
           .replace(/__TEMP_a__/g, 'а')
           .replace(/__TEMP_b__/g, 'б')
           .replace(/__TEMP_v__/g, 'в')
           .replace(/__TEMP_g__/g, 'г')
           .replace(/__TEMP_d__/g, 'д')
           .replace(/__TEMP_e__/g, 'е')
           .replace(/__TEMP_zh__/g, 'ж')
           .replace(/__TEMP_z__/g, 'з')
           .replace(/__TEMP_i__/g, 'и')
           .replace(/__TEMP_y__/g, 'й')
           .replace(/__TEMP_k__/g, 'к')
           .replace(/__TEMP_l__/g, 'л')
           .replace(/__TEMP_m__/g, 'м')
           .replace(/__TEMP_n__/g, 'н')
           .replace(/__TEMP_o__/g, 'о')
           .replace(/__TEMP_p__/g, 'п')
           .replace(/__TEMP_r__/g, 'р')
           .replace(/__TEMP_s__/g, 'с')
           .replace(/__TEMP_t__/g, 'т')
           .replace(/__TEMP_u__/g, 'у')
           .replace(/__TEMP_f__/g, 'ф')
           .replace(/__TEMP_h__/g, 'х')
           .replace(/__TEMP_ts__/g, 'ц')
           .replace(/__TEMP_ch__/g, 'ч')
           .replace(/__TEMP_sh__/g, 'ш')
           .replace(/__TEMP_sch__/g, 'щ')
           .replace(/__TEMP_hard__/g, 'ъ')
           .replace(/__TEMP_yi__/g, 'ы')
           .replace(/__TEMP_soft__/g, 'ь')
           .replace(/__TEMP_e__/g, 'э')
           .replace(/__TEMP_yu__/g, 'ю')
           .replace(/__TEMP_ya__/g, 'я')
           .replace(/__TEMP_YO__/g, 'Ё')
           .replace(/__TEMP_yo__/g, 'ё');
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
