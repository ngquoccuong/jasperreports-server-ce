define(["require","components/scalableList/view/ListWithNavigation"],function(t){"use strict";var e=t("components/scalableList/view/ListWithNavigation");return{postProcessChunkModelItem:function(t,i){e.prototype.postProcessChunkModelItem.call(this,t,i),this.getTrueAll()&&(t.selected=!0)},setTrueAll:function(t,e){this.isTrueAll=t,this.setValue({},e)},getTrueAll:function(){return this.isTrueAll}}});