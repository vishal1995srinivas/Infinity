!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("react"),require("classnames"),require("@material/react-ripple/dist/index.js"));else if("function"==typeof define&&define.amd)define(["react","classnames","@material/react-ripple/dist/index.js"],t);else{var r="object"==typeof exports?t(require("react"),require("classnames"),require("@material/react-ripple/dist/index.js")):t(e.react,e.classnames,e["@material/react-ripple/dist/index.js"]);for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}("undefined"!=typeof self?self:this,function(e,t,r){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=105)}({0:function(t,r){t.exports=e},1:function(e,r){e.exports=t},105:function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__assign||function(){return(i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},a=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var l=s(r(0)),c=s(r(1)),u=r(156),f=r(5),p=s(r(106));t.NativeRadioControl=p.default;var d=function(e){function t(t){var r=e.call(this,t)||this;return r.radioElement=l.default.createRef(),r.rippleActivatorRef=l.default.createRef(),r.state={classList:new Set,disabled:!1,nativeControlId:""},r.foundation=new u.MDCRadioFoundation(r.adapter),r}return o(t,e),t.prototype.componentDidMount=function(){this.foundation.init();var e=this.props.children.props;e.disabled&&this.foundation.setDisabled(e.disabled),e.id&&this.setState({nativeControlId:e.id}),this.rippleActivatorRef&&this.rippleActivatorRef.current&&this.props.initRipple(this.radioElement.current,this.rippleActivatorRef.current)},t.prototype.componentWillUnmount=function(){this.foundation&&this.foundation.destroy()},t.prototype.componentDidUpdate=function(e){var t=this.props.children;if(t){var r=t.props;r.disabled!==e.children.props.disabled&&this.foundation.setDisabled(r.disabled),r.id!==e.children.props.id&&this.setState({nativeControlId:r.id})}else l.default.Children.only(t)},Object.defineProperty(t.prototype,"classes",{get:function(){var e=this.state.classList,t=this.props.className;return c.default("mdc-radio",Array.from(e),t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"adapter",{get:function(){var e=this;return{addClass:function(t){var r=new Set(e.state.classList);r.add(t),e.setState({classList:r})},removeClass:function(t){var r=new Set(e.state.classList);r.delete(t),e.setState({classList:r})},setNativeControlDisabled:function(t){return e.setState({disabled:t})}}},enumerable:!0,configurable:!0}),t.prototype.render=function(){var e=this.state.nativeControlId,t=this.props,r=t.label,n=(t.initRipple,t.unbounded,t.className,t.wrapperClasses),o=a(t,["label","initRipple","unbounded","className","wrapperClasses"]);return l.default.createElement("div",{className:c.default("mdc-form-field",n)},l.default.createElement("div",i({className:this.classes,ref:this.radioElement},o),this.renderNativeControl(),l.default.createElement("div",{className:"mdc-radio__background"},l.default.createElement("div",{className:"mdc-radio__outer-circle"}),l.default.createElement("div",{className:"mdc-radio__inner-circle"}))),r?l.default.createElement("label",{htmlFor:e},r):null)},t.prototype.renderNativeControl=function(){var e=l.default.Children.only(this.props.children),t=Object.assign({},e.props,{disabled:this.state.disabled,rippleActivatorRef:this.rippleActivatorRef});return l.default.cloneElement(e,t)},t.defaultProps={label:"",initRipple:function(){},className:"",wrapperClasses:"",unbounded:!0},t}(l.default.Component);t.Radio=d,t.default=f.withRipple(d)},106:function(e,t,r){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=i(r(0)),s=i(r(1));t.default=function(e){var t=e.rippleActivatorRef,r=e.className,i=void 0===r?"":r,l=o(e,["rippleActivatorRef","className"]);return a.default.createElement("input",n({type:"radio",className:s.default("mdc-radio__native-control",i),ref:t},l))}},156:function(e,t,r){"use strict";r.r(t);"function"==typeof Symbol&&Symbol.iterator;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};var o=function(){return(o=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var i=function(){function e(e){void 0===e&&(e={}),this.adapter_=e}return Object.defineProperty(e,"cssClasses",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{}},enumerable:!0,configurable:!0}),e.prototype.init=function(){},e.prototype.destroy=function(){},e}(),a={NATIVE_CONTROL_SELECTOR:".mdc-radio__native-control"},s={DISABLED:"mdc-radio--disabled",ROOT:"mdc-radio"};r.d(t,"MDCRadioFoundation",function(){return l});
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var l=function(e){function t(r){return e.call(this,o({},t.defaultAdapter,r))||this}return function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}(t,e),Object.defineProperty(t,"cssClasses",{get:function(){return s},enumerable:!0,configurable:!0}),Object.defineProperty(t,"strings",{get:function(){return a},enumerable:!0,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},setNativeControlDisabled:function(){}}},enumerable:!0,configurable:!0}),t.prototype.setDisabled=function(e){var r=t.cssClasses.DISABLED;this.adapter_.setNativeControlDisabled(e),e?this.adapter_.addClass(r):this.adapter_.removeClass(r)},t}(i);t.default=l},5:function(e,t){e.exports=r}})});
//# sourceMappingURL=radio.js.map