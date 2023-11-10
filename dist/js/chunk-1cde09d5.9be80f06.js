(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1cde09d5"],{"0098":function(t,n,s){},"11b6":function(t,n,s){"use strict";s("0098")},"3fa6":function(t,n,s){"use strict";s("f4bd")},"565d":function(t,n,s){},"9ed6":function(t,n,s){"use strict";s.r(n);var e=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"login-container"},[s("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,rules:t.loginRules,autocomplete:"on","label-position":"left"}},[s("div",{staticClass:"title-container"},[s("h3",{staticClass:"title"},[t._v(" "+t._s(t.$t("login.title"))+" ")]),s("lang-select",{staticClass:"set-language"})],1),s("el-form-item",{attrs:{prop:"username"}},[s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"user"}})],1),s("el-input",{ref:"username",attrs:{placeholder:t.$t("login.username"),name:"username",type:"text",tabindex:"1",autocomplete:"on"},model:{value:t.loginForm.username,callback:function(n){t.$set(t.loginForm,"username",n)},expression:"loginForm.username"}})],1),s("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:t.capsTooltip,callback:function(n){t.capsTooltip=n},expression:"capsTooltip"}},[s("el-form-item",{attrs:{prop:"password"}},[s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"password"}})],1),s("el-input",{key:t.passwordType,ref:"password",attrs:{type:t.passwordType,placeholder:t.$t("login.password"),name:"password",tabindex:"2",autocomplete:"on"},on:{blur:function(n){t.capsTooltip=!1}},nativeOn:{keyup:[function(n){return t.checkCapslock.apply(null,arguments)},function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:t.handleLogin.apply(null,arguments)}]},model:{value:t.loginForm.password,callback:function(n){t.$set(t.loginForm,"password",n)},expression:"loginForm.password"}}),s("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[s("svg-icon",{attrs:{"icon-class":"password"===t.passwordType?"eye":"eye-open"}})],1)],1)],1),s("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(n){return n.preventDefault(),t.handleLogin.apply(null,arguments)}}},[t._v(" "+t._s(t.$t("login.logIn"))+" ")]),s("div",{staticStyle:{position:"relative"}},[s("div",{staticClass:"tips"},[s("span",[t._v(t._s(t.$t("login.username"))+" : admin")]),s("span",[t._v(t._s(t.$t("login.password"))+" : "+t._s(t.$t("login.any")))])]),s("div",{staticClass:"tips"},[s("span",{staticStyle:{"margin-right":"18px"}},[t._v(" "+t._s(t.$t("login.username"))+" : editor ")]),s("span",[t._v(t._s(t.$t("login.password"))+" : "+t._s(t.$t("login.any")))])]),s("el-button",{staticClass:"thirdparty-button",attrs:{type:"primary"},on:{click:function(n){t.showDialog=!0}}},[t._v(" "+t._s(t.$t("login.thirdparty"))+" ")])],1)],1),s("el-dialog",{attrs:{title:t.$t("login.thirdparty"),visible:t.showDialog},on:{"update:visible":function(n){t.showDialog=n}}},[t._v(" "+t._s(t.$t("login.thirdpartyTips"))+" "),s("br"),s("br"),s("br"),s("social-sign")],1)],1)},o=[],i=(s("13d5"),s("d3b7"),s("b64b"),s("61f7")),a=s("1131"),r=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"social-signup-container"},[s("div",{staticClass:"sign-btn",on:{click:function(n){return t.wechatHandleClick("wechat")}}},[s("span",{staticClass:"wx-svg-container"},[s("svg-icon",{staticClass:"icon",attrs:{"icon-class":"wechat"}})],1),t._v(" WeChat ")]),s("div",{staticClass:"sign-btn",on:{click:function(n){return t.tencentHandleClick("tencent")}}},[s("span",{staticClass:"qq-svg-container"},[s("svg-icon",{staticClass:"icon",attrs:{"icon-class":"qq"}})],1),t._v(" QQ ")])])},l=[],c={name:"SocialSignin",methods:{wechatHandleClick:function(t){alert("ok")},tencentHandleClick:function(t){alert("ok")}}},u=c,p=(s("aa05"),s("2877")),d=Object(p["a"])(u,r,l,!1,null,"7309fbbb",null),g=d.exports,f={name:"Login",components:{LangSelect:a["a"],SocialSign:g},data:function(){var t=function(t,n,s){Object(i["e"])(n)?s():s(new Error("Please enter the correct user name"))},n=function(t,n,s){n.length<6?s(new Error("The password can not be less than 6 digits")):s()};return{loginForm:{username:"admin",password:"111111"},loginRules:{username:[{required:!0,trigger:"blur",validator:t}],password:[{required:!0,trigger:"blur",validator:n}]},passwordType:"password",capsTooltip:!1,loading:!1,showDialog:!1,redirect:void 0,otherQuery:{}}},watch:{$route:{handler:function(t){var n=t.query;n&&(this.redirect=n.redirect,this.otherQuery=this.getOtherQuery(n))},immediate:!0}},created:function(){},mounted:function(){""===this.loginForm.username?this.$refs.username.focus():""===this.loginForm.password&&this.$refs.password.focus()},destroyed:function(){},methods:{checkCapslock:function(t){var n=t.key;this.capsTooltip=n&&1===n.length&&n>="A"&&n<="Z"},showPwd:function(){var t=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){t.$refs.password.focus()}))},handleLogin:function(){var t=this;this.$refs.loginForm.validate((function(n){if(!n)return console.log("error submit!!"),!1;t.loading=!0,t.$store.dispatch("user/login",t.loginForm).then((function(){t.$router.push({path:t.redirect||"/",query:t.otherQuery}),t.loading=!1})).catch((function(){t.loading=!1}))}))},getOtherQuery:function(t){return Object.keys(t).reduce((function(n,s){return"redirect"!==s&&(n[s]=t[s]),n}),{})}}},h=f,m=(s("11b6"),s("3fa6"),Object(p["a"])(h,e,o,!1,null,"09f01a64",null));n["default"]=m.exports},aa05:function(t,n,s){"use strict";s("565d")},f4bd:function(t,n,s){}}]);