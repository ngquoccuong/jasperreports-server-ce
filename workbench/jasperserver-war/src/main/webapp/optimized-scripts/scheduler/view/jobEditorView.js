define(["require","exports","module","jquery","underscore","backbone","bundle!all","runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog","../saveDialog/SaveDialogView","./editor/scheduleTabView","./editor/parametersTabView","./editor/outputTabView","./editor/notificationsTabView","text!../template/jobEditorViewTemplate.htm","../../components/components.dialogs"],function(e,t,i){var a=e("jquery"),r=e("underscore"),s=e("backbone"),o=e("bundle!all"),n=e("runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog"),l=e("../saveDialog/SaveDialogView"),d=e("./editor/scheduleTabView"),h=e("./editor/parametersTabView"),c=e("./editor/outputTabView"),u=e("./editor/notificationsTabView"),m=e("text!../template/jobEditorViewTemplate.htm"),p=e("../../components/components.dialogs");i.exports=s.View.extend({editMode:!1,runNowMode:!1,events:{"mouseup [name=tabs] li":"tabChangeClickEvent","touchend [name=tabs] li":"tabChangeClickEvent","click [name=openSaveDialog]":"openSaveDialogClick","click [name=cancelJobCreation]":"cancelJobCreationClick"},initialize:function(e){this.options=r.extend({},e),this.tabs={},this.listenTo(this.model,"valid",this.validModelListener),this.listenTo(this.model,"invalid",this.invalidModelListener),this.listenTo(this.model,"clearAllErrors",this.clearAllValidationErrors),this.listenTo(this.model,"change:source",this.sourceKeyInModelChanged),this.listenTo(this.model,"failedToGet_IC",this.InputControlsNotLoaded),this._initializeTabs(e),this.listenTo(this.tabs.parametersTab,"IC_Displayed",this.InputControlsLoaded),this.listenTo(this.tabs.parametersTab,"failedToGet_IC",this.InputControlsNotLoaded)},_initializeTabs:function(e){var t={model:this.model,reportUri:e.reportUri,parentReportURI:e.parentReportURI};this.tabs.scheduleTab=new d(t),this.tabs.parametersTab=new h(t),this.tabs.outputTab=new c(t),this.tabs.notificationsTab=new u(t)},remove:function(){this.tabs.scheduleTab.remove(),this.tabs.parametersTab.remove(),this.tabs.outputTab.remove(),this.tabs.notificationsTab.remove(),s.View.prototype.remove.apply(this,arguments)},tabChangeClickEvent:function(e){var t=a(e.currentTarget),i=t.attr("data-tab");if(!t.hasClass("disabled")&&this.currentActiveTabName!==i){var r=this;this.model.validateAll(this.editMode).always(function(){r.$el.find("[name="+r.currentActiveTabName+"]").find(".error").length||(r.changeActiveTab(i),r.clearAllValidationErrors())})}},openSaveDialogClick:function(){this.startSavingProcess()},cancelJobCreationClick:function(){this.trigger("cancelJobCreation")},renderCreateNewJobInterface:function(){this.editMode=!1,this._render(),this.options.runInBackgroundMode||this.runNowMode?this.changeActiveTab("outputTab"):this.changeActiveTab("scheduleTab"),this.prepareSaveOrSubmitButton()},prepareModelForCreatingNewJob:function(){this.model.clear({silent:!0}),this.model.unset("id"),this.dontReactOnModelChange=!0,this.model.createFromUri(this.options.reportUri),this.dontReactOnModelChange=!1,this.runNowMode&&this.model.set("label","Immediate Execution"),this.model.loadParameters(this.options.parentReportURI||!1)},editExistingJob:function(e){this.editMode=!0;var t=this;this.model.clear({silent:!0}),this._render(),this.changeActiveTab("scheduleTab"),this.model.set({id:e}),this.prepareSaveOrSubmitButton(),this.model._fetched?(this.model.set(this.model.parse(this.model._fetched)),this.setTitle(this.model.get("label")),this.model._fetched=void 0):this.model.fetch({success:function(){t.setTitle(t.model.get("label"))}})},prepareSaveOrSubmitButton:function(){var e=this.$el.find("[name=openSaveDialog]"),t=this.$el.find(".footer #cancel");e.attr("disabled","disabled").addClass("disabled"),t.attr("disabled",null).removeClass("disabled"),this.saveButtonReady=new a.Deferred,this.saveButtonReady.done(function(){e.attr("disabled",null).removeClass("disabled")})},InputControlsLoaded:function(){this.saveButtonReady.resolve()},InputControlsNotLoaded:function(){this.saveButtonReady.resolve(),this.toggleEnableTab("parametersTab",!1)},setRunNowMode:function(e){this.runNowMode=!!e},_render:function(){var e={i18n:o,reportUri:this.options.reportUri,runNowMode:this.runNowMode};this.setElement(a(r.template(m,r.extend({},e)))),this.runNowMode&&this.$el.find("li[data-tab=scheduleTab]").addClass("disabled"),this.tabs.outputTab.options.editMode=this.editMode,this.tabs.scheduleTab.render(),this.tabs.parametersTab.render(),this.tabs.outputTab.render(),this.tabs.notificationsTab.render(),this.$el.find("[name=scheduleTab]").append(this.tabs.scheduleTab.$el),this.$el.find("[name=parametersTab]").append(this.tabs.parametersTab.$el),this.$el.find("[name=outputTab]").append(this.tabs.outputTab.$el),this.$el.find("[name=notificationsTab]").append(this.tabs.notificationsTab.$el),this.currentActiveTabName=""},setTitle:function(e){this.$el.find(".header .title").text(e)},changeActiveTab:function(e){e&&("error"===e&&(e=this.$el.find("[name=tabHolder] > div").find(".error").first().parents(".tab").attr("name")),this.currentActiveTabName!==e&&(this.$el.find("[name=tabs] li").removeClass("selected").filter("[data-tab="+e+"]").addClass("selected"),this.$el.find("[name=tabHolder] > div").addClass("hidden").filter("[name="+e+"]").removeClass("hidden"),this.currentActiveTabName=e))},toggleEnableTab:function(e,t){var i=this.$el.find("[name=tabs] li").filter("[data-tab="+e+"]");i.attr("disabled",!t).toggleClass("disabled",!t),!t&&i.hasClass("selected")&&this.changeActiveTab(i.nextAll(":not(.disabled):first").data("tab"))},sourceKeyInModelChanged:function(e,t){var i;if(!0!==this.dontReactOnModelChange){t.parameters&&(i=1===r.keys(t.parameters.parameterValues).length,i&=!!t.parameters.parameterValues.REPORT_TIME_ZONE);var a=t.parameters&&!i;a||this.saveButtonReady.resolve(),this.toggleEnableTab("parametersTab",a),this.$el.find(".schedule_for").find(".path").text(t.reportUnitURI)}},_prepareSaveDialog:function(){this.saveDialog&&this.saveDialog.remove();var e=this;this.saveDialog=new l(r.extend({},this.options,{model:this.model,isEditMode:this.editMode,onSaveDone:r.bind(this._onSaveDone,this),onSaveFail:r.bind(this._onSaveFail,this)})),this.listenTo(this.saveDialog,"saveValidationFailed",function(){e.saveDialog.closeDialog()})},startSavingProcess:function(){var e=this;this.model.validateAll(this.editMode).done(function(){e._prepareSaveDialog(),e.saveDialog.startSaveDialog()}).fail(function(){e.changeActiveTab("error")})},_onSaveDone:function(){this.trigger("jobHasBeenCreated")},_onSaveFail:function(e,t,i){this.saveDialog.closeDialog();var a=this,s=!1,l=!1,d=!1;try{s=JSON.parse(t.responseText)}catch(e){}if(s.error&&(s=s.error),r.isArray(s)||(s=[s]),r.each(s,function(e){var t="",i="";if("mandatory.parameter.error"===e.errorCode&&(t=o["report.scheduling.saveDialog.parameterIsMissing"],e.parameters&&e.parameters[0]&&(i=e.parameters[0].substr(e.parameters[0].indexOf(".")+1))),"error.duplicate.report.job.output.filename"===e.errorCode&&(i="baseOutputFilename",t=o["error.duplicate.report.job.output.filename"].replace("{0}",e.errorArguments[0]).replace("{1}",e.errorArguments[1])),e.message&&-1!==e.message.indexOf("will never fire")&&(i="triggerWillNeverFire",t=o["error.report.job.trigger.no.fire"]),"error.pattern"===e.errorCode&&("trigger.hours"===e.field&&(i="hours",t=o["error.pattern.trigger.hours"]),"trigger.minutes"===e.field&&(i="minutes",t=o["error.pattern.trigger.minutes"]),"trigger.monthDays"===e.field&&(i="datesInMonth",t=o["error.pattern.trigger.monthDays"]),"contentRepositoryDestination.timestampPattern"===e.field&&(i="timestampPattern",t=o["error.pattern.contentRepositoryDestination.timestampPattern"])),"resource.not.found"===e.errorCode){var r=new n({modal:!0,additionalCssClasses:"schedulerJobRemovedAlertDialog"});return r.setMessage(o["report.scheduling.editing.jobHasBeenRemoved"]),a.listenTo(r,"close",function(){a.trigger("errorEditingJob")}),r.open(),void(l=!0)}""!==t&&(a.showValidationMessage("error",{field:i,message:t}),d=!0)}),!0!==l&&(d&&this.changeActiveTab("error"),!1===d)){var h=o["report.scheduling.editing.failedToSave"]+".";s[0]&&s[0].errorCode?h+="<br/>The reason is: "+s[0].errorCode:s.message&&(h+="<br/>The reason is: "+s.message),h+="<br/><br/>The full response from the server is: "+t.responseText,p.errorPopup.show(h)}},clearAllValidationErrors:function(){this.$el.find(".error").removeClass("error")},validModelListener:function(e){var t=this;r.each(e,function(e){t.showValidationMessage("success",e)})},invalidModelListener:function(e,t){var i=this;r.each(e,function(e){i.showValidationMessage("error",e)}),t&&t.switchToErrors&&i.changeActiveTab("error")},showValidationMessage:function(e,t){if(t.field){"contentRepositoryDestination.folderURI"===t.field&&(t.field="contentRepositoryDestination.outputRepository"),t.field=t.field.replace("trigger.",""),t.field=t.field.replace("mailNotification.",""),t.field=t.field.replace("contentRepositoryDestination.","");var i=this.$el.find(".warning[data-field="+t.field+"]");i.parent().addClass("error"),i.removeClass("success").removeClass("error"),i.addClass(e);var a="";if(t.message)a=t.message;else if(t.errorCode){if(!(a=o[t.errorCode]))return;if(t.errorArguments)for(var r=0,s=t.errorArguments.length;r<s;r++)a=a.replace("{"+r+"}",t.errorArguments[r])}""!==a&&i.text(a)}}})});