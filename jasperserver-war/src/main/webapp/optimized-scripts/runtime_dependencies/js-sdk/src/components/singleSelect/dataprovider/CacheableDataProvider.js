define(["require","jquery","underscore"],function(t){"use strict";var e=t("jquery"),a=t("underscore"),n=function(t){a.bindAll(this,"getData","getAllCachedData"),this.data=t||[]};return a.extend(n.prototype,{setData:function(t){this.data=t||[]},getAllCachedData:function(){return this.data},getData:function(t){var a=new e.Deferred,n=t&&t.offset?t.offset:0,r=t&&t.limit?n+t.limit:this.data.length,i=this._getDataSegment(this.data,n,r);return a.resolve({data:i,total:this.data.length}),a.promise()},_getDataSegment:function(t,e,a){a=Math.min(a,t.length);for(var n=[],r=e;r<a;r++)n.push({label:t[r].label,value:t[r].value});return n}}),n});