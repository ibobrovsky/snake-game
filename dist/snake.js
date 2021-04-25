(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Snake = factory());
}(this, (function () { 'use strict';

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
          node.setAttribute('id', this.x + "_" + this.y);
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
    function isCell(v) {
      return v instanceof Cell;
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

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (it) return (it = it.call(o)).next.bind(it);

      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        return function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function hasOwn(obj, key) {
      return hasOwnProperty.call(obj, key);
    }
    function randomInt(max) {
      return Math.floor(Math.random() * max);
    }

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

    var defer = function defer() {
      var cells = [];

      var update = function update() {
        for (var i in cells) {
          if (cells.hasOwnProperty(i)) {
            var cell = cells[i];

            if (isCell(cell)) {
              cell.update();
            }
          }
        }

        cells = [];
      };

      var add = function add(cell) {
        if (isCell(cell) && !has(cell)) {
          cells.push(cell);
        }
      };

      var has = function has(cell) {
        for (var _iterator = _createForOfIteratorHelperLoose(cells), _step; !(_step = _iterator()).done;) {
          var i = _step.value;

          if (i.uid === cell.uid) {
            return true;
          }
        }

        return false;
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
          var map = snake._createMap();

          var currentCell = map.head;
          var mapFragment = createFragment();
          var rowNode = createRowNode();
          var countColumns = snake.$options.columns;
          var i = 0;

          while (currentCell) {
            rowNode.append(currentCell.data.render());
            i++;

            if (i == countColumns) {
              mapFragment.append(rowNode);
              rowNode = createRowNode();
              i = 0;
            }

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
    function removeClass(snake, cell) {
      addSnakeClass(snake, cell, 'removeClass');
    }
    function addFoodColor(snake, cell) {
      addSnakeClass(snake, cell, 'addFoodColor');
    }
    function addSnakeColor(snake, cell) {
      addSnakeClass(snake, cell, 'addSnakeColor');
    }
    function addSnakeHeadColor(snake, cell) {
      addSnakeClass(snake, cell, 'addSnakeHeadColor');
    }

    function addSnakeClass(snake, cell, methodName) {
      if (isCell(cell) && typeof cell[methodName] === 'function') {
        snake._deferred.add(cell);

        cell[methodName]();
      }
    }

    function createRowNode() {
      var node = createElement();
      node.classList.add('snake-map__row');
      return node;
    }

    function initSnake(snake) {
      snake._snake = new LinkedList();
      snake._lengthStartSnake = 3;
      snake.$on('render', snake._renderSnake);
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

            if (isCell(cell)) {
              if (head) {
                addSnakeHeadColor(snake, cell);
                head = false;
              } else {
                addSnakeColor(snake, cell);
              }

              snake._snake.append(cell.uid, cell);
            }
          }
        }

        return snake._snake;
      };
    }
    function pushHeadSnake(snake, nextCell) {
      if (!isCell(nextCell)) {
        return;
      }

      if (snake._snake.length > 1 && snake._snake.head) {
        var oldHeadSnake = snake._snake.head.data;

        if (isCell(oldHeadSnake)) {
          addSnakeColor(snake, oldHeadSnake);
        }
      }

      addSnakeHeadColor(snake, nextCell);

      snake._snake.prepend(nextCell.uid, nextCell);
    }
    function unshiftTailSnake(snake) {
      if (!snake._snake.length) return;
      var tail = snake._snake.tail;

      if (isCell(tail.data)) {
        removeClass(snake, tail.data);

        snake._snake.remove(tail.id);
      }
    }

    function initFood(snake) {
      snake._foods = [];
      snake._maxFoods = 1;
      snake.$on('render', snake._renderFoods);
      snake.$on('collision', snake._collisionFoods);
    }
    function foodMixin(Snake) {
      Snake.prototype._cleanFoods = function () {
        var snake = this;

        for (var i = 0; i < snake._foods.length; i++) {
          var cell = snake._foods[i];

          if (isCell(cell)) {
            removeClass(snake, cell);
          }

          snake._foods.splice(i, 1);
        }
      };

      Snake.prototype._cleanFood = function (uid) {
        var snake = this;

        for (var i = 0; i < snake._foods.length; i++) {
          var cell = snake._foods[i];

          if (isCell(cell) && cell.uid == uid) {
            removeClass(snake, cell);

            snake._foods.splice(i, 1);

            break;
          }
        }
      };

      Snake.prototype._renderFoods = function () {
        var snake = this;
        snake._foods = [];

        for (var i = 0; i < snake._maxFoods; i++) {
          var food = snake._renderFood();

          snake._foods.push(food);
        }
      };

      Snake.prototype._renderFood = function (set) {
        var snake = this;
        var colId = randomInt(snake.$options.columns);
        var rowId = randomInt(snake.$options.rows);
        var cell = findCell(snake, colId, rowId);

        if (cell && snake._getEmployedIds().indexOf(cell.uid) < 0) {
          addFoodColor(snake, cell);

          if (set) {
            snake._foods.push(cell);
          }

          return cell;
        }

        return snake._renderFood(set);
      };

      Snake.prototype._collisionFoods = function (uid) {
        var snake = this;

        snake._renderFood(true);

        snake._cleanFood(uid);
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
      snake._step = false;
      snake._collision = false;
      document.addEventListener('keydown', function (e) {
        onKeyDown(snake, e);
      });
    }
    function moveMixin(Snake) {
      Snake.prototype._move = function () {
        var snake = this;
        var headSnake = snake._snake.head.data;
        var nextCell = getNextCol(snake, headSnake.x, headSnake.y);

        if (isCollision(snake, nextCell)) {
          snake.$emit('collision', nextCell.uid);
          snake._collision = true;
        }

        pushHeadSnake(snake, nextCell);

        if (!snake._collision) {
          unshiftTailSnake(snake);
        }

        snake._update();

        snake._collision = false;
        snake._step = true;
      };
    }
    function onKeyDown(snake, e) {
      if (!snake._step) return;

      switch (e.keyCode) {
        case 38:
        case 87:
          changeDirection(snake, directions.up);
          break;

        case 39:
        case 68:
          changeDirection(snake, directions.right);
          break;

        case 40:
        case 83:
          changeDirection(snake, directions.down);
          break;

        case 37:
        case 65:
          changeDirection(snake, directions.left);
          break;
      }

      snake._step = false;
    }
    function changeDirection(snake, direction) {
      var change = false;

      switch (direction) {
        case directions.up:
          if (snake._direction !== directions.down) {
            change = true;
          }

          break;

        case directions.right:
          if (snake._direction !== directions.left) {
            change = true;
          }

          break;

        case directions.down:
          if (snake._direction !== directions.up) {
            change = true;
          }

          break;

        case directions.left:
          if (snake._direction !== directions.right) {
            change = true;
          }

          break;
      }

      if (change) {
        snake._direction = direction;
      }
    }
    function getNextCol(snake, colId, rowId) {
      var direction = snake._direction;

      switch (direction) {
        case directions.up:
        case directions.down:
          var nextRowId = direction === directions.up ? rowId - 1 : rowId + 1;

          if (nextRowId >= snake.$options.rows) {
            nextRowId = 0;
          } else if (nextRowId < 0) {
            nextRowId = snake.$options.rows - 1;
          }

          return findCell(snake, colId, nextRowId);

        case directions.right:
        case directions.left:
          var nextColId = direction === directions.left ? colId - 1 : colId + 1;

          if (nextColId >= snake.$options.columns) {
            nextColId = 0;
          } else if (nextColId < 0) {
            nextColId = snake.$options.columns - 1;
          }

          return findCell(snake, nextColId, rowId);
      }

      return null;
    }
    function isCollision(snake, nextCell) {
      if (isCell(nextCell)) {
        var foods = snake._foods.map(function (i) {
          return i.uid;
        });

        return foods.indexOf(nextCell.uid) >= 0;
      }

      return false;
    }

    function initGame(snake) {
      snake._score = 0;
      snake._timeout = 150;
      snake._speed = 1;
      snake._pause = true;
      snake._interval = null;
      document.addEventListener('keydown', function (e) {
        onKeyUp(snake, e);
      });
    }
    function gameMixin(Snake) {
      Snake.prototype.newGame = function () {
        var snake = this;
        snake.$emit('newGame');
      };

      Snake.prototype.start = function () {
        var snake = this;
        clearScore(snake);
        snake._pause = false;
        return snake._interval = setInterval(function () {
          snake._move();
        }, speed(snake));
      };

      Snake.prototype.pause = function () {
        var snake = this;

        if (snake._interval) {
          clearInterval(snake._interval);
          snake._interval = null;
          snake._pause = true;
        }
      };
    }
    function speed(snake) {
      return Math.max(20, snake._timeout - 50 * snake._speed);
    }
    function clearScore(snake) {
      snake._score = 0;
    }

    function onKeyUp(snake, e) {
      if (e.keyCode == 32) {
        snake._pause ? snake.start() : snake.pause();
      }
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
        initGame(snake);

        if (snake.$el) {
          snake._mount(snake.$el);
        }
      };
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

        snake.$emit('render');
        return map;
      };

      Snake.prototype._update = function () {
        var snake = this;
        snake.$emit('update');

        snake._deferred.update();
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
    gameMixin(Snake);

    return Snake;

})));
