(function(e){function t(t){for(var s,r,n=t[0],i=t[1],d=t[2],l=0,u=[];l<n.length;l++)r=n[l],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&u.push(o[r][0]),o[r]=0;for(s in i)Object.prototype.hasOwnProperty.call(i,s)&&(e[s]=i[s]);p&&p(t);while(u.length)u.shift()();return c.push.apply(c,d||[]),a()}function a(){for(var e,t=0;t<c.length;t++){for(var a=c[t],s=!0,r=1;r<a.length;r++){var n=a[r];0!==o[n]&&(s=!1)}s&&(c.splice(t--,1),e=i(i.s=a[0]))}return e}var s={},r={app:0},o={app:0},c=[];function n(e){return i.p+"js/"+({about:"about"}[e]||e)+"."+{about:"37d824b7"}[e]+".js"}function i(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.e=function(e){var t=[],a={about:1};r[e]?t.push(r[e]):0!==r[e]&&a[e]&&t.push(r[e]=new Promise((function(t,a){for(var s="css/"+({about:"about"}[e]||e)+"."+{about:"6958b7bd"}[e]+".css",o=i.p+s,c=document.getElementsByTagName("link"),n=0;n<c.length;n++){var d=c[n],l=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(l===s||l===o))return t()}var u=document.getElementsByTagName("style");for(n=0;n<u.length;n++){d=u[n],l=d.getAttribute("data-href");if(l===s||l===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var s=t&&t.target&&t.target.src||o,c=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=s,delete r[e],p.parentNode.removeChild(p),a(c)},p.href=o;var m=document.getElementsByTagName("head")[0];m.appendChild(p)})).then((function(){r[e]=0})));var s=o[e];if(0!==s)if(s)t.push(s[2]);else{var c=new Promise((function(t,a){s=o[e]=[t,a]}));t.push(s[2]=c);var d,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=n(e);var u=new Error;d=function(t){l.onerror=l.onload=null,clearTimeout(p);var a=o[e];if(0!==a){if(a){var s=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+s+": "+r+")",u.name="ChunkLoadError",u.type=s,u.request=r,a[1](u)}o[e]=void 0}};var p=setTimeout((function(){d({type:"timeout",target:l})}),12e4);l.onerror=l.onload=d,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=s,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(a,s,function(t){return e[t]}.bind(null,s));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/wc-predictor/",i.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],l=d.push.bind(d);d.push=t,d=d.slice();for(var u=0;u<d.length;u++)t(d[u]);var p=l;c.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("cd49")},"09cc":function(e,t,a){},4678:function(e,t,a){var s={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function r(e){var t=o(e);return a(t)}function o(e){if(!a.o(s,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return s[e]}r.keys=function(){return Object.keys(s)},r.resolve=o,e.exports=r,r.id="4678"},"6e00":function(e,t,a){"use strict";a("09cc")},b27a:function(e,t,a){},c09f:function(e,t,a){"use strict";function s(e){let t=0,a=e.predictedHomeScore-e.predictedAwayScore,s=e.homeScore-e.awayScore;return(a*s>0||0===a&&0===s)&&(t+=3),a===s&&(t+=1),e.homeScore===e.predictedHomeScore&&e.awayScore===e.predictedAwayScore&&(t+=1),t}a.d(t,"a",(function(){return s}))},cd49:function(e,t,a){"use strict";a.r(t);var s=a("2b0e"),r=a("0798"),o=a("8336"),c=a("8654"),n=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{attrs:{id:"app"}},[t(r["a"],{attrs:{prominent:"",value:e.isAlertVisible}},[t(c["a"],{attrs:{type:"text",placeholder:"username"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),t(c["a"],{attrs:{type:"password",placeholder:"password"}}),t(o["a"],{on:{click:e.getUser}},[e._v("Ok ")])],1),t("div",{attrs:{id:"nav"}},[t("router-link",{attrs:{to:"/"}},[e._v("Predict")]),e._v(" | "),t("router-link",{attrs:{to:"/about"}},[e._v("Rankings")]),e._v(" | "),t("router-link",{attrs:{to:"/history"}},[e._v("History")])],1),e.isAlertVisible?e._e():t("router-view")],1)},i=[],d=a("9ab4"),l=a("1b40");let u=class extends l["b"]{constructor(){super(...arguments),this.username="",this.isAlertVisible=!0}getUser(){let e=this.username;""===e?alert("input username and password"):["ilir","andi","vigan","ardian","myrteza","hana"].includes(e.toLowerCase())?(this.$store.commit("login",e.toLowerCase()),this.isAlertVisible=!1):alert("unknown user. Contact administrator")}};u=Object(d["a"])([Object(l["a"])({name:"App"})],u);var p=u,m=p,h=(a("6e00"),a("2877")),f=Object(h["a"])(m,n,i,!1,null,null,null),b=f.exports,j=a("8c4f"),y=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"home"},[t("Predictor")],1)},v=[],g=a("b0af"),w=a("99d9"),S=a("62ad"),x=a("a523"),_=a("8860"),k=a("da13"),T=a("5d23"),O=a("0fd9"),A=function(){var e=this,t=e._self._c;e._self._setupProxy;return t(x["a"],[t(o["a"],{attrs:{plain:""},on:{click:function(t){e.date.subtract(1,"days"),e.loadData()}}},[e._v(" yesterday ")]),e._v("   "),t("span",{staticClass:"pa-2"},[e._v(" "+e._s(e.date.format("DD-MM-YYYY")))]),e._v("   "),t(o["a"],{attrs:{plain:""},on:{click:function(t){e.date.add(1,"days"),e.loadData()}}},[e._v(" tomorrow ")]),t(_["a"],e._l(e.matches,(function(a){return t(k["a"],{key:`${a.homeTeam}${a.awayTeam}`},[t(T["a"],[a.started?t("span",{staticStyle:{color:"red","font-size":"12px"}},[e._v(" This match has already started ")]):e._e(),t(O["a"],{staticStyle:{"flex-wrap":"nowrap"}},[t(S["a"],{staticStyle:{padding:"12px 0px 0px 0px"},attrs:{sm:"5"}},[t(g["a"],{staticClass:"ht-card",attrs:{outlined:"",width:"110px"}},[t(x["a"],{staticClass:"padding: 12px 0px 0px 0px;",attrs:{"fill-height":""}},[t(w["a"],{staticClass:"team-text pa-0"},[e._v(" "+e._s(a.homeTeam)+" ")])],1)],1)],1),t(S["a"],{staticStyle:{display:"inline-flex","justify-content":"center",padding:"12px 0px 0px 0px"},attrs:{sm:"2",width:"40px"}},[t("span",[t(c["a"],{staticClass:"shrink",staticStyle:{width:"40px",padding:"0px"},attrs:{"hide-details":"",filled:"",dense:"","single-line":"",disabled:a.started,placeholder:a.started?a.homeTeamScore.toString():""},model:{value:a.predHomeTeamScore,callback:function(t){e.$set(a,"predHomeTeamScore",t)},expression:"match.predHomeTeamScore"}})],1),t("p",[e._v("   -   ")]),t("span",[t(c["a"],{staticClass:"shrink",staticStyle:{width:"40px",padding:"0px"},attrs:{"hide-details":"",filled:"",dense:"","single-line":"",disabled:a.started,placeholder:a.started?a.awayTeamScore.toString():""},model:{value:a.predAwayTeamScore,callback:function(t){e.$set(a,"predAwayTeamScore",t)},expression:"match.predAwayTeamScore"}})],1)]),t(S["a"],{staticStyle:{padding:"12px 0px 0px 0px"},attrs:{sm:"5"}},[t(g["a"],{staticClass:"at-card",attrs:{outlined:"",tile:"",width:"110px"}},[t(x["a"],{staticClass:"padding: 12px 0px 0px 0px;",attrs:{"fill-height":""}},[t(w["a"],{staticClass:"team-text pa-0"},[e._v(" "+e._s(a.awayTeam)+" ")])],1)],1)],1)],1)],1)],1)})),1),e.predictionSubmitted?t("div",{staticStyle:{color:"green"}},[e._v(" Predictions submitted successfully! You can see other people's prediction as soon as the game starts. ")]):e._e(),t(o["a"],{staticStyle:{"background-color":"#18a558",color:"white"},attrs:{plain:"",right:""},on:{click:e.savePrediction}},[e._v(" SAVE ")]),t("div",{staticStyle:{padding:"10px"}},["vigan"===e.username?t(o["a"],{staticStyle:{"background-color":"red",color:"white"},attrs:{plain:"",right:""},on:{click:e.updateMatches}},[e._v(" Admin update matches ")]):e._e()],1)],1)},z=[];a("14d9");class C{constructor(e,t,a,s,r,o,c){this.homeTeam=e,this.awayTeam=t,this.homeTeamScore=s,this.awayTeamScore=r,this.started=a,this.predHomeTeamScore=null,this.predAwayTeamScore=null}}var H=a("bc3a"),P=a("c1df"),E=a.n(P),D=a("2f62");s["a"].use(D["a"]);var N=new D["a"].Store({state:{username:null},mutations:{login(e,t){e.username=t}},actions:{},modules:{}});let M=class extends l["b"]{constructor(){super(...arguments),this.axios=H["a"].create({}),this.matches=[],this.date=E()(),this.username=N.state.username,this.predictionSubmitted=!1}mounted(){this.loadData()}loadData(){this.matches=[],this.axios.get("https://wcpredictor.fun/api/matches?date="+this.date.format("YYYYMMDD")).then(e=>{console.log(e);let t=e.data.leagues.filter(e=>"World Cup"===e.parentLeagueName||77===e.parentLeagueId);t.forEach(e=>{e.matches.forEach(e=>{this.matches.push(new C(e.home.name,e.away.name,e.status.started,e.home.score,e.away.score))})})}).catch(e=>{alert(JSON.stringify(e))})}savePrediction(){let e=[];this.matches.forEach(t=>{t.predHomeTeamScore&&t.predAwayTeamScore&&e.push({match:`${t.homeTeam}${t.awayTeam}`,user:this.$store.state.username,predictionHomeScore:Number(t.predHomeTeamScore),predictionAwayScore:Number(t.predAwayTeamScore)})}),this.axios.post("https://wcpredictor.fun/api/predict",e).then(e=>{this.predictionSubmitted=!0,this.matches=[]}).catch((function(e){console.log(e)}))}updateMatches(){let e=[];this.matches.forEach(t=>{t.started&&e.push({match:`${t.homeTeam}${t.awayTeam}`,homeTeam:t.homeTeam,awayTeam:t.awayTeam,homeScore:t.homeTeamScore,awayScore:t.awayTeamScore})}),this.axios.post("https://wcpredictor.fun/api/results",e).then(e=>{console.log(e),this.matches=[]}).catch((function(e){console.log(e)})),console.log(JSON.stringify(e))}};M=Object(d["a"])([l["a"]],M);var $=M,L=$,Y=(a("dab7"),Object(h["a"])(L,A,z,!1,null,"47d45747",null)),U=Y.exports;let V=class extends l["b"]{};V=Object(d["a"])([Object(l["a"])({components:{Predictor:U}})],V);var q=V,J=q,B=Object(h["a"])(J,y,v,!1,null,null,null),F=B.exports,I=a("cc20"),K=a("cd55"),R=a("49e2"),W=a("c865"),G=a("0393"),Q=function(){var e=this,t=e._self._c;e._self._setupProxy;return t(x["a"],[[t(G["a"],{key:e.panel},e._l(e.history,(function(a,s){return t(K["a"],{key:s},[t(W["a"],[e._v(" "+e._s(a.homeTeam)+" "+e._s(a.homeScore)+" - "+e._s(a.awayScore)+" "+e._s(a.awayTeam)+" ")]),e._l(a.predictions,(function(s,r){return t(R["a"],{key:r},[e._v(" "+e._s(r)+": "+e._s(s.predictedHomeScore)+" - "+e._s(s.predictedAwayScore)+" "),t(I["a"],{staticStyle:{float:"right"},attrs:{pill:""}},[e._v(e._s(e.getScore(s.predictedHomeScore,s.predictedAwayScore,a.homeScore,a.awayScore)))])],1)}))],2)})),1)]],2)},X=[],Z=a("c09f");let ee=class extends l["b"]{constructor(){super(...arguments),this.history={},this.predictions=[],this.panel=!1,this.axios=H["a"].create({})}mounted(){this.axios.get("https://wcpredictor.fun/api/predictionOutcomes").then(e=>{console.log(e),this.predictions=e.data,this.populateHistory(),this.panel=!0}).catch(e=>{console.error(e)})}populateHistory(){this.predictions.forEach(e=>{if(e.match in this.history){let t=e.predictedHomeScore,a=e.predictedAwayScore;this.history[e.match].predictions[e.username]={predictedHomeScore:t,predictedAwayScore:a}}else{this.history[e.match]={homeTeam:e.homeTeam,awayTeam:e.awayTeam,homeScore:e.homeScore,awayScore:e.awayScore,predictions:{}};let t=e.predictedHomeScore,a=e.predictedAwayScore;this.history[e.match].predictions={[e.username]:{predictedHomeScore:t,predictedAwayScore:a}}}})}getScore(e,t,a,s){return Object(Z["a"])({predictedHomeScore:e,predictedAwayScore:t,homeScore:a,awayScore:s})}};ee=Object(d["a"])([Object(l["a"])({})],ee);var te=ee,ae=te,se=Object(h["a"])(ae,Q,X,!1,null,null,null),re=se.exports;s["a"].use(j["a"]);const oe=[{path:"/",name:"Home",component:F},{path:"/about",name:"About",component:()=>a.e("about").then(a.bind(null,"f820"))},{path:"/history",name:"History",component:re}],ce=new j["a"]({mode:"history",base:"/wc-predictor/",routes:oe});var ne=ce,ie=a("f309");s["a"].use(ie["a"]);var de=new ie["a"]({});s["a"].config.productionTip=!1,new s["a"]({router:ne,store:N,vuetify:de,render:e=>e(b)}).$mount("#app")},dab7:function(e,t,a){"use strict";a("b27a")}});
//# sourceMappingURL=app.c6a8eb56.js.map