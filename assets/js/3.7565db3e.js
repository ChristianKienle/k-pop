(window.webpackJsonp=window.webpackJsonp||[]).push([[3,4,5,9,10],{174:function(t,e,n){},175:function(t,e,n){},176:function(t,e,n){},178:function(t,e,n){"use strict";var r=n(174);n.n(r).a},179:function(t,e,n){},180:function(t,e,n){},181:function(t,e,n){},182:function(t,e,n){},183:function(t,e,n){"use strict";n.r(e);var r={props:["label"]},i=(n(178),n(3)),o=Object(i.a)(r,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row"},[e("label",{staticClass:"label"},[this._v(this._s(this.label)+":")]),this._v(" "),e("div",{staticClass:"control"},[this._t("default")],2)])},[],!1,null,"4277863c",null);e.default=o.exports},184:function(t,e,n){"use strict";var r=n(175);n.n(r).a},185:function(t,e,n){"use strict";var r=n(176);n.n(r).a},186:function(t,e,n){"use strict";n.r(e);var r={name:"trigger",props:{native:{type:Boolean,default:!1}},computed:{classes:function(){return this.native?null:["kpop-button"]}}},i=(n(185),n(3)),o=Object(i.a)(r,function(){var t=this.$createElement;return(this._self._c||t)("button",this._g({class:this.classes},this.$listeners),[this._t("default")],2)},[],!1,null,"515f31a9",null);e.default=o.exports},187:function(t,e,n){"use strict";n.r(e);var r={components:{SettingRow:n(183).default},watch:{kPopProps:function(t){this.$emit("changed",t)}},computed:{kPopProps:function(){return{modifiers:{preventOverflow:{enabled:"disabled"!==this.overflowContainer,boundariesElement:"disabled"===this.overflowContainer?"scrollParent":this.overflowContainer}},adjustsBodyWidth:this.adjustsBodyWidth,offset:this.offset,flips:this.flips,placement:this.placement,withArrow:this.withArrow,theme:"none"===this.theme?null:this.theme}}},data:function(){return{adjustsBodyWidth:!1,triggerWidth:250,useNativeButton:!1,offset:0,theme:"clean",overflowContainer:"scrollParent",placement:"bottom",flips:!0,withArrow:!0,overflowContainers:["disabled","scrollParent","window","viewport"],placements:["top-start","top","top-end","left-start","left","left-end","right-start","right","right-end","bottom-start","bottom","bottom-end"],themes:["none","v2","clean","big-arrow","dark"]}}},i=(n(184),n(3)),o=Object(i.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"settings"},[n("SettingRow",{attrs:{label:"Placement"}},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.placement,expression:"placement"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.placement=e.target.multiple?n:n[0]}}},t._l(t.placements,function(e){return n("option",{key:e,domProps:{value:e}},[t._v(t._s(e))])}),0)]),t._v(" "),n("SettingRow",{attrs:{label:"Overflow"}},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.overflowContainer,expression:"overflowContainer"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.overflowContainer=e.target.multiple?n:n[0]}}},t._l(t.overflowContainers,function(e){return n("option",{key:e,domProps:{value:e}},[t._v(t._s(e))])}),0)]),t._v(" "),n("SettingRow",{attrs:{label:"Theme"}},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.theme,expression:"theme"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.theme=e.target.multiple?n:n[0]}}},t._l(t.themes,function(e){return n("option",{key:e,domProps:{value:e}},[t._v(t._s(e))])}),0)]),t._v(" "),n("SettingRow",{attrs:{label:"Offset"}},[n("div",{staticStyle:{display:"flex"}},[n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.offset,expression:"offset",modifiers:{number:!0}}],attrs:{type:"range",min:"0",max:"100",value:"0"},domProps:{value:t.offset},on:{__r:function(e){t.offset=t._n(e.target.value)},blur:function(e){return t.$forceUpdate()}}}),t._v(" "),n("label",{},[t._v(t._s(t.offset)+"px")])])]),t._v(" "),n("SettingRow",{attrs:{label:"Trigger Width"}},[n("div",{staticStyle:{display:"flex"}},[n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.triggerWidth,expression:"triggerWidth",modifiers:{number:!0}}],attrs:{type:"range",min:"200",max:"400",value:"250"},domProps:{value:t.triggerWidth},on:{input:function(e){return t.$emit("update:triggerWidth",e.target.value)},__r:function(e){t.triggerWidth=t._n(e.target.value)},blur:function(e){return t.$forceUpdate()}}}),t._v(" "),n("label",[t._v(t._s(t.triggerWidth)+"px")])])]),t._v(" "),n("SettingRow",{attrs:{label:"Options"}},[n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.flips,expression:"flips"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.flips)?t._i(t.flips,null)>-1:t.flips},on:{change:function(e){var n=t.flips,r=e.target,i=!!r.checked;if(Array.isArray(n)){var o=t._i(n,null);r.checked?o<0&&(t.flips=n.concat([null])):o>-1&&(t.flips=n.slice(0,o).concat(n.slice(o+1)))}else t.flips=i}}}),t._v("Flip\n    ")]),t._v(" "),n("br"),t._v(" "),n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.withArrow,expression:"withArrow"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.withArrow)?t._i(t.withArrow,null)>-1:t.withArrow},on:{change:function(e){var n=t.withArrow,r=e.target,i=!!r.checked;if(Array.isArray(n)){var o=t._i(n,null);r.checked?o<0&&(t.withArrow=n.concat([null])):o>-1&&(t.withArrow=n.slice(0,o).concat(n.slice(o+1)))}else t.withArrow=i}}}),t._v("Arrow\n    ")]),t._v(" "),n("br"),t._v(" "),n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.adjustsBodyWidth,expression:"adjustsBodyWidth"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.adjustsBodyWidth)?t._i(t.adjustsBodyWidth,null)>-1:t.adjustsBodyWidth},on:{change:function(e){var n=t.adjustsBodyWidth,r=e.target,i=!!r.checked;if(Array.isArray(n)){var o=t._i(n,null);r.checked?o<0&&(t.adjustsBodyWidth=n.concat([null])):o>-1&&(t.adjustsBodyWidth=n.slice(0,o).concat(n.slice(o+1)))}else t.adjustsBodyWidth=i}}}),t._v("Adjust Body Width\n    ")]),t._v(" "),n("br"),t._v(" "),n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.useNativeButton,expression:"useNativeButton"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.useNativeButton)?t._i(t.useNativeButton,null)>-1:t.useNativeButton},on:{change:[function(e){var n=t.useNativeButton,r=e.target,i=!!r.checked;if(Array.isArray(n)){var o=t._i(n,null);r.checked?o<0&&(t.useNativeButton=n.concat([null])):o>-1&&(t.useNativeButton=n.slice(0,o).concat(n.slice(o+1)))}else t.useNativeButton=i},function(e){return t.$emit("update:useNativeButton",e.target.checked)}]}}),t._v("Native Button\n    ")])])],1)},[],!1,null,"340b6a46",null);e.default=o.exports},202:function(t,e,n){"use strict";var r=n(179);n.n(r).a},203:function(t,e,n){"use strict";var r=n(180);n.n(r).a},204:function(t,e,n){"use strict";var r=n(181);n.n(r).a},205:function(t,e,n){"use strict";var r=n(182);n.n(r).a},206:function(t,e,n){},214:function(t,e,n){"use strict";n.r(e);var r=n(187),i={name:"playground",components:{Trigger:n(186).default,Settings:r.default},data:function(){return{useNativeButton:!1,triggerWidth:250,kPopProps:{offset:0,overflowContainer:"scrollParent",placement:"bottom",flips:!0,withArrow:!0,theme:"clean"}}},computed:{triggerStyle:function(){return{width:"".concat(this.triggerWidth,"px")}}},methods:{scrollTriggerIntoView:function(){var t=this.$refs.scrollcontainer,e=this.$refs.contentview,n=.5*(e.clientHeight-t.clientHeight)+50,r=.5*(e.clientWidth-t.clientWidth);t.scrollTop=n,t.scrollLeft=r}},mounted:function(){setTimeout(this.scrollTriggerIntoView,500)}},o=(n(202),n(203),n(204),n(205),n(3)),a=Object(o.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Settings",{on:{changed:function(e){t.kPopProps=e},"update:useNativeButton":function(e){t.useNativeButton=e},"update:triggerWidth":function(e){t.triggerWidth=e}}}),t._v(" "),n("div",{ref:"scrollcontainer",staticClass:"outer"},[n("div",{ref:"contentview",staticClass:"inner"},[n("KPop",t._b({scopedSlots:t._u([{key:"trigger",fn:function(e){var r=e.toggle;return[n("Trigger",{style:t.triggerStyle,attrs:{native:t.useNativeButton},on:{click:r}},[t._v("Show Popover")])]}}])},"KPop",t.kPopProps,!1),[t._v(" "),n("div",{staticClass:"title"},[t._v("Sample Popover Title")]),t._v(" "),n("div",{staticClass:"body"},[n("p",[t._v("Not like the brazen giant of Greek fame,")]),t._v(" "),n("p",[t._v("With conquering limbs astride from land to land.")])])])],1)])],1)},[],!1,null,"b7866616",null);e.default=a.exports},235:function(t,e,n){"use strict";var r=n(206);n.n(r).a},242:function(t,e,n){"use strict";n.r(e);var r={components:{KPlayground:n(214).default}},i=(n(235),n(3)),o=Object(i.a)(r,function(){var t=this.$createElement;return(this._self._c||t)("k-playground")},[],!1,null,null,null);e.default=o.exports}}]);