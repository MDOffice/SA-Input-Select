(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("SAInputSelect", [], factory);
	else if(typeof exports === 'object')
		exports["SAInputSelect"] = factory();
	else
		root["SAInputSelect"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var SAInputSelect = /*#__PURE__*/function (_HTMLElement) {
  _inherits(SAInputSelect, _HTMLElement);

  var _super = _createSuper(SAInputSelect);

  function SAInputSelect() {
    var _this;

    _classCallCheck(this, SAInputSelect);

    _this = _super.call(this);
    _this._isAppend = false;
    _this._appendSeparator = ' ';
    _this.handleInputClick = _this.handleInputClick.bind(_assertThisInitialized(_this));
    _this.hideDropdown = _this.hideDropdown.bind(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    _this.hideDropdown = _this.hideDropdown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SAInputSelect, [{
    key: "value",
    get: function get() {
      return this.getAttribute('value');
    },
    set: function set(text) {
      this.setAttribute('value', text);

      if (this._input) {
        this._input.value = text;
      }
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if (attrName === 'data-is-append') {
        if (newValue != undefined) {
          this._isAppend = newValue === 'true' || newValue === '1' || newValue == '';
        } else {
          this._isAppend = false;
        }
      } else if (attrName === 'data-append-separator') {
        if (newValue) {
          this._appendSeparator = newValue;
        } else {
          this._appendSeparator = ' ';
        }
      }
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var mountPoint = document.createElement('div');
      this.appendChild(mountPoint); //const mountPoint = this.attachShadow({ mode: 'open' });
      //mountPoint.innerHTML = '<style>.dropdown-menu {display: none;position: absolute;}.dropdown-menu.open {display: block;}</style>';

      this.makeInput(mountPoint);
      this.makeDropdown(mountPoint);
      this.assignEvent();
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this._input.removeEventListener('click', this.handleInputClick);

      this._input.removeEventListener('keydown', this.hideDropdown);

      this._input.removeEventListener('change', this.handleInputChange);

      this.removeChild(this.getElementsByTagName('div').item(0));
      delete this._input;
      delete this._dropdown;
      document.removeEventListener('click', this.hideDropdown);
    }
  }, {
    key: "makeInput",
    value: function makeInput(shadow) {
      this._input = document.createElement('input');
      this._input.autocomplete = 'off';

      this._input.setAttribute('class', this.getAttribute('input-class') || '');

      var readonly = this.getAttribute('readonly');
      if (readonly != undefined) this._input.setAttribute('readonly', this.getAttribute('readonly'));
      var disabled = this.getAttribute('disabled');
      if (disabled != undefined) this._input.setAttribute('disabled', this.getAttribute('disabled'));
      this._input.value = this.getAttribute('value') || '';

      this._input.addEventListener('click', this.handleInputClick);

      this._input.addEventListener('keydown', this.hideDropdown);

      this._input.addEventListener('change', this.handleInputChange);

      shadow.appendChild(this._input);
    }
  }, {
    key: "makeDropdown",
    value: function makeDropdown(shadow) {
      var _this2 = this;

      this._dropdown = document.createElement('ul');

      this._dropdown.setAttribute('class', 'sa-input-select-dropdown ' + this.getAttribute('dropdown-class') || 0); //this._dropdown.className = 'dropdown-menu';


      var options = this.getElementsByTagName('option');
      Array.from(options).forEach(function (el) {
        var text = el.innerHTML;
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.innerHTML = text.replace(/^$/, '&nbsp;');
        a.addEventListener('click', function (ev) {
          ev.preventDefault();

          _this2.handleItemClick(a.innerHTML);
        });
        li.appendChild(a);

        _this2._dropdown.appendChild(li);
      }); //shadow.appendChild(this._dropdown);
    }
  }, {
    key: "hideDropdown",
    value: function hideDropdown() {
      var body = document.getElementsByTagName('body').item(0);

      if (this._dropdown.classList.contains('open')) {
        body.removeChild(this._dropdown);

        this._dropdown.classList.remove('open');
      }
    }
  }, {
    key: "handleInputClick",
    value: function handleInputClick(ev) {
      ev.stopPropagation();
      var body = document.getElementsByTagName('body').item(0);

      if (this._dropdown.classList.contains('open')) {
        body.removeChild(this._dropdown);

        this._dropdown.classList.remove('open');
      } else {
        body.appendChild(this._dropdown);

        this._dropdown.classList.add('open');

        var el = ev.target;
        var height = el.offsetHeight;

        var _this$getGlobalOffset = this.getGlobalOffset(el),
            offsetLeft = _this$getGlobalOffset.left,
            offsetTop = _this$getGlobalOffset.top;

        console.log(offsetLeft, offsetTop);
        this._dropdown.style.top = offsetTop + height + 'px';
        this._dropdown.style.left = offsetLeft + 'px';
      }
    }
  }, {
    key: "getGlobalOffset",
    value: function getGlobalOffset(el) {
      var x = 0,
          y = 0;

      while (el) {
        x += el.offsetLeft;
        y += el.offsetTop;
        el = el.offsetParent;
      }

      return {
        left: x,
        top: y
      };
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(ev) {
      ev.stopPropagation();
      var el = ev.target;
      this.value = el.value;
      this.makeChangeEvent();
    }
  }, {
    key: "handleItemClick",
    value: function handleItemClick(text) {
      if (this._isAppend) {
        this.value += this._appendSeparator + text.replace(/^&nbsp;$/, '');
      } else {
        this.value = text.replace(/^&nbsp;$/, '');
      }

      this.makeChangeEvent();
      this.hideDropdown();
    }
  }, {
    key: "makeChangeEvent",
    value: function makeChangeEvent() {
      var event = new Event('change', {
        bubbles: true
      });
      this.dispatchEvent(event);
    }
  }, {
    key: "assignEvent",
    value: function assignEvent() {
      document.addEventListener('click', this.hideDropdown);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['data-is-append', 'data-append-separator'];
    }
  }]);

  return SAInputSelect;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('sa-input-select', SAInputSelect);
/******/ 	return __webpack_exports__;
/******/ })()
;
});