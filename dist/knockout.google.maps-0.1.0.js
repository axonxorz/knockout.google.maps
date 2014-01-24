/*
*   knockout.google.maps 0.1.0 (2014-01-25)
*   Created by Manuel Guilbault (https://github.com/manuel-guilbault)
*
*   Source: https://github.com/manuel-guilbault/knockout.google.maps
*   MIT License: http://www.opensource.org/licenses/MIT
*/!function(a){"function"==typeof require&&"object"==typeof exports&&"object"==typeof module?a(require("knockout"),exports):"function"==typeof define&&define.amd?define(["knockout","exports"],a):a(ko,ko.validation={})}(function(a){if(void 0===typeof a)throw"Knockout is required, please ensure it is loaded before loading this plugin";a.google={maps:{}},function(){function b(a,b){if(!b)return a;var c=g[b];return c?c.convertObjToVM(a):a}function c(a,b){if(!b)return a;var c=g[b];return c?c.convertVMToObj(a):a}function d(b,c,d,e,f){var g=a.utils.unwrapObservable(b[c]);void 0===g&&(g=e),f&&(g=f(g)),d[c]=g}function e(a){return"[object Array]"===Object.prototype.toString.call(a)}function f(a,b){var c=a.cloneNode(b);for(var d in c)0===d.indexOf("__ko__")&&(c[d]=void 0);return c}var g={bool:{convertObjToVM:function(a){return!!a},convertVMToObj:function(a){return!!a}}};a.google.maps.utils={typeConverters:g,convertObjToVM:b,convertVMToObj:c,assignBindingToOptions:d,isArray:e,cloneNode:f}}(),function(){var b=function(){this.handlers=[]};b.prototype.add=function(c){if("function"==typeof c)this.handlers.push(c);else if(a.google.maps.utils.isArray(c))Array.prototype.push.apply(this.handlers,c);else{if("object"!=typeof c||Object.getPrototypeOf(c)!==b.prototype)throw new TypeError("Invalid subscription");Array.prototype.push.apply(this.handlers,c.handlers)}},b.prototype.addGMListener=function(a){this.handlers.push(function(){google.maps.event.removeListener(a)})},b.prototype.addKOSubscription=function(a){this.handlers.push(function(){a.dispose()})},b.prototype.clear=function(){this.handlers=[]},b.prototype.dispose=function(){for(var a=0;a<this.handlers.length;++a)this.handlers[a]();this.clear()},a.google.maps.Subscriptions=b}(),function(){function b(b,c,d,e){if("string"==typeof e)a.google.maps.utils.assignBindingToOptions(c,e,d,void 0,function(b){return void 0===b?void 0:a.google.maps.utils.convertVMToObj(b,e.type)});else if("object"==typeof e)a.google.maps.utils.assignBindingToOptions(c,e.name,d,e.defaultValue,e.transform||function(b){return void 0===b?void 0:a.google.maps.utils.convertVMToObj(b,e.type)});else{if("function"!=typeof e)throw new TypeError("Unsupported createOptions definition");e(b,c,d)}}function c(c,d,e,f){f&&!a.google.maps.utils.isArray(f)&&(f=[f]);for(var g=0;g<f.length;++g)b(c,d,e,f[g])}function d(a,b,d){var e={};for(var f in d){var g=d[f];g.createOptions&&c(a,b,e,g.createOptions)}return e}function e(a,b){if("function"==typeof b)return b.apply(a,[]);if("string"==typeof b)return a[b].apply(a,[]);throw new TypeError("Invalid getter")}function f(a,b,c){if("function"==typeof b)return b.apply(void 0,[a,c]);if("string"==typeof b)return a[b].apply(a,[c]);throw new TypeError("Invalid setter")}function g(b,c,d,g,h){"string"==typeof h&&(h={name:h}),a.isObservable(c[h.name])&&(h.vmToObj||(h.vmToObj={}),h.vmToObj.setter?g.addKOSubscription(c[h.name].subscribe(function(b){f(d,h.vmToObj.setter,a.google.maps.utils.convertVMToObj(b,h.type))})):"function"!=typeof d.setOptions||h.vmToObj.noOptions||g.addKOSubscription(c[h.name].subscribe(function(b){var c={};c[h.vmToObj.option||h.name]=a.google.maps.utils.convertVMToObj(b,h.type),d.setOptions(c)})),h.objToVM&&g.addGMListener(google.maps.event.addListener(d,h.objToVM.event,function(){var b=e(d,h.objToVM.getter);b=a.google.maps.utils.convertObjToVM(b,h.type),c[h.name](b)})))}function h(b,c,d,e,f){f&&!a.google.maps.utils.isArray(f)&&(f=[f]);for(var h=0;h<f.length;++h)g(b,c,d,e,f[h])}function i(a,b,c,d,e){"function"==typeof b[e]&&d.addGMListener(google.maps.event.addListener(c,e,function(c){b[e](a.$data,c)}))}function j(b,c,d,e,f){f&&!a.google.maps.utils.isArray(f)&&(f=[f]);for(var g=0;g<f.length;++g)i(b,c,d,e,f[g])}function k(a,b,c,d,e){for(var f in e){var g=e[f];g.bindings&&h(a,b,c,d,g.bindings),g.events&&j(a,b,c,d,g.events),g.bind&&g.bind(a,b,c,d)}}a.google.maps.binder={getCreateOptions:d,bind:k}}(),function(){function b(a,b,c){b?(a.setDirections(b),a.setMap(c)):a.setMap(null)}a.bindingHandlers.directions={init:function(c,d,e,f,g){if(void 0===g.$map)throw"directions binding must be used only inside the scope of a map binding.";var h=a.utils.unwrapObservable(d()),i=h.route;if(void 0===i)throw"directions binding must have a route binding.";var j=a.google.maps.binder.getCreateOptions(g,h,a.bindingHandlers.directions.binders),k=new google.maps.DirectionsRenderer(j),l=new a.google.maps.Subscriptions;a.google.maps.binder.bind(g,h,k,l,a.bindingHandlers.directions.binders),b(k,a.utils.unwrapObservable(i),g.$map),a.isObservable(i)&&l.addKOSubscription(i.subscribe(function(a){b(k,a,g.$map)}));var m=g.$subscriptions;return m.add(function(){l.dispose(),k.setMap(null)}),{controlsDescendantBindings:!0}},binders:{draggable:{createOptions:{name:"draggable",type:"bool"}},suppressBicyclingLayer:{createOptions:{name:"suppressBicyclingLayer",type:"bool"},bindings:{name:"suppressBicyclingLayer",type:"bool"}},suppressMarkers:{createOptions:{name:"suppressMarkers",type:"bool"},bindings:{name:"suppressMarkers",type:"bool"}},suppressInfoWindows:{createOptions:{name:"suppressInfoWindows",type:"bool"},bindings:{name:"suppressInfoWindows",type:"bool"}},suppressPolylines:{createOptions:{name:"suppressPolylines",type:"bool"},bindings:{name:"suppressPolylines",type:"bool"}}}}}(),function(){function b(b){return a.utils.domData.get(b,"isOpen")}function c(b,c){a.utils.domData.set(b,"isOpen",!!c)}function d(c){b(c)&&c.close(),a.utils.domData.clear(c)}a.bindingHandlers.infoWindow={init:function(b,c,e,f,g){if(void 0===g.$map)throw"infoWindow binding must be used only inside the scope of a map binding.";var h=a.utils.unwrapObservable(c()),i=g.extend({});a.applyBindingsToDescendants(i,b);var j=a.google.maps.binder.getCreateOptions(g,h,a.bindingHandlers.infoWindow.binders);j.content=b;var k=new google.maps.InfoWindow(j),l=new a.google.maps.Subscriptions;a.google.maps.binder.bind(g,h,k,l,a.bindingHandlers.infoWindow.binders);var m=g.$subscriptions;return m.add(function(){l.dispose(),d(k)}),{controlsDescendantBindings:!0}},binders:{visible:{bind:function(b,d,e,f){var g=!1;a.utils.unwrapObservable(d.visible)&&(e.open(b.$map,a.utils.unwrapObservable(d.anchor)),g=!0),c(e,g),a.isObservable(d.visible)&&(f.addKOSubscription(d.visible.subscribe(function(f){var g=g(e);g&&!f?e.close():!g&&f&&e.open(b.$map,a.utils.unwrapObservable(d.anchor)),c(e,f)})),f.addGMListener(google.maps.event.addListener(e,"closeclick",function(){c(e,!1),d.visible(!1)})))}},panToSelfWhenShown:{bind:function(b,c,d,e){a.isObservable(c.visible)?e.addKOSubscription(c.visible.subscribe(function(b){a.utils.unwrapObservable(c.panToSelfWhenShown)&&b&&d.panToSelf()})):a.utils.unwrapObservable(c.panToSelfWhenShown)&&a.utils.unwrapObservable(c.visible)&&d.panToSelf()}},disableAutoPan:{createOptions:{name:"disableAutoPan",type:"bool"},bindings:{name:"disableAutoPan",type:"bool"}},maxWidth:{createOptions:{name:"maxWidth",defaultValue:0},bindings:"maxWidth"},pixelOffset:{createOptions:{name:"pixelOffset",defaultValue:new google.maps.Size(0,0)},bindings:"pixelOffset"},position:{createOptions:"position",bindings:{name:"position",vmToObj:{setter:"setPosition"}}}}}}(),a.bindingHandlers.map={init:function(b,c,d,e,f){var g=a.utils.unwrapObservable(c()),h=a.google.maps.utils.cloneNode(b,!0),i=a.google.maps.binder.getCreateOptions(f,g,a.bindingHandlers.map.binders),j=new google.maps.Map(b,i),k=new a.google.maps.Subscriptions;a.google.maps.binder.bind(f,g,j,k,a.bindingHandlers.map.binders);var l=f.extend({$map:j,$subscriptions:k});return a.applyBindingsToDescendants(l,h),a.utils.domNodeDisposal.addDisposeCallback(b,function(){k.dispose(),a.cleanNode(h)}),{controlsDescendantBindings:!0}},binders:{center:{createOptions:"center",bind:function(b,c,d,e){if(a.isObservable(c.center)){var f=!1;e.addGMListener(google.maps.event.addListener(d,"center_changed",function(){f||(f=!0,c.center(d.getCenter()),f=!1)})),e.addKOSubscription(c.center.subscribe(function(){f||(f=!0,a.utils.unwrapObservable(c.panCenter)?d.panTo(c.center()):d.setCenter(c.center()),f=!1)}))}}},zoom:{createOptions:{name:"zoom",defaultValue:8},bindings:{name:"zoom",objToVM:{event:"zoom_changed",getter:"getZoom"},vmToObj:{setter:"setZoom"}}},mapTypeId:{createOptions:"mapTypeId",bindings:{name:"mapTypeId",vmToObj:{setter:"setMapTypeId"}}},bounds:{createOptions:"bounds",bind:function(b,c,d,e){if(a.isObservable(c.bounds)){var f=!1;e.addGMListener(google.maps.event.addListenerOnce(d,"idle",function(){f=!0,c.bounds(d.getBounds()),f=!1})),e.addGMListener(google.maps.event.addListener(d,"bounds_changed",function(){f||(f=!0,c.bounds(d.getBounds()),f=!1)})),e.addKOSubscription(c.bounds.subscribe(function(){f||(f=!0,a.utils.unwrapObservable(c.panBounds)?d.panToBounds(c.bounds()):d.fitBounds(c.bounds()),f=!1)}))}}},backgroundColor:{createOptions:"backgroundColor"},draggable:{createOptions:{name:"draggable",type:"bool"},bindings:{name:"draggable",type:"bool"}},maxZoom:{createOptions:"maxZoom",bindings:"maxZoom"},minZoom:{createOptions:"minZoom",bindings:"minZoom"},dragend:{events:"dragend"},idle:{events:"idle"}}},function(){function b(b,c,d,e){var f=a.google.maps.utils.cloneNode(c,!0);e.add(function(){a.cleanNode(f)});var g=b.createChildContext(d).extend({$subscriptions:e});a.applyBindingsToDescendants(g,f)}function c(c,d,g){for(var h,i=a.utils.domData.get(d,e)||[],j=a.utils.domData.get(d,f)||[],k=a.utils.compareArrays(i,g),l=0;l<k.length;++l){var m=k[l];switch(m.status){case"added":h=new a.google.maps.Subscriptions,b(c,d,m.value,h),j.splice(m.index,0,h);break;case"deleted":h=j.splice(m.index,1),h[0].dispose()}}a.utils.domData.set(d,e,g.slice(0)),a.utils.domData.set(d,f,j)}function d(b,c){for(var d=a.utils.domData.get(c,f)||[],e=0;e<d.length;++e)d[e].dispose()}var e="ko.google.maps.items",f="ko.google.maps.items.subscriptions";a.bindingHandlers.mapItems={init:function(b,e,f,g,h){var i=e(),j=a.utils.unwrapObservable(i);c(h,b,j);var k=new a.google.maps.Subscriptions;a.isObservable(i)&&k.addKOSubscription(i.subscribe(function(a){c(h,b,a)}));var l=h.$subscriptions;return l.add(function(){d(h,b)}),{controlsDescendantBindings:!0}}},a.virtualElements.allowedBindings.mapItems=!0}(),a.bindingHandlers.marker={init:function(b,c,d,e,f){if(void 0===f.$map)throw"marker binding must be used only inside the scope of a map binding.";var g=a.utils.unwrapObservable(c()),h=a.google.maps.binder.getCreateOptions(f,g,a.bindingHandlers.marker.binders);h.map=f.$map;var i=new google.maps.Marker(h),j=new a.google.maps.Subscriptions;a.google.maps.binder.bind(f,g,i,j,a.bindingHandlers.marker.binders);var k=f.extend({$marker:i,$subscriptions:j});a.applyBindingsToDescendants(k,b);var l=f.$subscriptions;return l.add(function(){j.dispose(),i.setMap(null)}),{controlsDescendantBindings:!0}},binders:{animation:{createOptions:"animation",bindings:{name:"animation",vmToObj:{setter:"setAnimation"}}},clickable:{createOptions:{name:"clickable",type:"bool"},bindings:{name:"clickable",type:"bool",vmToObj:{setter:"setClickable"}}},cursor:{createOptions:"cursor",bindings:{name:"cursor",vmToObj:{setter:"setCursor"}}},icon:{createOptions:"icon",bindings:{name:"icon",vmToObj:{setter:"setIcon"}}},raiseOnDrag:{createOptions:{name:"raiseOnDrag",type:"bool"}},shadow:{createOptions:"shadow",bindings:{name:"shadow",vmToObj:{setter:"setShadow"}}},position:{createOptions:"position",bind:function(b,c,d,e){if(a.isObservable(c.position)){var f=!1;e.addKOSubscription(c.position.subscribe(function(){f||(f=!0,d.setPosition(c.position()),f=!1)}));var g=a.utils.unwrapObservable(c.positionUpdateOnDragEnd)?"dragend":"position_changed";e.addGMListener(google.maps.event.addListener(d,g,function(){f||(f=!0,c.position(d.getPosition()),f=!1)}))}}},draggable:{createOptions:{name:"draggable",type:"bool"},bindings:{name:"draggable",vmToObj:{setter:"setDraggable"}}},flat:{createOptions:{name:"flat",type:"bool"},bindings:{name:"flat",type:"bool",vmToObj:{setter:"setFlat"}}},title:{createOptions:"title",bindings:{name:"title",vmToObj:{setter:"setTitle"}}},visible:{createOptions:{name:"visible",type:"bool"},bindings:{name:"visible",type:"bool",vmToObj:{setter:"setVisible"}}},zIndex:{createOptions:"zIndex",bindings:{name:"zIndex",vmToObj:{setter:"setZIndex"}}},click:{events:"click"},doubleclick:{events:"dblclick"},rightclick:{events:"rightclick"},mousedown:{events:"mousedown"},mouseout:{events:"mouseout"},mouseover:{events:"mouseover"},mouseup:{events:"mouseup"}}},a.virtualElements.allowedBindings.marker=!0});