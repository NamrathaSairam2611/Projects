!/**
 * Highcharts JS v11.4.1 (2024-04-04)
 *
 * (c) 2010-2024 Highsoft AS
 * Author: Sebastian Domas
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/modules/histogram-bellcurve",["highcharts"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function r(e,t,r,i){e.hasOwnProperty(t)||(e[t]=i.apply(null,r),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:e[t]}})))}r(t,"Series/DerivedComposition.js",[t["Core/Globals.js"],t["Core/Series/Series.js"],t["Core/Utilities.js"]],function(e,t,r){var i,n=e.noop,s=r.addEvent,o=r.defined;return function(e){function r(){t.prototype.init.apply(this,arguments),this.initialised=!1,this.baseSeries=null,this.eventRemovers=[],this.addEvents()}function i(){var e=this.chart,t=this.options.baseSeries,r=o(t)&&(e.series[t]||e.get(t));this.baseSeries=r||null}function a(){var e=this;this.eventRemovers.push(s(this.chart,"afterLinkSeries",function(){e.setBaseSeries(),e.baseSeries&&!e.initialised&&(e.setDerivedData(),e.addBaseSeriesEvents(),e.initialised=!0)}))}function u(){var e=this;this.eventRemovers.push(s(this.baseSeries,"updatedData",function(){e.setDerivedData()}),s(this.baseSeries,"destroy",function(){e.baseSeries=null,e.initialised=!1}))}function p(){this.eventRemovers.forEach(function(e){e()}),t.prototype.destroy.apply(this,arguments)}e.hasDerivedData=!0,e.setDerivedData=n,e.compose=function(e){var t=e.prototype;return t.addBaseSeriesEvents=u,t.addEvents=a,t.destroy=p,t.init=r,t.setBaseSeries=i,e},e.init=r,e.setBaseSeries=i,e.addEvents=a,e.addBaseSeriesEvents=u,e.destroy=p}(i||(i={})),i}),r(t,"Series/Histogram/HistogramSeriesDefaults.js",[],function(){return{binsNumber:"square-root",binWidth:void 0,pointPadding:0,groupPadding:0,grouping:!1,pointPlacement:"between",tooltip:{headerFormat:"",pointFormat:'<span style="font-size: 0.8em">{point.x} - {point.x2}</span><br/><span style="color:{point.color}">●</span> {series.name} <b>{point.y}</b><br/>'}}}),r(t,"Series/Histogram/HistogramSeries.js",[t["Series/DerivedComposition.js"],t["Series/Histogram/HistogramSeriesDefaults.js"],t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(e,t,r,i){var n,s=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),o=r.seriesTypes.column,a=i.arrayMax,u=i.arrayMin,p=i.correctFloat,l=i.extend,c=i.isNumber,h=i.merge,d={"square-root":function(e){return Math.ceil(Math.sqrt(e.options.data.length))},sturges:function(e){return Math.ceil(Math.log(e.options.data.length)*Math.LOG2E)},rice:function(e){return Math.ceil(2*Math.pow(e.options.data.length,1/3))}},f=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return s(r,e),r.prototype.binsNumber=function(){var e=this.options.binsNumber,t=d[e]||"function"==typeof e&&e;return Math.ceil(t&&t(this.baseSeries)||(c(e)?e:d["square-root"](this.baseSeries)))},r.prototype.derivedData=function(e,t,r){var i,n,s=p(a(e)),o=p(u(e)),l=[],h={},d=[];for(r=this.binWidth=p(c(r)?r||1:(s-o)/t),this.options.pointRange=Math.max(r,0),n=o;n<s&&(this.userOptions.binWidth||p(s-n)>=r||0>=p(p(o+l.length*r)-n));n=p(n+r))l.push(n),h[n]=0;0!==h[o]&&(l.push(o),h[o]=0);for(var f=(i=l.map(function(e){return parseFloat(e)}),function(e){for(var t=1;i[t]<=e;)t++;return i[--t]}),v=0;v<e.length;v++){var y=e[v];h[p(f(y))]++}for(var m=0,b=Object.keys(h);m<b.length;m++){var S=b[m];d.push({x:Number(S),y:h[S],x2:p(Number(S)+r)})}return d.sort(function(e,t){return e.x-t.x}),d[d.length-1].x2=s,d},r.prototype.setDerivedData=function(){var e=this.baseSeries.yData;if(!e.length){this.setData([]);return}var t=this.derivedData(e,this.binsNumber(),this.options.binWidth);this.setData(t,!1)},r.defaultOptions=h(o.defaultOptions,t),r}(o);return l(f.prototype,{hasDerivedData:e.hasDerivedData}),e.compose(f),r.registerSeriesType("histogram",f),f}),r(t,"Series/Bellcurve/BellcurveSeriesDefaults.js",[],function(){return{intervals:3,pointsInInterval:3,marker:{enabled:!1}}}),r(t,"Series/Bellcurve/BellcurveSeries.js",[t["Series/Bellcurve/BellcurveSeriesDefaults.js"],t["Series/DerivedComposition.js"],t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(e,t,r,i){var n,s=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),o=r.seriesTypes.areaspline,a=i.correctFloat,u=i.isNumber,p=i.merge,l=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return s(r,t),r.mean=function(e){var t=e.length,r=e.reduce(function(e,t){return e+t},0);return t>0&&r/t},r.standardDeviation=function(e,t){var i=e.length;t=u(t)?t:r.mean(e);var n=e.reduce(function(e,r){var i=r-t;return e+i*i},0);return i>1&&Math.sqrt(n/(i-1))},r.normalDensity=function(e,t,r){var i=e-t;return Math.exp(-(i*i)/(2*r*r))/(r*Math.sqrt(2*Math.PI))},r.prototype.derivedData=function(e,t){for(var i=this.options,n=i.intervals,s=i.pointsInInterval,o=n*s*2+1,a=t/s,u=[],p=e-n*t,l=0;l<o;l++)u.push([p,r.normalDensity(p,e,t)]),p+=a;return u},r.prototype.setDerivedData=function(){var e,t;(null===(t=null===(e=this.baseSeries)||void 0===e?void 0:e.yData)||void 0===t?void 0:t.length)&&(this.setMean(),this.setStandardDeviation(),this.setData(this.derivedData(this.mean||0,this.standardDeviation||0),!1,void 0,!1))},r.prototype.setMean=function(){this.mean=a(r.mean(this.baseSeries.yData))},r.prototype.setStandardDeviation=function(){this.standardDeviation=a(r.standardDeviation(this.baseSeries.yData,this.mean))},r.defaultOptions=p(o.defaultOptions,e),r}(o);return t.compose(l),r.registerSeriesType("bellcurve",l),l}),r(t,"masters/modules/histogram-bellcurve.src.js",[t["Core/Globals.js"]],function(e){return e})});