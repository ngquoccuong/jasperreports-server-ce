define(["require","./TreePlugin"],function(e){"use strict";return e("./TreePlugin").extend({initialize:function(){this.$el.hide()},itemsRendered:function(e){this.$el.hasClass("node")&&(this.$("> .subcontainer > .j-view-port-chunk > ul > li").length?this.$el.show():this.$el.hide())}})});