'use strict';
fs = require('fs')
let text = '';
let compositors = [
    'Альбинони Томазо',
    'Аренский Антон Степанович',
    'Баини Джузеппе',
    'Балакирев Милий Алексеевич',
    'Бах Иоганн Себастьян',
    'Беллини Винченцо',
    'Березовский Максим Созонтович',
    'Бетховен Людвиг ван',
    'Бизе Жорж',
    'Бойто Арриго',
    'Боккерини Луиджи',
    'Бородин Александр Порфирьевич',
    'Бортнянский Дмитрий Степанович',
    'Брамс Иоганнес',
    'Вагнер Вильгельм Рихард',
    'Варламов Александр Егорович',
    'Вебер Карл Мария фон',
    'Чайковский Петр Ильич',
    'Ведель Артёмий Лукьянович',
    'Верди Джузеппе Фортунио Франческо',
    'Верстовский Алексей Николаевич',
    'Штраус Рихард',
    'Шуберт Франц',
    'Шуман Роберт',
    'Шопен Фридерик'
];

text += 'Композиторы(25):\n';
text += JSON.stringify(compositors) + '\n';

function showResults(item, index, ar) {
   if ((item.split(' ').length - 1) == 1) {
      text += item + '\n';
   }
}

text += 'Композиторы из двух слов:\n';
compositors.forEach(showResults);

function compare(a, b) {
   return a.split(/[аеиоуыюяё]/) < b.split(/[аеиоуыюяё]/) ? 1 : -1
}
compositors.sort(compare);

text += 'Отсортированные композиторы:\n';
text += JSON.stringify(compositors) + '\n';

function showFreq(item, index, ar) {
   let freq = [, ];
   text += item + '\n';
   for (let i = 0; i < item.length; i++) {
      freq[i, 0] = item[i];
      freq[i, 1] = item.split(item[i]).length - 1;
      text += JSON.stringify(freq) + '\n';
   }
}

text += 'Частота символов для каждого композитора:\n';
compositors.forEach(showFreq);

function showDiftongs(item, index, ar) {
   let dif = [];
   text += item + '\n';
   let k = 0;
   for (let i = 0; i < item.length; i++) {
      if (('еяюё').indexOf(item[i]) + 1) {
         dif[k] = item[i];
         k += 1;
      }
   }
   text += JSON.stringify(dif) + '\n';
}

text += 'Дифтонги (яюеё) для каждого композитора\n';
compositors.forEach(showDiftongs);

let hash = {};

function getCode(item) {
  let cod = item.substr(-8) || item;
  let code = '';
  for (let i = 0; i < cod.length; i++) {
     code += cod.charCodeAt(i).toString();
  }
  return code;
}

function createHash(item, index, ar) {
   let code = getCode(item);
   hash[code] = item;
   text += 'HASH:' + code + ' ITEM:' + hash[code] + '\n';
}
//Find in hash: temp=hash[code];

text += 'Хеширование композиторов:\n';
compositors.forEach(createHash);

function fib(n) {
   let a = 1,
      b = 1;
   for (let i = 3; i <= n; i++) {
      let c = (a + b) % 4;
      a = b;
      b = c;
   }
   return b;
}

function inv(code, zdvig) {
   const needLength = 4;
   code = (9999 - code).toString();
   while (code.length < needLength) {
      code = "0" + code;
   }
   code = code.slice(zdvig).concat(code.slice(0, zdvig))
   return code;
}

function shifr(item, index, ar) {
   let code = '';
   for (let i = 0; i < item.length; i++) {
      code += inv(item.charCodeAt(i).toString(), fib(i));
   }
   compositors[index] = code;
   text += code + '\n';
}

text += 'Зашифрованные композиторы:\n';
compositors.forEach(shifr)

function deShifr(item, index, ar) {
   let i = 0;
   let value = '';
   let temp = '';
   while (i < item.length) {
      temp = item.substring(i, i + 4);
      temp = inv(temp, 4 - fib(i / 4));
      temp = parseInt(temp, 10);
      value += String.fromCharCode(temp);
      i = i + 4;
   }
   compositors[index] = value;
   text += value + '\n';
}

text += 'Расшифрованные композиторы:\n';
compositors.forEach(deShifr)

fs.writeFileSync('txt.txt', text);
