define(["require","exports","module","jquery","underscore","logger"],function(t,o,n){"use strict";var e=t("jquery");t("underscore"),t("logger").register(n);return{beginModalFocus:function(t){if(t){!0===this.modalDialogActive&&this.endModalFocus(this.modalDialogRoot);var o=e(t),n=e("body *").filter(function(){return!(e.contains(t,this)||o.is(this))});this.modalDialogActive=!0,this.modalDialogRoot=t,n.each(function(t,o){var n=e(o),i=n.attr("tabIndex");void 0===i?(n.attr("js-nonmodal-tabindex","undefined"),n.attr("tabIndex","-1")):(n.attr("js-nonmodal-tabindex",i),n.attr("tabIndex","-1"))})}},endModalFocus:function(t){var o,n;t?(o=e(t),n=e("body *").filter(function(){return!(e.contains(o,this)||o.is(this))})):(o=e(),n=e("body *")),n.each(function(t,o){var n=e(o),i=n.attr("js-nonmodal-tabindex");void 0===i||("undefined"===i?(n.removeAttr("js-nonmodal-tabindex"),n.removeAttr("tabIndex")):(n.removeAttr("js-nonmodal-tabindex"),n.attr("tabIndex",i)))}),this.modalDialogActive=!1,this.modalDialogRoot=null}}});