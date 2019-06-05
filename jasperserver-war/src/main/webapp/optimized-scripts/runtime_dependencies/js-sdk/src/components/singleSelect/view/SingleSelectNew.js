define(["require","underscore","components/scalableList/model/listWithNavigationModelTrait","components/singleSelect/view/SingleSelect","components/singleSelect/model/SingleSelectListModelNew"],function(e){"use strict";function t(e,t){if(t&&"string"==typeof t&&!this.getActive()){var i=e(t);void 0!==i&&l.setActive.call(this,{index:i,item:{value:t},silent:!0})}}var i=e("underscore"),l=e("components/scalableList/model/listWithNavigationModelTrait"),n=e("components/singleSelect/view/SingleSelect"),s=e("components/singleSelect/model/SingleSelectListModelNew");return n.extend({initialize:function(e){i.bindAll(this,"_getSelectionIndex"),this.formatValue=e.formatValue,n.prototype.initialize.call(this,e)},_createListViewModel:function(e){return this.getData=e.getData,e.model||i.extend(new s(e),{_afterSelect:i.partial(t,this._getSelectionIndex)})},_getSelectionIndex:function(e){for(var t=this.listViewModel.get("bufferStartIndex"),i=this.listViewModel.get("items"),l=0;l<i.length;l++)if(e===i[l].value)return t+l},_getGetData:function(){return this.getData},_getActiveValueIndex:function(e){return this._getSelectionIndex(e.value)},changeFilter:function(){var e=this;this.listView.scrollTo(0),this._getGetData()({criteria:this.model.get("criteria"),offset:0,limit:1}).done(function(){e.listView.fetch(function(){e.listView.resize(),e.setValueToList()})})},getControlLabelByValue:function(e){return null==e.label?this.formatValue?this.formatValue(e.value):e.value:e.label},setValue:function(e,t){e=this.convertExternalValueToInternalFormat(e),t&&t.silent&&(this.silent=!0),this.model.set("value",e),this.setValueToList(t)},setValueToList:function(e){var t=this.model.get("value"),i={};t&&t.index?i[t.index]=t.value:t&&(i=t.value),this.listView.setValue(i,e)}})});