var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function randomInt(max) {
  return Math.floor(Math.random() * max);
}

var directions = {
  up: 1,
  right: 2,
  down: 3,
  left: 4
};

var defaultOptions = {
  rows: 30,
  columns: 40
};
function mergeOptions(parent, child) {
  var options = {};
  var key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    options[key] = child[key] === undefined ? parent[key] : child[key];
  }

  return options;
}

function isString(v) {
  return typeof v === 'string';
}
function isObject(v) {
  return !!v && typeof v === 'object';
}
function isDomNode(v) {
  return isObject(v) && 'nodeType' in v;
}
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}

function createElement(tag) {
  if (tag === void 0) {
    tag = 'div';
  }

  if (isString(tag) && tag.length) {
    return document.createElement(tag);
  }

  return null;
}
function createFragment() {
  return document.createDocumentFragment();
}
function query(selector) {
  if (isString(selector)) {
    var node = document.querySelector(selector);

    if (node) {
      return node;
    }
  } else if (isDomNode(selector)) {
    return selector;
  }

  return createElement('div');
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Node = function Node(id, data, next) {
  if (next === void 0) {
    next = null;
  }

  this.id = id;
  this.data = data;
  this.next = next;
};

var LinkedList = /*#__PURE__*/function () {
  function LinkedList() {
    this.head = null;
    this.tail = null;
  }

  var _proto = LinkedList.prototype;

  _proto.append = function append(id, data) {
    var node = new Node(id, data);

    if (this.tail) {
      this.tail.next = node;
    }

    if (!this.head) {
      this.head = node;
    }

    this.tail = node;
  };

  _proto.prepend = function prepend(id, data) {
    var node = new Node(id, data, this.head);
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }
  };

  _proto.find = function find(cb, ctx) {
    if (ctx === void 0) {
      ctx = null;
    }

    if (!this.head || typeof cb !== 'function') {
      return null;
    }

    var current = this.head;

    while (current) {
      try {
        var res = cb.apply(ctx, [current.data, current.id]);

        if (!!res) {
          return current.data;
        }
      } catch (e) {
        console.error(e);
      }

      current = current.next;
    }

    return null;
  };

  _proto.toArray = function toArray() {
    var output = [];
    this["for"](function (data) {
      output.push(data);
    }, this);
    return output;
  };

  _proto["for"] = function _for(cb, ctx) {
    if (ctx === void 0) {
      ctx = null;
    }

    if (!this.head || typeof cb !== 'function') {
      return;
    }

    var current = this.head;

    while (current) {
      try {
        cb.apply(ctx, [current.data, current.id]);
      } catch (e) {
        console.error(e);
      }

      current = current.next;
    }
  };

  _proto.filter = function filter(cb, ctx) {
    if (ctx === void 0) {
      ctx = null;
    }

    var items = [];

    if (typeof cb !== 'function') {
      return items;
    }

    var current = this.head;

    while (current) {
      try {
        var res = cb.apply(ctx, [current.data, current.id]);

        if (!!res) {
          items.push(current.data);
        }
      } catch (e) {
        console.error(e);
      }

      current = current.next;
    }

    return items;
  };

  _proto.remove = function remove(id) {
    if (!this.head) {
      return;
    }

    while (this.head && this.head.id === id) {
      this.head = this.head.next;
    }

    var current = this.head;

    while (current && current.next) {
      if (current.next.id === id) {
        current.next = current.next.next;
      } else {
        current = current.next;
      }
    }

    if (this.tail.id === id) {
      this.tail = current;
    }
  };

  _proto.clean = function clean() {
    this.head = null;
    this.tail = null;
  };

  _createClass(LinkedList, [{
    key: "length",
    get: function get() {
      var count = 0;
      var current = this.head;

      while (current) {
        count++;
        current = current.next;
      }

      return count;
    }
  }]);

  return LinkedList;
}();

