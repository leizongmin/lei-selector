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
