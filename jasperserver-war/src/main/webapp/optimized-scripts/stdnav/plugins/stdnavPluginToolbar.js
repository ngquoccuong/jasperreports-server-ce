define(["require","exports","module","jquery","underscore","logger","stdnav","core.events.bis","core.layout","components.toolbarButtons","common/util/eventAutomation","actionModel.modelGenerator"],function(t,n,e){"use strict";var i=t("jquery"),s=t("underscore"),r=(t("logger").register(e),t("stdnav")),o=t("core.events.bis"),a=t("core.layout"),l=t("components.toolbarButtons"),u=t("common/util/eventAutomation"),_=t("actionModel.modelGenerator"),d=0;a.TOOLBAR_MENU_PATTERN="ul.j-toolbar",a.TOOLBAR_MENU_ITEM_PATTERN="ul.j-toolbar li",a.BUTTON_ZOOM_VALUE="button#zoom_value_button",a.BUTTON_SEARCH_REPORT="button#search_report_button",a.BUTTON_SEARCH_OPTIONS="button#search_options",a.BUTTON_FILE_OPTIONS="button#fileOptions",a.BUTTON_EXPORT="button#export",a.INPUT_ZOOM_VALUE="input#zoom_value",a.INPUT_SEARCH_REPORT="input#search_report",a.VIEWER_TOOLBAR="#viewerToolbar",a.MENU_VWROPTIONS="#vwroptions .menu.vertical.dropDown.fitable",a.MENU_VWROPTIONS_LIST="#vwroptions .menu.vertical.dropDown.fitable li";var h=function(){d++,this.serial=d};return s.extend(h.prototype,{zinit:function(t){return this},activate:function(){this.behavior={ariaprep:[this,this._ariaPrep,null],ariarefresh:[this,this._ariaRefresh,null],down:[this,this._onDown,null],enter:[this,this._onEnterOrEntered,null],exit:[this,this._onExit,null],fixfocus:[this,this._fixFocus,null],fixsubfocus:[this,this._fixFocus,null],fixsuperfocus:[this,this._fixSuperfocus,null],focusin:[this,this._onFocusIn,null],focusout:[this,this._onFocusOut,null],left:[this,this._onLeft,null],right:[this,this._onRight,null],subfocusin:[this,this._onSubfocusIn,null],superfocusin:[this,this._onSuperfocusIn,null],superfocusout:[this,this._onSuperfocusOut,null],up:[this,this._onUp,null],inherit:!1},r.registerNavtype(this.navtype,this.behavior,this.navtype_tags)},deactivate:function(){r.unregisterNavtype(this.navtype,this)},_ariaPrep:function(t){this._ariaRefresh(t)},_ariaRefresh:function(t){var n=i(t).find("li").not(".divider");return i(t).attr("role","application"),i.each(n,function(t,n){var e=i(n),s=e.find("[aria-label]");!e.attr("aria-label")&&s.length&&e.attr("aria-label",s.attr("aria-label"))}),null},_fixFocus:function(t){var n,e=i(t);if(e.is("div,ul,ol")){var s=e.find(".pressed");s.length>0?n=s[0]:(s=e.find("li").not(".divider"),n=s.length>0?s[0]:t)}else if(e.is("button"))n=t;else{var o=e.closest("li");o.length>0&&(n=!1===i(o[0]).prop["js-navigable"]?e.closest("ul,ol"):o[0])}return(i(n).is(":disabled")||i(n).find(".button,.mutton").is(":disabled"))&&(n=r.closestNavigableAncestor(n)),n},_fixSuperfocus:function(t){var n=i(t).closest("ul");return n.length>0?n[0]:null},_onSuperfocusIn:function(t){var n=i(t),e=i(this.parent).closest(a.TOOLBAR_MENU_PATTERN),s=n.closest(".menu").length&&n;return s&&e.attr("tabindex")>-1&&(this._parentTabindex=e.attr("tabindex"),this._parentTabindex>-1?(s.attr("js-suspended-tabindex",this._parentTabindex),s.find("li:first").attr("tabindex",this._parentTabindex)):(n.attr("js-suspended-tabindex","none"),s.find("li:first").attr("tabindex",-1)),s.attr("tabindex","-1"),e.attr("tabindex","-1")),t},_onSubfocusIn:function(t){var n=i(t).closest(a.TOOLBAR_MENU_PATTERN);n.attr("js-suspended-tabindex")>-1?i(t).attr("tabindex",n.attr("js-suspended-tabindex")):n.attr("tabindex")>-1&&(i(t).attr("tabindex",n.attr("tabindex")),n.attr("js-suspended-tabindex",n.attr("tabindex")))},_onFocusIn:function(t){var n,e,s=i(t);return s.length>0&&(n=s.closest(a.TOOLBAR_MENU_ITEM_PATTERN),n.length>0?(o.over(n.find(".button")[0]),e=n.find(".mutton"),e.length>0&&!o.isDisabled(e.context)?l.showButtonMenu(null,e[0]):(_.hideMenu(),i(a.MENU_VWROPTIONS).hide())):(n=s.is(".menu li")?s:s.closest(".menu"),n.length>0&&o.over(n.find("p")[0]),(s.is(a.BUTTON_ZOOM_VALUE)||s.is(a.BUTTON_SEARCH_REPORT)||s.is(a.BUTTON_SEARCH_OPTIONS))&&s.click())),t},_onFocusOut:function(t){var n=i(t).closest(a.TOOLBAR_MENU_ITEM_PATTERN);return n.length>0?this.lastMenuBarItem!==t&&(o.out(n.find(a.BUTTON_PATTERN)[0]),n.removeAttr("tabindex")):(n=i(t).closest(a.MENU_LIST_PATTERN),n.length>0&&(o.out(n.find(a.BUTTON_PATTERN)[0]),n.removeAttr("tabindex"))),null},_onSuperfocusOut:function(t){var n=i(a.VIEWER_TOOLBAR);if(n.length<1)return t;if(i(document.activeElement).closest(".dropDown").length<1){var e=n.find("."+a.HOVERED_CLASS);e.length>0&&o.out(e[0]),_.hideMenu(),i(a.MENU_VWROPTIONS).hide(),i(this.parent).closest(a.TOOLBAR_MENU_PATTERN).attr("tabindex",this._parentTabindex),this.parent=null,this.lastMenuBarItem=null,i(".isParent").removeClass("isParent")}},_onLeft:function(t){var n=i(t).closest(a.TOOLBAR_MENU_ITEM_PATTERN),e=i(t);if(!n.length&&i(t).closest(".menu").length&&(n=i(this._onExitHandler(t))),n.length>0){n.prevAll(a.TOOLBAR_MENU_ITEM_PATTERN).each(function(t,n){var s=i(n);if(!s.hasClass("divider")&&0===s.find("button:disabled").length&&0===s.find("button:hidden").length)return e=s,!1})}return e[0]},_onRight:function(t){var n=i(t).closest(a.TOOLBAR_MENU_ITEM_PATTERN),e=i(t);if(!n.length&&i(t).closest(".menu").length&&(n=i(this._onExitHandler(t))),n.length>0){n.nextAll(a.TOOLBAR_MENU_ITEM_PATTERN).each(function(t,n){var s=i(n);if(!s.hasClass("divider")&&0===s.find("button:disabled").length&&0===s.find("button:hidden").length)return e=s,!1})}return e[0]},_onUp:function(t){var n=i(t);return i(t).closest(".menu").length&&(n.prev().length?(n.find("p").removeClass(a.HOVERED_CLASS),n=n.prev().hasClass("separator")?n.prev().prev():n.prev(),n.find("p").addClass(a.HOVERED_CLASS)):n.length=0),n.length>0?n[0]:this._onExitHandler(t)},_onDown:function(t){var n,e,s=i(t),r=s.find("input");if(r.is(a.INPUT_ZOOM_VALUE)?e=i(a.BUTTON_ZOOM_VALUE):r.is(a.INPUT_SEARCH_REPORT)&&(e=i(a.BUTTON_SEARCH_OPTIONS)),e&&e.length)return this._setParentElem(t),u.simulateClickSequence(e[0]),i(a.MENU_VWROPTIONS_LIST).first().find("p").addClass(a.HOVERED_CLASS),i(a.MENU_VWROPTIONS_LIST).first()[0];if(s.parent().is("ul.buttonSet")){if(0===s.find(a.BUTTON_FILE_OPTIONS+","+a.BUTTON_EXPORT).length)return t;i("#"+a.MENU_ID).removeClass("hidden"),n=i("#"+a.MENU_ID+" ul")}else n=s.closest("ul").not(".j-toolbar");return i(t).closest(".menu").length?s.next().length&&(s.find("p").removeClass(a.HOVERED_CLASS),s=s.next().hasClass("separator")?s.next().next():s.next(),s.find("p").addClass(a.HOVERED_CLASS)):i(t).closest(".buttonSet").length&&(s=n.find("li").first(),this._setParentElem(t)),s[0]},_onExit:function(t){return t=i(t).find("p").length>0?this._onExitHandler(t):i("#"+a.MAIN_SEARCH_INPUT_ID)[0]},_onEnterOrEntered:function(t){var n,e=i(t);return e.hasClass("j-dropdown")&&(this._setParentElem(t),(t=e.find("input")[0])&&i(t).select()),e.find("p").length>0?n=e.find("p")[0]:0===e.find("input").length&&(n=e.find(".button")[0]),n&&0===i(this.parent).find(a.BUTTON_FILE_OPTIONS).length&&0===i(this.parent).find(a.BUTTON_EXPORT).length&&u.simulateClickSequence(n),i(t).find("p").length>0&&(t=this._onExitHandler(t)),t},_setParentElem:function(t){this.parent=t,i(t).addClass("isParent"),this.lastMenuBarItem=t},_onExitHandler:function(t){return t=this.parent,t||(t=i(".isParent")[0]),i(t).removeClass("isParent"),t}}),i.extend(h.prototype,{navtype:"toolbar",navtype_tags:[]}),new h});