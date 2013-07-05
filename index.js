
var query = require('query')
  , domify = require('domify')
  , Emitter = require('emitter')
  , classes = require('classes')
  , events = require('event')

  , template = require('./template');

module.exports = Select;

function Select(items, label) {
  var div = domify(template)
    , ul = query('ul', div)
    , self = this
    , item;

  this.nodes = {};
  this.items = {};

  this.el = div;
  this.button = query('.dropdown-toggle', div);
  this.title = query('span.title', this.button);

  var selected;

  for (var i=0; i<items.length; i++) {
    if (items[i].selected) {
      selected = items[i].value;
    }
    this.items[items[i].value] = items[i];
    this.nodes[items[i].value] = this.newItem(items[i]);
    ul.appendChild(this.nodes[items[i].value]);
  }
  if (typeof(selected) === 'undefined') {
    selected = items[0].value;
  }
  this.select(selected, true);
  if (label) {
    this.attach(label);
  }
  var hide = function (e) {
    self.hide();
  };
  events.bind(this.button, 'click', function (e) {
    events.unbind(document, 'click', hide);
    self.show();
  });
  this.on('show', function () {
    setTimeout(function () {
      events.bind(document, 'click', hide);
    }, 0);
  });
  this.on('hide', function () {
    events.unbind(document, 'click', hide);
  });
}

Select.prototype = {
  attach: function (item) {
    item.parentNode.replaceChild(this.el, item);
    return this;
  },

  show: function () {
    classes(this.el).add('open');
    this.emit('show');
    return this;
  },

  hide: function () {
    classes(this.el).remove('open');
    return this;
  },

  newItem: function (item) {
    var node = domify('<li><a href="#"></a></li>')
    , a = query('a', node)
    , self = this;
    if (item.html) {
      a.innerHTML = item.html;
    } else {
      if (!item.title) item.title = item.value;
      a.innerText = item.title;
    }
    events.bind(a, 'click', function (e){
      e.preventDefault();
      e.stopPropagation();
      self.select(item.value);
      self.hide();
      return false;
    });
    return node;
  },

  addClass: function (cls) {
    classes(this.el).add(cls);
    return this;
  },

  select: function (value, silent) {
    if (!this.nodes[value] || value === this.selected) return;
    if (!silent) {
      this.emit('select', value);
    }
    if (this.nodes[this.selected]) {
      classes(this.nodes[this.selected]).remove('selected');
    }
    this.selected = value;
    classes(this.nodes[this.selected]).add('selected');
    if (this.items[value].html) {
      this.title.innerHTML = this.items[value].html;
    } else {
      this.title.innerText = this.items[value].title;
    }
    return this;
  }
};

Emitter(Select.prototype);


