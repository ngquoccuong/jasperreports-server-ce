define(["require","exports","module","jquery","underscore","common/util/eventAutomation","logger","stdnav"],function(t,e,n){"use strict";var i=t("jquery"),o=(t("underscore"),t("common/util/eventAutomation")),r=t("logger").register(n),s=t("stdnav"),u=0,c=function(){u++,this.serial=u};return i.extend(c.prototype,{zinit:function(t){return r.debug("stdnavPluginButton.init("+t+")\n"),this},activate:function(){this.behavior={enter:[this,this._onEnterOrEntered,null],entered:[this,this._onEnterOrEntered,null],exit:[this,this._onExit,null],toggle:[this,this._onEnterOrEntered,null],inherit:!1,inheritable:!0},s.registerNavtype(this.navtype,this.behavior,this.navtype_tags)},deactivate:function(){s.unregisterNavtype("button",this.behavior)},_fixSubfocus:function(t){var e,n=i(t);if(n.is("BUTTON,[role='button']"))e=n;else if(void 0===(e=i(t).closest("BUTTON,[role='button']")))return;return e.find(".ghostfocus").removeClass(".ghostfocus"),e.children().find(".subfocus").removeClass(".subfocus"),e},_onFocusIn:function(t){var e,n=i(t).children(".ghostfocus");if(n.length>0)n.removeClass("ghostfocus"),e=this._fixSubfocus(n[0]);else{var o=i(t).children('li[js-navigable!="false"]');e=o.length>0?this._fixSubfocus(o[0]):t}return e},_onSubfocusIn:function(t){if("BUTTON"!=i(t).prop("nodeName")){var e=this._fixSubfocus(t);s.setSubfocus(e,!1)}},_onEnterOrEntered:function(t){return i(t).is("BUTTON,[role='button']")&&o.simulateClickSequence(t),t},_onExit:function(){return i("#searchInput")[0]}}),i.extend(c.prototype,{navtype:"button",navtype_tags:["BUTTON"]}),new c});