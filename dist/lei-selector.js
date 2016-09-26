(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.leiSelector = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * lei-selector
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const Selector = require('./selector');

class LeiSelector extends Selector {

  eq(index) {
    return this.create(this[index]);
  }

  lt(index) {
    return this.create(this.toArray().slice(0, index));
  }

  gt(index) {
    return this.create(this.toArray().slice(index + 1));
  }

  text(value) {
    if (arguments.length > 0) {
      this.each(el => {
        el.innerText = value;
      });
    }
    return this.toArray().map(el => el.innerText).join('\n');
  }

  html(value) {
    if (arguments.length > 0) {
      this.each(el => {
        el.innerHTML = value;
      });
    }
    return this.toArray().map(el => el.innerHTML).join('\n');
  }

  remove() {
    this.each(el => el.remove());
    return this;
  }

  setStyle(name, value) {
    return this.each(el => {
      el.style[name] = value;
    });
  }

  getStyle(name) {
    return this[0] && this[0].style[name];
  }

  css(name, value) {
    if (arguments.length > 1) {
      // css(name, value);
      return this.setStyle(name, value);
    } else if (arguments.length === 1) {
      if (typeof name === 'string') {
        // css('name')
        return this.getStyle(name);
      }
      // css({ name: value })
      const obj = arguments[0];
      for (const i in obj) {
        this.setStyle(i, obj[i]);
      }
      return this;
    }
    throw new Error('invalid argument number of css()');
  }

  show() {
    this.setStyle('display', '');
    return this;
  }

  hide() {
    this.setStyle('display', 'none');
    return this;
  }

  prop(name, value) {
    if (arguments.length > 1) {
      // prop(name, value);
      return this.setProp(name, value);
    } else if (arguments.length === 1) {
      if (typeof name === 'string') {
        // prop('name')
        return this.getProp(name);
      }
      // prop({ name: value })
      const obj = arguments[0];
      for (const i in obj) {
        this.setProp(i, obj[i]);
      }
      return this;
    }
    throw new Error('invalid argument number of prop()');
  }

  setProp(name, value) {
    return this.each(el => {
      el.setAttribute(name, value);
    });
  }

  getProp(name) {
    return this[0] && this[0].getAttribute(name);
  }

  data(name, value) {
    if (arguments.length > 1) {
      // data(name, value);
      return this.setData(name, value);
    } else if (arguments.length === 1) {
      if (typeof name === 'string') {
        // data('name')
        return this.getData(name);
      }
      // data({ name: value })
      const obj = arguments[0];
      for (const i in obj) {
        this.setData(i, obj[i]);
      }
      return this;
    }
    // data()
    return this[0] && this[0].dataset;
  }

  setData(name, value) {
    return this.each(el => {
      el.dataset[name] = value;
    });
  }

  getData(name) {
    return this[0] && this[0].dataset[name];
  }

  append(child) {
    if (this[0]) {
      const sel = this.create(child);
      sel.each(el => this[0].appendChild(el));
    }
    return this;
  }

}

module.exports = LeiSelector;

},{"./selector":2}],2:[function(require,module,exports){
'use strict';

/**
 * lei-selector
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

function isHTMLTag(html) {
  const h = html.trim();
  return h[0] === '<' && h.slice(-1) === '>';
}

class Selector {

  /**
   * 创建 selector 实例
   *
   * @param {String|Element|NodeList} query
   */
  constructor(query) {
    // super();
    this.$$query = query;
    if (typeof query === 'string') {
      if (isHTMLTag(query)) {
        this.fromHTML(query);
      } else {
        this.fromNodeList(document.querySelectorAll(query));
      }
    } else if (query instanceof Element || query instanceof Node) {
      this.fromNode(query);
    } else if (query instanceof NodeList) {
      this.fromNodeList(query);
    } else if (query === null) {
      this.length = 0;
    } else if (query instanceof query) {
      this.fromSelector(query);
    } else {
      throw new Error(`new Selector(query): invalid type of query, must be string, Element or NodeList`);
    }
  }

  fromHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    this.fromNodeList(div.childNodes);
    return this;
  }

  fromNode(el) {
    this[0] = el;
    this.length = 1;
    return this;
  }

  fromNodeList(list) {
    for (let i = 0; i < list.length; i++) {
      this[i] = list[i];
    }
    this.length = list.length;
    return this;
  }

  fromSelector(sel) {
    for (let i = 0; i < sel.length; i++) {
      this[i] = sel[i];
    }
    this.length = sel.length;
    return this;
  }

  toArray() {
    const list = new Array(this.length);
    for (let i = 0; i < this.length; i++) {
      list[i] = this[i];
    }
    return list;
  }

  each(fn) {
    for (let i = 0; i < this.length; i++) {
      fn.call(this, this[i]);
    }
    return this;
  }

  find(query) {
    if (typeof query !== 'string') {
      throw new Error('find(query): query must be string');
    }
    if (this[0]) {
      return this.create(this[0].querySelectorAll(query));
    }
    return this.create(null);
  }

  create(query) {
    return new this.constructor(query);
  }

}

Selector.from = function (query) {
  return new this(query);
};


module.exports = Selector;

},{}]},{},[1])(1)
});