define(["require","jquery","backbone","underscore","components/singleSelect/manager/KeyboardManager","components/singleSelect/view/SingleSelectList","components/singleSelect/model/SingleSelectListModel","components/singleSelect/dataprovider/SearcheableDataProvider","components/singleSelect/manager/DropDownManager","text!components/singleSelect/templates/singleSelectTemplate.htm","text!components/singleSelect/templates/singleSelectTemplate_IE10_11.htm","text!components/singleSelect/templates/listTemplate.htm","text!components/singleSelect/templates/itemsTemplate.htm","text!components/singleSelect/templates/dropDownTemplate.htm","bundle!js-sdk/ScalableInputControlsBundle","common/util/browserDetection","common/util/xssUtil"],function(e){"use strict";var t=e("jquery"),i=e("backbone"),s=e("underscore"),n=e("components/singleSelect/manager/KeyboardManager"),o=e("components/singleSelect/view/SingleSelectList"),l=e("components/singleSelect/model/SingleSelectListModel"),a=e("components/singleSelect/dataprovider/SearcheableDataProvider"),r=e("components/singleSelect/manager/DropDownManager"),d=e("text!components/singleSelect/templates/singleSelectTemplate.htm"),h=e("text!components/singleSelect/templates/singleSelectTemplate_IE10_11.htm"),c=e("text!components/singleSelect/templates/listTemplate.htm"),u=e("text!components/singleSelect/templates/itemsTemplate.htm"),p=e("text!components/singleSelect/templates/dropDownTemplate.htm"),m=e("bundle!js-sdk/ScalableInputControlsBundle"),g=e("common/util/browserDetection"),f=e("common/util/xssUtil"),w=t("body");return i.View.extend({events:function(){return{keydown:this.keyboardManager.onKeydown,input:this.keyboardManager.onKeydown,"focus input":"onFocus","blur input":"onBlur",mousedown:"onMousedown",mouseup:"onMouseup","click .jr-mSingleselect-input":"onClickOnInput"}},initialize:function(e){s.bindAll(this,"onGlobalMouseup","onGlobalMousedown","onGlobalMousemove","onMousedown","calcOffsetForListView","collapse"),this.model||(this.model=new i.Model),this.model.set("expanded",!1,{silent:!0}),this.model.set("criteria","",{silent:!0}),this.model.set("value",{},{silent:!0}),(g.isIE10()||g.isIE11())&&(d=h),this.dropUpDirection=!1,this.label=e.label,this.template=s.template(e.template||d),this.dropDownTemplate=s.template(e.dropDownTemplate||p),this.keyboardManager=new n({keydownTimeout:e.keydownTimeout,context:this,deferredKeydownHandler:this.processKeydown,immediateHandleCondition:this.immediateHandleCondition,immediateKeydownHandler:this.immediateKeydownHandler,stopPropagation:!0}),this.listViewModel=this._createListViewModel(e),this.listView=this._createListView(e),this.render(),this.dropDownManager=new r({dropDownEl:this.$dropDownElContainer,calcOffset:this.calcOffsetForListView,isOffsetChanged:this.isDimensionsChangedforListView,onOffsetChanged:this.collapse}),this.initListeners(),this.setValue(e.value,{modelOptions:{silent:!0}})},_createListView:function(e){return new o({el:e.listElement||t(c),model:this.listViewModel,chunksTemplate:e.chunksTemplate,itemsTemplate:e.itemsTemplate||u,scrollTimeout:e.scrollTimeout})},_createListViewModel:function(e){return this.searcheableDataProvider=new a({getData:e.getData}),new l({getData:this._getGetData(),bufferSize:e.bufferSize,loadFactor:e.loadFactor})},_getGetData:function(){return this.searcheableDataProvider.getData},_getActiveValueIndex:function(e){var t=this.searcheableDataProvider.getIndexMapping();return t?t[e.index]:e.index},initListeners:function(){this.listenTo(this.listView,"selection:change",this.selectionChange,this),this.listenTo(this.listView,"item:mouseup",this.itemMouseup,this),this.listenTo(this.listView,"listRenderError",this.listRenderError,this),this.listenTo(this.model,"change:expanded",this.changeExpandedState,this),this.listenTo(this.model,"change:value",this.changeValue,this),this.listenTo(this.model,"change:disabled",this.changeDisabled,this),this.listenTo(this.model,"change:criteria",this.changeFilter,this),this.$dropDownEl.on("mousedown",this.onMousedown),w.on("mousedown",this.onGlobalMousedown).on("dataavailable",this.onGlobalMousedown).on("mouseup",this.onGlobalMouseup).on("mousemove",this.onGlobalMousemove)},render:function(){var e=t(this.template({label:this.label,isIPad:g.isIPad(),value:this.model.get("value").label,expanded:this.model.get("expanded"),i18n:m}));return this.renderListView(),this.$el.empty(),this.$el.append(e),this.$singleSelect=e,this.$searchBlock=this.$el.find(".jr-mSingleselect-search"),this.$inputBlock=this.$el.find(".jr-mSingleselect-input"),this.$input=this.$searchBlock.find("input"),this},renderListView:function(){this.listRendered||(this.$dropDownElContainer=t(this.dropDownTemplate({isIPad:"iPad"===navigator.platform})),this.$dropDownEl=this.$dropDownElContainer.find(".jr-mSingleselect-dropdown"),this.listView.undelegateEvents(),this.$dropDownEl.append(this.listView.$el),w.append(this.$dropDownElContainer),this.listView.delegateEvents(),this.listRendered=!0),this.$scalablelist=this.$dropDownElContainer.find(".jr-mScalablelist"),this.model.get("expanded")?this.$dropDownElContainer.show():this.$dropDownElContainer.hide()},renderData:function(){return this.listView.renderData(),this},listRenderError:function(e,t){this.trigger("listRenderError",e,t)},itemMouseup:function(){if(!this.model.get("disabled")){delete this.preventBlur,this.$input.focus();var e=this.model.get("activeValue");e.value!==this.model.get("value").value?(this.model.unset("activeValue"),this.model.set("value",e)):this.collapse()}},selectionChange:function(){var e=this.listView.getActiveValue();e?(this.listView.scrollTo(e.index),this.model.set("activeValue",{value:e.value,label:e.label,index:this._getActiveValueIndex(e)}),this.updateValueFromActive()):this.model.unset("activeValue")},onClickOnInput:function(){this.model.get("expanded")?this.collapse():this.expand()},onFocus:function(){this.model.get("expanded")||this.$inputBlock.addClass("jr-isFocused")},onBlur:function(){this.preventBlur||(this.collapse(),this.$inputBlock.removeClass("jr-isFocused"))},onMousedown:function(){this.preventBlur=!0},onMouseup:function(){this.preventBlur&&(delete this.preventBlur,this.model.get("expanded")&&this.$input.focus())},changeExpandedState:function(e){e.get("expanded")?this.doExpand():this.doCollapse()},changeValue:function(){this.collapse(),this.updateControlLabel(),this.silent?delete this.silent:this.trigger("selection:change",this.model.get("value").value),this.$input.val(""),this.model.set("criteria","")},changeDisabled:function(){var e=this.model.get("disabled");e?(this.$input.attr("disabled","disabled"),this.collapse()):this.$input.removeAttr("disabled"),this.listView.setDisabled(e)},onGlobalMousedown:function(e){if(this.model.get("expanded")){if(e.target===this.el||this.$el.find(e.target).length>0||e.target===this.$dropDownEl[0]||this.$dropDownEl.find(e.target).length>0)return void this.$input.focus();this.preventBlur=!1}this.onBlur()},onGlobalMouseup:function(){this.onMouseup()},onGlobalMousemove:function(e){this.preventBlur&&e.stopPropagation()},onUpKey:function(){if(this.model.get("expanded")){var e=this.listView.getActiveValue();if(!e||0===e.index)return void this.collapse();this.listView.activatePrevious()}else this.expand()},onDownKey:function(){if(this.model.get("expanded")){this.listView.getActiveValue()?this.listView.activateNext():this.listView.activateFirst()}else this.expand()},onEnterKey:function(e){e.preventDefault(),this.model.get("expanded")?this.model.get("activeValue")?this.itemMouseup():this.collapse():this.expand()},onEscKey:function(){this.model.get("expanded")&&this.collapse()},onHomeKey:function(){this.model.get("expanded")?this.listView.activateFirst():this.expand()},onEndKey:function(){this.model.get("expanded")?this.listView.activateLast():this.expand()},onPageUpKey:function(){this.model.get("expanded")?this.listView.pageUp():this.expand()},onPageDownKey:function(){this.model.get("expanded")?this.listView.pageDown():this.expand()},onTabKey:function(){},updateDropDirection:function(){var e=t("html").scrollTop(),i=this.$el.offset(),s=this.$el.height(),n=this.$searchBlock.outerHeight(),o=i.top-e,l=t(window).height()-o-s;this.dropUpDirection=o>l;var a=this.dropUpDirection?o:l;a-=n+s,this.$scalablelist.css("max-height",a+"px")},doExpand:function(){this.updateDropDirection(),this.dropUpDirection&&(this.$dropDownEl.addClass("jr-mSingleselect-dropdownTop"),this.$singleSelect.addClass("jr-mSingleselectTop")),this.$searchBlock.addClass("jr-isOpen"),this.$inputBlock.addClass("jr-isOpen"),this.$inputBlock.removeClass("jr-isFocused"),this.$input.focus(),this.expandListView(),this.listView.lazy?this.listView.fetch(s.bind(this.listView.resize,this.listView)):this.listView.resize(),void 0!==this.model.get("value").value&&this.setValueToList(),this.trigger("expand",this)},expandListView:function(){this.$dropDownElContainer.show(),this.dropDownManager.startCalc()},doCollapse:function(){this.model.unset("activeValue"),this.$searchBlock.removeClass("jr-isOpen"),this.$inputBlock.removeClass("jr-isOpen"),this.$dropDownEl.removeClass("jr-mSingleselect-dropdownTop"),this.$singleSelect.removeClass("jr-mSingleselectTop"),this.$inputBlock.addClass("jr-isFocused"),this.$input.val(""),this.$dropDownElContainer.hide(),this.model.set("criteria",""),this.dropDownManager.stopCalc(),this.trigger("collapse",this)},calcOffsetForListView:function(){var e,t=this.$el.offset(),i=w.offset().left+t.left,s=this.$el.height();return e=this.dropUpDirection?w.offset().top+t.top-this.$searchBlock.outerHeight():w.offset().top+t.top+s+this.$searchBlock.height(),{top:e,left:i,width:this.el.getBoundingClientRect().width}},isDimensionsChangedforListView:function(e,t){return Math.floor(e.top)!==Math.floor(t.top)||Math.floor(e.left)!==Math.floor(t.left)},immediateHandleCondition:function(e){return!this.model.get("expanded")},immediateKeydownHandler:function(e){this.expand(),this.keyboardManager.deferredHandleKeyboardEvent(e)},processKeydown:function(){this.model.set("criteria",this.$input.val())},changeFilter:function(){var e=this;this._getGetData()({criteria:this.model.get("criteria")}).done(function(){e.listView.fetch(function(){e.setValueToList()})})},setValueToList:function(e){var t=this.model.get("value"),i=t.value;if(void 0!==t.index){var s=this.searcheableDataProvider.getReverseIndexMapping(),n=s?s[t.index]:t.index;i={},void 0!==n&&(i[n]=t.value)}this.listView.setValue(i,e)},convertExternalValueToInternalFormat:function(e){var t={};if(void 0!==e)if("string"==typeof e||null===e)t={value:e};else for(var i in e)if(e.hasOwnProperty(i)&&void 0!==e[i]){t={value:e[i],index:parseInt(i,10)};break}return t},updateValueFromActive:function(){var e=this.model.get("value"),t=this.model.get("activeValue");e.value===t.value&&void 0===e.label&&(e.label=t.label,this.updateControlLabel())},updateControlLabel:function(){var e,t=this.model.get("value"),i=this.$inputBlock.find(".jr-mSingleselect-input-placeholder"),n=this.$inputBlock.find(".jr-mSingleselect-input-selection");s.isEmpty(t)||null==t.value?(i.removeClass("jr-isHidden"),this.render()):(e=this.getControlLabelByValue(t),i.addClass("jr-isHidden"),this.$inputBlock.attr("title",e),n.html(f.hardEscape(e)))},getControlLabelByValue:function(e){return null==e.label?e.value:e.label},fetch:function(e,t){return this.listView.fetch(e,t),this},reset:function(e){return this.listView.reset(e),this},expand:function(){if(!this.model.get("disabled"))return this.model.set("expanded",!0),this},collapse:function(){return this.model.set("expanded",!1),this},getValue:function(){return this.model.get("value").value},setValue:function(e,t){var e=this.convertExternalValueToInternalFormat(e);t&&t.silent&&(this.silent=!0),this.model.set("value",e),this.setValueToList()},setDisabled:function(e){return this.model.set("disabled",e),this},getDisabled:function(){return this.model.get("disabled")},remove:function(){this.$dropDownEl.off("mousedown",this.onMousedown).remove(),this.listView.remove(),this.$dropDownElContainer.remove(),i.View.prototype.remove.call(this),w.off("mousedown",this.onGlobalMousedown).off("dataavailable",this.onGlobalMousedown).off("mouseup",this.onGlobalMouseup).off("mousemove",this.onGlobalMousemove)}})});