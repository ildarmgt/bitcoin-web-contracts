(function(e){function t(t){for(var a,r,c=t[0],o=t[1],l=t[2],d=0,p=[];d<c.length;d++)r=c[d],i[r]&&p.push(i[r][0]),i[r]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);u&&u(t);while(p.length)p.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],a=!0,c=1;c<n.length;c++){var o=n[c];0!==i[o]&&(a=!1)}a&&(s.splice(t--,1),e=r(r.s=n[0]))}return e}var a={},i={app:0},s=[];function r(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=a,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var u=o;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("64a9"),i=n.n(a);i.a},"069b":function(e,t,n){"use strict";var a=n("d8a7"),i=n.n(a);i.a},1:function(e,t){},2:function(e,t){},"23b6":function(e,t,n){},"26d8":function(e,t,n){"use strict";var a=n("8b6e"),i=n.n(a);i.a},"27aa":function(e,t,n){"use strict";var a=n("564d"),i=n.n(a);i.a},3:function(e,t){},"33a5":function(e,t,n){},3563:function(e,t,n){},4:function(e,t){},"4caa":function(e,t,n){"use strict";var a=n("e90e"),i=n.n(a);i.a},"564d":function(e,t,n){},"56ce":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),i=n("8c4f"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app"},[n("Header"),n("div",{staticClass:"view"},[n("router-view")],1),n("Footer"),n("DevPanel")],1)},r=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"footer"},[n("div",{staticClass:"footer__warning text_light"},[e._v("\n    Warning: Demonstration only. Not reviewed for public use.\n  ")]),n("a",{staticClass:"footer__source text_light",attrs:{href:"https://github.com/ildarmgt/bitcoin-web-contracts"}},[e._v("\n    < Source Code >\n  ")]),n("div",{staticClass:"footer__email text_light"},[e._v("\n    ildarmgt@gmail.com\n  ")]),n("br"),n("BitcoinLogo")],1)},o=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a",{staticClass:"logo noselect",attrs:{href:"https://bitcoin.org/"}},[e._v("₿")])},u=[],d={name:"BitcoinLogo"},p=d,h=(n("d099"),n("2877")),f=Object(h["a"])(p,l,u,!1,null,"57cb3800",null),_=f.exports,v={name:"Footer",components:{BitcoinLogo:_}},m=v,g=(n("5d37"),Object(h["a"])(m,c,o,!1,null,"7fe8a5d5",null)),C=g.exports,y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("router-link",{staticClass:"title",attrs:{to:"/"}},[n("span",{staticClass:"title__bitcoin"},[e._v("Bitcoin")]),e._v(" Smart Contracts\n")])},b=[],S={name:"Header"},w=S,k=(n("d4c0"),Object(h["a"])(w,y,b,!1,null,"97035596",null)),I=k.exports,x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[this.show?n("div",{staticClass:"devpanel"},[e._v("\n    Dev Panel\n    "),n("div",{staticClass:"devButton",on:{click:e.outlineClicked}},[e._v("\n      outline\n    ")])]):e._e()])},O=[],j={name:"DevPanel",data:function(){return{show:!1}},created:function(){var e=this;window.addEventListener("keydown",function(t){"`"===t.key&&(e.show=!e.show)})},methods:{outlineClicked:function(){var e="outliner",t=document.getElementById(e);if(t)t.disabled=!0,t.parentNode.removeChild(t);else{var n="* {border: 1px solid red !important;}",a=document.createElement("style");a.type="text/css",a.id="outliner",a.appendChild(document.createTextNode(n)),document.head.appendChild(a)}}}},T=j,P=(n("722c"),Object(h["a"])(T,x,O,!1,null,"6bee1586",null)),E=P.exports,$={name:"App",components:{Header:I,Footer:C,DevPanel:E}},B=$,q=(n("034f"),Object(h["a"])(B,s,r,!1,null,null,null)),K=q.exports,N=n("2f62"),V=n("cebc"),H={pages:[{pageTitle:"Will Timer",ready:!1},{pageTitle:"Owner Key",ready:!1},{pageTitle:"Heir Key",ready:!1},{pageTitle:"Back up",ready:!1}],pageSelected:1,contractValues:{daysDelay:"1",ownerKey:"",heirKey:""}},D={getPageSelectedIC:function(e){return e.pageSelected},getContractValuesIC:function(e){return e.contractValues},getDelayIC:function(e){return e.contractValues.daysDelay}},W={updatePageStatusIC:function(e,t){var n=e.commit,a=t.pageIndex,i=t.status;n("setPageStatus",{pageIndex:a,status:i})},changePageIC:function(e,t){var n=e.commit;n("setPage",t)},updateContractValuesIC:function(e,t){var n=e.commit;n("setContractValues",t)}},z={setPageStatus:function(e,t){var n=t.pageIndex,a=t.status;e.pages[n].ready=a},setPage:function(e,t){var n=e.pageSelected,a=e.pages.length+1;e.pageSelected=0,e.pageSelected=t<=a?t:n},setContractValues:function(e,t){e.contractValues=Object(V["a"])({},e.contractValues,t)}},L={state:H,getters:D,actions:W,mutations:z};a["a"].use(N["a"]);var A=new N["a"].Store({modules:{inheritance:L}}),R=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",[e._v("\n    My Decentralized Applications (dApps):\n  ")]),n("div",{staticClass:"view"},[n("DappList")],1)])},F=[],M=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("router-link",{staticClass:"button",attrs:{to:"/inheritance"}},[e._v("\n    Inheritance dApp\n  ")]),n("router-link",{staticClass:"button",attrs:{to:"/puzzledelay"}},[e._v("\n    Puzzle Delay dApp\n  ")])],1)},Y=[],G={name:"DappList"},J=G,Q=Object(h["a"])(J,M,Y,!1,null,null,null),U=Q.exports,X={name:"IntroPage",components:{DappList:U}},Z=X,ee=Object(h["a"])(Z,R,F,!1,null,null,null),te=ee.exports,ne=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"inheritance"},[n("InheritanceIntro"),n("InheritanceNav")],1)},ae=[],ie=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},se=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"inheritance__intro"},[n("h1",[e._v("Inheritance Contract dApp")]),n("div",{staticClass:"description"},[n("div",{staticClass:"contractTitle"},[e._v("\n      A digital will based on inactivity time and enforced by the Bitcoin network:\n    ")]),n("ul",[n("li",[e._v("\n        The key of party "),n("span",{staticClass:"key_blue"},[e._v('"Owner"')]),e._v(" can access the funds at any time.\n      ")]),n("li",[e._v("\n        The key of party "),n("span",{staticClass:"key_green"},[e._v('"Heir"')]),e._v(" is allowed access to the funds\n        only if the funds don't move for a specified length of time.\n      ")])]),n("span",{staticClass:"text_light example"},[e._v('\n      Example: I will spend Bitcoin using my "Owner" key, moving them at least once a year to a new contract. But if something happens to me and I don\'t move them within 1 year, my sister can spend the funds with her "Heir" key.\n    ')])])])}],re={name:"InheritanceIntro"},ce=re,oe=(n("a5a5"),Object(h["a"])(ce,ie,se,!1,null,"fa35eae4",null)),le=oe.exports,ue=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"inheritance_nav"},[n("SelectionButton",{attrs:{color:"rgba(255, 165, 0, 0.8)",meaning:"create",buttonText:"Create this contract",meaningSelected:e.lastSelection},on:{selectionChoice:e.onButtonSelect}}),n("SelectionButton",{attrs:{color:"rgba(0, 0, 160, 0.60)",meaning:"owner",buttonText:"Spend as Owner",meaningSelected:e.lastSelection},on:{selectionChoice:e.onButtonSelect}}),n("SelectionButton",{attrs:{color:"rgba(0, 100, 0, 0.65)",meaning:"heir",buttonText:"Spend as Heir",meaningSelected:e.lastSelection},on:{selectionChoice:e.onButtonSelect}}),n("Expander",[e.isSelected("create")?n("InheritanceCreate"):e._e(),e.isSelected("owner")?n("InheritanceOwner"):e._e(),e.isSelected("heir")?n("InheritanceHeir"):e._e()],1)],1)},de=[],pe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"selectionButton",style:e.determineStyle,on:{click:e.onButtonClick}},[e._v("\n  "+e._s(e.buttonText)+"\n")])},he=[],fe={name:"SelectionButton",props:{color:{type:String,default:""},buttonText:{type:String,default:"OK"},meaning:{type:String,default:"OK"},meaningSelected:{type:String,default:""}},computed:{determineStyle:function(){return this.meaning===this.meaningSelected?{"background-color":"rgba(17, 17, 51, 0.65)",transform:"translateY(0.2vmin)"}:{"background-color":this.color}}},methods:{onButtonClick:function(){this.meaning===this.meaningSelected?this.$emit("selectionChoice",""):this.$emit("selectionChoice",this.meaning)}}},_e=fe,ve=(n("27aa"),Object(h["a"])(_e,pe,he,!1,null,"3b3e0912",null)),me=ve.exports,ge=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"inheritance_create"},[n("Stepper",{attrs:{stepperName:"Create Contract",pageWanted:e.getPageSelectedIC},on:{newPageClicked:e.stepperPageChangeRequested}},[n("StepperStep",{attrs:{pageTitle:"Will Timer"}},[n("InheritanceCreateStep1")],1),n("StepperStep",{attrs:{pageTitle:"Owner Key"}},[n("InheritanceCreateStep2")],1),n("StepperStep",{attrs:{pageTitle:"Heir Key"}},[n("InheritanceCreateStep3")],1),n("StepperStep",{attrs:{pageTitle:"Back up"}},[e._v("\n      Back up the information\n    ")])],1)],1)},Ce=[],ye=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"nav"},[n("div",{staticClass:"nav__name"},[e._v("\n    "+e._s(e.stepperName)+"\n  ")]),n("div",{staticClass:"nav__view"},[e._t("default")],2),n("div",{staticClass:"nav__steps"},e._l(e.titles(),function(t,a){return n("div",{key:t,staticClass:"nav__steps__step",class:e.setNavClasses(t).step,on:{click:function(n){return e.stepClicked(t,a+1)}}},[n("div",{staticClass:"nav__steps__step__number noselect",class:e.setNavClasses(t).stepNumber},[e._v("\n        "+e._s(a+1)+"\n      ")]),n("div",{staticClass:"nav__steps__step__title noselect",class:e.setNavClasses(t).stepTitle},[e._v("\n        "+e._s(t)+"\n      ")])])}),0)])},be=[],Se=n("75fc"),we=(n("c5f6"),{name:"Stepper",data:function(){return{lastSelection:"none",pageList:[]}},props:{stepperName:{type:String,default:""},pageWanted:{type:Number,default:0}},methods:{titles:function(){var e=this.$slots.default.reduce(function(e,t){return[].concat(Object(Se["a"])(e),[t.data.attrs.pageTitle])},[]);return this.lastSelection=this.pageWanted?e[this.pageWanted-1]:e[0],this.pageList=e,e},stepClicked:function(e,t){this.$emit("newPageClicked",t),this.lastSelection=e},setNavClasses:function(e){return this.lastSelection===e?{step:["stepSelected"],stepNumber:["stepNumberSelected"],stepTitle:["stepTitleSelected"]}:[]}}}),ke=we,Ie=(n("4caa"),Object(h["a"])(ke,ye,be,!1,null,"772547c4",null)),xe=Ie.exports,Oe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isStepSelected()?n("div",{staticClass:"StepperStep"},[e._t("default")],2):e._e()},je=[],Te={name:"StepperStep",methods:{isStepSelected:function(){var e=this.$attrs.pageTitle,t=this.$parent.lastSelection,n=e===t;return n}}},Pe=Te,Ee=Object(h["a"])(Pe,Oe,je,!1,null,"26c19205",null),$e=Ee.exports,Be=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"question"},[n("div",{staticClass:"question__strong"},[e._v("\n      How long until inheritance can be spent by the Heir?\n    ")]),n("div",{staticClass:"question__time"},[n("input",{ref:"question__time__input",staticClass:"question__time__input",attrs:{type:"text",maxlength:"5"},domProps:{value:e.timeValue},on:{input:e.numberChanged,change:e.refreshNumber}}),n("div",{staticClass:"question__time__label"},[e._v("\n        days\n      ")])]),e._m(0),n("div",{staticClass:"arrowButton fa",on:{click:e.onNextButtonClick}},[e._v("\n      Next\n    ")])])])},qe=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"question__light"},[e._v("\n      To be measured from moment funding is confirmed."),n("br"),e._v("\n         Value of up to 388 days.\n    ")])}],Ke=(n("6b54"),n("59ad")),Ne=n.n(Ke),Ve=(n("28a5"),{name:"InheritanceCreateStep1",data:function(){return{timeValue:"365",lastTimer:null}},mounted:function(){this.timeValue=this.getDelayIC},computed:Object(V["a"])({},Object(N["c"])(["getDelayIC"])),methods:Object(V["a"])({},Object(N["b"])(["updatePageStatusIC","changePageIC","updateContractValuesIC"]),{numberChanged:function(e){var t=this,n=e.target.value,a="0123456789.",i=n.split("").filter(function(e){return a.indexOf(e)>-1}).join(""),s=Ne()(i)>388?"388":i;this.$refs.question__time__input.value=this.timeValue=s,clearTimeout(this.lastTimer),this.lastTimer=setTimeout(function(){t.refreshNumber()},3e3)},refreshNumber:function(){var e=this.timeValue;0!==Ne()(e)&&!isNaN(e)&&e||(e=this.getDelayIC),e=Ne()(e).toString();try{this.$refs.question__time__input.value=e}catch(t){}this.updatePageStatusIC({pageIndex:0,status:!0}),this.updateContractValuesIC({daysDelay:e})},onNextButtonClick:function(){this.refreshNumber(),this.changePageIC(2)}})}),He=Ve,De=(n("e326"),Object(h["a"])(He,Be,qe,!1,null,"39d8ce6a",null)),We=De.exports,ze=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"q"},[n("div",{staticClass:"q__strong"},[e._v("\n      What private key to use for the Owner?\n    ")]),n("div",{staticClass:"q__key"},[n("textarea",{ref:"q__key__input",staticClass:"q__key__input",attrs:{rows:"1",spellcheck:"false"},domProps:{value:e.key},on:{input:e.updateKey,change:e.updateKey}}),n("div",{staticClass:"q__key__btns"},[n("div",{staticClass:"q__key__btns__new",on:{click:e.newKeyRequested}},[e._v("\n          new\n        ")])])]),e._m(0),n("div",{staticClass:"arrowButton fa",on:{click:e.onNextButtonClick}},[e._v("\n      Next\n    ")])])])},Le=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"q__light"},[e._v("\n      Generated a random one.\n      "),n("br"),e._v("   \n      You can provide your own.\n      "),n("br"),e._v("       \n      Must be in WIF format.\n      "),n("a",{staticClass:"q__light_link",attrs:{target:"_blank",href:"https://en.bitcoin.it/wiki/Wallet_import_format",title:"Bitcoin Wiki"}},[e._v("?")])])}],Ae=(n("a481"),n("59da")),Re=n.n(Ae),Fe={name:"InheritanceCreateStep2",data:function(){return{key:""}},components:{},mounted:function(){var e=this.getContractValuesIC.ownerKey;this.key=e||this.newKey(),this.updateContractValuesIC({ownerKey:this.key})},computed:Object(V["a"])({},Object(N["c"])(["getContractValuesIC"])),methods:Object(V["a"])({},Object(N["b"])(["changePageIC","updateContractValuesIC"]),{newKey:function(){return Re.a.ECPair.makeRandom().toWIF()},newKeyRequested:function(){var e=this.newKey();this.updateContractValuesIC({ownerKey:e}),this.key=e},onNextButtonClick:function(){this.changePageIC(3)},updateKey:function(e){var t=e.target.value,n="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",a=t.replace(/(\r\n|\n|\r)/gm,"").replace(/\s/g,"").split("").filter(function(e){return n.indexOf(e)>-1}).join("");a!==t&&console.log("String had illegal chars. Old string:",t),this.updateContractValuesIC({ownerKey:a}),e.target.value=a,this.key=a}})},Me=Fe,Ye=(n("26d8"),Object(h["a"])(Me,ze,Le,!1,null,"64da3904",null)),Ge=Ye.exports,Je=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"q"},[n("div",{staticClass:"q__strong"},[e._v("\n      What private key to use for the Owner?\n    ")]),n("div",{staticClass:"q__key"},[n("textarea",{ref:"q__key__input",staticClass:"q__key__input",attrs:{rows:"1",spellcheck:"false"},domProps:{value:e.key},on:{input:e.updateKey,change:e.updateKey}}),n("div",{staticClass:"q__key__btns"},[n("div",{staticClass:"q__key__btns__new",on:{click:e.newKeyRequested}},[e._v("\n          new\n        ")])])]),e._m(0),n("div",{staticClass:"arrowButton fa",on:{click:e.onNextButtonClick}},[e._v("\n      Next\n    ")])])])},Qe=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"q__light"},[e._v("\n      Generated a random one.\n      "),n("br"),e._v("   \n      You can provide your own.\n      "),n("br"),e._v("       \n      Must be in WIF format.\n      "),n("a",{staticClass:"q__light_link",attrs:{target:"_blank",href:"https://en.bitcoin.it/wiki/Wallet_import_format",title:"Bitcoin Wiki"}},[e._v("?")])])}],Ue={name:"InheritanceCreateStep3",data:function(){return{key:""}},components:{},mounted:function(){var e=this.getContractValuesIC.heirKey;this.key=e||this.newKey(),this.updateContractValuesIC({heirKey:this.key})},computed:Object(V["a"])({},Object(N["c"])(["getContractValuesIC"])),methods:Object(V["a"])({},Object(N["b"])(["changePageIC","updateContractValuesIC"]),{newKey:function(){return Re.a.ECPair.makeRandom().toWIF()},newKeyRequested:function(){var e=this.newKey();this.updateContractValuesIC({heirKey:e}),this.key=e},onNextButtonClick:function(){this.changePageIC(4)},updateKey:function(e){var t=e.target.value,n="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",a=t.replace(/(\r\n|\n|\r)/gm,"").replace(/\s/g,"").split("").filter(function(e){return n.indexOf(e)>-1}).join("");a!==t&&console.log("String had illegal chars. Old string:",t),this.updateContractValuesIC({heirKey:a}),e.target.value=a,this.key=a}})},Xe=Ue,Ze=(n("b7df"),Object(h["a"])(Xe,Je,Qe,!1,null,"3c731a5a",null)),et=Ze.exports,tt={name:"InheritanceCreate",components:{Stepper:xe,StepperStep:$e,InheritanceCreateStep1:We,InheritanceCreateStep2:Ge,InheritanceCreateStep3:et},computed:Object(V["a"])({},Object(N["c"])(["getPageSelectedIC"])),methods:Object(V["a"])({},Object(N["b"])(["changePageIC"]),{stepperPageChangeRequested:function(e){this.changePageIC(e)}})},nt=tt,at=Object(h["a"])(nt,ge,Ce,!1,null,"0622b838",null),it=at.exports,st=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},rt=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"inheritance_owner"},[n("h2",{staticClass:"blue"},[e._v("\n    Owner Access\n  ")])])}],ct={name:"InheritanceOwner"},ot=ct,lt=(n("d599"),Object(h["a"])(ot,st,rt,!1,null,"42f12490",null)),ut=lt.exports,dt=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},pt=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"inheritance_heir"},[n("h2",{staticClass:"green"},[e._v("\n    Heir Access\n  ")])])}],ht={name:"InheritanceHeir"},ft=ht,_t=(n("edda"),Object(h["a"])(ft,dt,pt,!1,null,"3bf40db4",null)),vt=_t.exports,mt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"animate_this",staticClass:"expander fa"},[e._t("default")],2)},gt=[],Ct={name:"Expander",data:function(){return{lastTimer:null}},mounted:function(){window.addEventListener("resize",this.autoHeight),this.animate()},beforeDestroy:function(){window.removeEventListener("resize",this.autoHeight)},updated:function(){this.animate()},methods:{animate:function(){this.$nextTick(function(){var e=this;clearTimeout(this.lastTimer);var t=.5,n=this.$refs.animate_this;n.style.height="auto";var a=n.clientHeight;n.style.transition="none",n.style.height="0px",n.style.transition=t+"s height ease-in-out",this.lastTimer=setTimeout(function(){n.style.height=a+"px"},1e3*t*.1),this.lastTimer=setTimeout(function(){e.autoHeight()},1e3*t*1.1)})},autoHeight:function(){var e=this.$refs.animate_this;e.style.height="auto"}}},yt=Ct,bt=(n("069b"),Object(h["a"])(yt,mt,gt,!1,null,null,null)),St=bt.exports,wt={name:"InheritanceNav",components:{SelectionButton:me,InheritanceCreate:it,InheritanceOwner:ut,InheritanceHeir:vt,Expander:St},data:function(){return{lastSelection:""}},methods:{onButtonSelect:function(e){this.lastSelection=e},isSelected:function(e){return this.lastSelection===e},getHeight:function(){return this.$refs.inheritance_nav_view.clientHeight}}},kt=wt,It=Object(h["a"])(kt,ue,de,!1,null,"742e1ce8",null),xt=It.exports,Ot={name:"Inheritance",components:{InheritanceNav:xt,InheritanceIntro:le}},jt=Ot,Tt=(n("89fe"),Object(h["a"])(jt,ne,ae,!1,null,"25487d9c",null)),Pt=Tt.exports,Et=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v("\n  (TODO)\n")])},$t=[],Bt={name:"PuzzleDelay"},qt=Bt,Kt=Object(h["a"])(qt,Et,$t,!1,null,null,null),Nt=Kt.exports;n.d(t,"router",function(){return Vt}),a["a"].use(i["a"]);var Vt=new i["a"]({routes:[{path:"/",component:te},{path:"/inheritance",component:Pt},{path:"/puzzledelay",component:Nt}]});a["a"].config.productionTip=!1,new a["a"]({router:Vt,store:A,render:function(e){return e(K)}}).$mount("#app")},"5d37":function(e,t,n){"use strict";var a=n("56ce"),i=n.n(a);i.a},"64a9":function(e,t,n){},"722c":function(e,t,n){"use strict";var a=n("7dd1"),i=n.n(a);i.a},"7dd1":function(e,t,n){},"84fa":function(e,t,n){},"89fe":function(e,t,n){"use strict";var a=n("33a5"),i=n.n(a);i.a},"8b6e":function(e,t,n){},a5a5:function(e,t,n){"use strict";var a=n("3563"),i=n.n(a);i.a},a73f:function(e,t,n){},a887:function(e,t,n){},b7df:function(e,t,n){"use strict";var a=n("a887"),i=n.n(a);i.a},c1ae:function(e,t,n){},ccec:function(e,t,n){},d099:function(e,t,n){"use strict";var a=n("a73f"),i=n.n(a);i.a},d4c0:function(e,t,n){"use strict";var a=n("23b6"),i=n.n(a);i.a},d599:function(e,t,n){"use strict";var a=n("84fa"),i=n.n(a);i.a},d8a7:function(e,t,n){},e326:function(e,t,n){"use strict";var a=n("c1ae"),i=n.n(a);i.a},e90e:function(e,t,n){},edda:function(e,t,n){"use strict";var a=n("ccec"),i=n.n(a);i.a}});
//# sourceMappingURL=app.45edaf40.js.map