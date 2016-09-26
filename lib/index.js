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
