# lei-selector

[![Greenkeeper badge](https://badges.greenkeeper.io/leizongmin/lei-selector.svg)](https://greenkeeper.io/)
基于HTML5的类jQuery选择器，轻量且易于扩展


## 安装

```bash
$ npm install lei-selector --save
```


## 使用方法

```javascript
const leiSelector = require('lei-selector');
// 也可以直接添加 script 标签载入文件 dist/lei-selector.js
// 然后可以直接通过全局变量 leiSelector 访问

function $(q) {
  return leiSelector.from(q);
}

for (let i = 0; i < 100; i++) {
  $('ul').append(`<li id="number-${ i }" data-number="${ i }" data-index${ i }="${ i }">Number = ${ i }</li>`);
}

$('ul')
  .css('list-style', 'none')
  .css('margin', 0)
  .css('padding', 0);

for (let i = 0; i < 100; i++) {
  $('ul').find(`#number-${ i }`).css({
    backgroundColor: [ 'red', 'blue', 'yellow', 'black', 'cyan' ][i % 5],
  });
}

for (let i = 0; i < 100; i++) {
  if (i % 3 === 0) {
    $('ul li').eq(i).css('text-align', 'center');
  } else if (i %3 === 1) {
    $('ul li').eq(i).css('text-align', 'right');
  }
}

setInterval(() => {
  $('ul li').show();
  for (let i = 0; i < 100; i++) {
    if (Date.now() % i === 0) {
      $('ul li').eq(i).hide();
    }
  }
}, 1000);
```


## 扩展

```javascript
// 继承 leiSelector 类即可
class MySelector extends leiSelector {

  myMethod1(a) {
    // ....
    return this;
  }

  myMethod2(b) {
    // ....
    return this;
  }

}

// 通过以下方法使用
const $a = MySelector.from('a');
$a.prop('target', '_blank');
```


## License

```
MIT License

Copyright (c) 2016 Zongmin Lei <leizongmin@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
