define(["require","common/util/classUtil"],function(r){"use strict";var t=r("common/util/classUtil"),e=t.inherit(Error,{constructor:function(r,t,e){this.errorCode=r,this.message=t,this.parameters=e}});return e.prototype.toString=function(){return this.errorCode+" : "+this.message},e});