function initEvents(snake) {
  snake._events = Object.create(null);
}
function eventsMixin(Snake) {
  Snake.prototype.$on = function (event, fn) {
    var snake = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        snake.$on(event[i], fn);
      }
    } else {
      (snake._events[event] || (snake._events[event] = [])).push(fn);
    }

    return snake;
  };

  Snake.prototype.$once = function (event, fn) {
    var snake = this;

    function on() {
      snake.$off(event, on);
      fn.apply(snake, arguments);
    }

    on.fn = fn;
    snake.$on(event, on);
    return snake;
  };

  Snake.prototype.$off = function (event, fn) {
    var snake = this;

    if (!arguments.length) {
      snake._events = Object.create(null);
      return snake;
    }

    if (Array.isArray(event)) {
      for (var _i = 0, l = event.length; _i < l; _i++) {
        snake.$off(event[_i], fn);
      }

      return snake;
    }

    var cbs = snake._events[event];

    if (!cbs) {
      return snake;
    }

    if (!fn) {
      snake._events[event] = null;
      return snake;
    }

    var cb;
    var i = cbs.length;

    while (i--) {
      cb = cbs[i];

      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }

    return snake;
  };

  Snake.prototype.$emit = function (event) {
    var snake = this;
    var cbs = snake._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);

      for (var i = 0, l = cbs.length; i < l; i++) {
        invoke(cbs[i], snake, args);
      }
    }

    return snake;
  };
}
function invoke(handler, context, args) {
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);
  } catch (e) {
    console.error(e);
  }

  return res;
}

var uid = 0;

var Cell = /*#__PURE__*/function () {
  function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.uid = uid++;
    this.node = null;
    this.oldClass = 'snake-map__col';
    this["class"] = this.oldClass;
    this.update();
  }

  var _proto = Cell.prototype;

  _proto.render = function render() {
    if (!this.node) {
      var node = createElement();
      node.classList.add(this.oldClass);
      this.node = node;
    }

    return this.node;
  };

  _proto.update = function update() {
    if (this.oldClass !== this["class"]) {
      var node = this.render();
      node.classList = this["class"];
      this.oldClass = this["class"];
    }
  };

  _proto.addSnakeColor = function addSnakeColor() {
    this["class"] = 'snake-map__col snake-map__col--snake';
  };

  _proto.addSnakeHeadColor = function addSnakeHeadColor() {
    this["class"] = 'snake-map__col snake-map__col--snake-head';
  };

  _proto.addFoodColor = function addFoodColor() {
    this["class"] = 'snake-map__col snake-map__col--food';
  };

  _proto.removeClass = function removeClass() {
    this["class"] = 'snake-map__col';
  };

  return Cell;
}();

var defer = function defer() {
  var cells = [];

  var update = function update() {
    for (var i in cells) {
      if (cells.hasOwnProperty(i)) {
        var cell = cells[i];

        if (cell instanceof Cell) {
          cell.update();
        }
      }
    }

    cells = [];
  };

  var add = function add(cell) {
    cells.push(cell);
  };

  return {
    add: add,
    update: update
  };
};

function initMap(snake) {
  snake._map = new LinkedList();
  snake._mapNode = null;
  snake._deferred = defer();
  snake.$on('update', snake._deferred.update);
}
function mapMixin(Snake) {
  Snake.prototype._createMap = function () {
    var snake = this;

    if (!snake._map.length) {
      for (var y = 0; y < snake.$options.rows; y++) {
        for (var x = 0; x < snake.$options.columns; x++) {
          var cell = new Cell(x, y);

          snake._map.append(cell.uid, cell);
        }
      }
    }

    return snake._map;
  };

  Snake.prototype._renderMap = function () {
    var snake = this;

    if (!snake._mapNode) {
      var map = this._createMap();

      var currentCell = map.head;
      var mapFragment = createFragment();
      var rowNode = createRowNode();
      var y = 0;

      while (currentCell) {
        if (y !== currentCell.data.y) {
          y = currentCell.data.y;
          mapFragment.append(rowNode);
          rowNode = createRowNode();
        }

        rowNode.append(currentCell.data.render());
        currentCell = currentCell.next;
      }

      snake._mapNode = mapFragment;
    }

    return snake._mapNode;
  };
}
function findCell(snake, colId, rowId) {
  if (snake._map) {
    return snake._map.find(function (data) {
      return data.x === colId && data.y === rowId;
    }, snake);
  }

  return null;
}

function createRowNode() {
  var node = createElement();
  node.classList.add('snake-map__row');
  return node;
}

function renderMixin(Snake) {
  Snake.prototype._mount = function (el) {
    var snake = this;
    el.append(snake._render());

    snake._update();
  };

  Snake.prototype._render = function () {
    var snake = this;

    var map = snake._renderMap();

    snake._renderSnake();

    snake._renderFoods();

    return map;
  };

  Snake.prototype._update = function () {
    var snake = this;
    snake.$emit('update');
  };
}

function initSnake(snake) {
  snake._snake = new LinkedList();
  snake._lengthStartSnake = 3;
  snake.$on('update', snake._updateSnake);
}
function snakeMixin(Snake) {
  Snake.prototype._renderSnake = function () {
    var snake = this;

    if (!snake._snake.length) {
      var centerRowId = Math.ceil(snake.$options.rows / 2);
      var centerColId = Math.ceil(snake.$options.columns / 2);
      var head = true;

      for (var i = 0; i < snake._lengthStartSnake; i++) {
        var cell = findCell(snake, centerColId - i, centerRowId);

        if (cell instanceof Cell) {
          if (head) {
            cell.addSnakeHeadColor();
            head = false;
          } else {
            cell.addSnakeColor();
          }

          snake._deferred.add(cell);

          snake._snake.append(cell.uid, cell);
        }
      }
    }

    return snake._snake;
  };

  Snake.prototype._updateSnake = function () {
    var snake = this;

    if (snake._snake.length) {
      var head = true;

      snake._snake["for"](function (cell) {
        if (head) {
          cell.addSnakeHeadColor();
          head = false;
        } else {
          cell.addSnakeColor();
        }

        cell.update();
      });
    }
  };
}
function unshiftSnake(snake) {
  if (snake._snake.length) {
    var tail = snake._snake.tail;

    if (tail.data instanceof Cell) {
      tail.data.removeClass();

      snake._deferred.add(tail.data);

      snake._snake.remove(tail.id);
    }
  }
}

function initFood(snake) {
  snake._foods = [];
  snake._maxFoods = 1;
}
function foodMixin(Snake) {
  Snake.prototype._cleanFoods = function () {
    var snake = this;

    for (var i = 0; i < snake._foods.length; i++) {
      var cell = snake._foods[i];

      if (cell instanceof Cell) {
        cell.removeClass();

        snake._deferred.add(cell);
      }

      snake._foods.splice(i, 1);
    }
  };

  Snake.prototype._renderFoods = function () {
    var snake = this;
    snake._foods = [];

    for (var i = 0; i < snake._maxFoods; i++) {
      var food = this._renderFood();

      snake._foods.push(food);
    }
  };

  Snake.prototype._renderFood = function (set) {
    var snake = this;
    var colId = randomInt(snake.$options.columns);
    var rowId = randomInt(snake.$options.rows);
    var cell = findCell(snake, colId, rowId);

    if (cell && snake._getEmployedIds().indexOf(cell.uid) < 0) {
      cell.addFoodColor();

      snake._deferred.add(cell);

      if (set) {
        snake._foods.push(cell);
      }

      return cell;
    }

    return snake._renderFood();
  };

  Snake.prototype._getEmployedIds = function () {
    var snake = this;
    var employedIds = [];

    if (snake._snake.length) {
      employedIds = [].concat(employedIds, snake._snake.toArray().map(function (i) {
        return i.uid;
      }));
    }

    if (snake._foods.length) {
      employedIds = [].concat(employedIds, snake._foods.map(function (i) {
        return i.uid;
      }));
    }

    return employedIds;
  };
}

function initMove(snake) {
  snake._direction = directions.right;
}
function moveMixin(Snake) {
  Snake.prototype._move = function () {
    var snake = this;
    var headSnake = snake._snake.head.data;
    var nextCell = getNextCol(snake, headSnake.x, headSnake.y);

    if (nextCell instanceof Cell) {
      snake._snake.prepend(nextCell.uid, nextCell);
    }

    unshiftSnake(snake);

    snake._update();
  };
}
function getNextCol(snake, colId, rowId) {
  var direction = snake._direction;

  switch (direction) {
    case directions.up:
    case directions.down:
      var nextRowId = direction === directions.up ? rowId - 1 : rowId + 1;

      if (nextRowId >= snake.$options.rows) {
        nextRowId = 0;
      }

      return findCell(snake, colId, nextRowId);

    case directions.right:
    case directions.left:
      var nextColId = direction === directions.left ? colId - 1 : colId + 1;

      if (nextColId >= snake.$options.columns) {
        nextColId = 0;
      }

      return findCell(snake, nextColId, rowId);
  }

  return null;
}

function initMixin(Snake) {
  Snake.prototype._init = function (el, options) {
    var snake = this;
    snake.$el = query(el);
    snake.$options = mergeOptions(defaultOptions, options || {});
    initEvents(snake);
    initMap(snake);
    initSnake(snake);
    initFood(snake);
    initMove(snake);

    if (snake.$el) {
      snake._mount(snake.$el);
    }
  };
}

function Snake(el, options) {
  this._init(el, options);
}

initMixin(Snake);
eventsMixin(Snake);
mapMixin(Snake);
renderMixin(Snake);
snakeMixin(Snake);
foodMixin(Snake);
moveMixin(Snake);

export default Snake;
