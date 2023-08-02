"use strict";(self.webpackChunkexodus_crm=self.webpackChunkexodus_crm||[]).push([[250],{9250:function(e,l,n){n.r(l),n.d(l,{default:function(){return b}});var a=n(9439),o=n(7313),u=n(249),r=n(1413),d=n(5471),t=n(4254),c=n(6417),i={option:function(e,l){return(0,r.Z)((0,r.Z)({},e),{},{fontWeight:l.isSelected?"bold":"normal",color:l.isSelected?"#ffffff":"#757575",backgroundColor:l.isSelected?"#1A69DF":"#1d1d1d",borderRadius:"4px"})},singleValue:function(e){return(0,r.Z)((0,r.Z)({},e),{},{color:"#757575",backgroundColor:"#1d1d1d"})},control:function(e,l){return(0,r.Z)((0,r.Z)({},e),{},{background:"#1d1d1d",color:"#757575",borderColor:"none",borderWidth:"0",boxShadow:(l.isFocused,null)})},menu:function(e){return(0,r.Z)((0,r.Z)({},e),{},{padding:10,backgroundColor:"#1d1d1d"})},input:function(e){return(0,r.Z)((0,r.Z)({},e),{},{color:"#757575"})}},s=function(e){var l=(0,t.zQ)({team_id:e.teamId}),n=l.data,u=void 0===n?[]:n,r=(l.isLoading,o.useState([])),s=(0,a.Z)(r,2),f=s[0],b=s[1];return o.useEffect((function(){b(null===u||void 0===u?void 0:u.map((function(e){return{value:e.id,label:e.username}})))}),[u]),(0,c.jsxs)("label",{className:"flex flex-col gap-1 mb-4 ".concat(void 0===e.labelClass?"":e.labelClass).trim(),htmlFor:"user",children:["User",(0,c.jsx)(d.ZP,{isClearable:!0,options:f,styles:i,placeholder:null===e.placeholder?"":e.placeholder,value:null===e.user?"":e.user,onChange:e.onChange})]})},f=n(8741),b=function(e){var l={balance:0,currency:"USD"},n=o.useState({}),r=(0,a.Z)(n,2),d=r[0],i=r[1],b=o.useState({}),v=(0,a.Z)(b,2),m=v[0],p=v[1],h=o.useState(l),x=(0,a.Z)(h,2),Z=x[0],g=x[1],C=(0,t.L7)({team:void 0===d||null===d||void 0===d.value?0:d.value},{skip:void 0===d||null===d||void 0===d.value}),k=C.data,S=C.isLoading;o.useEffect((function(){null!==d&&g(k)}),[S,d]);return(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center gap-3",children:[(0,c.jsx)(u.Z,{labelClass:"flex-grow",placeholder:(null===d||void 0===d.label)&&"No team",team:null===d||void 0===d.label?null:d,onChange:function(e){i(e),p(null),null===e&&g(l)}}),(0,c.jsx)(s,{labelClass:"md:w-[150px]",teamId:null===d?null:d.value,user:null===m||void 0===m.label?null:m,placeholder:(null===m||void 0===m.label)&&"No user",onChange:function(e){return p(e)}})]}),(0,c.jsx)(f.Z,{label:"Balance",id:"team_balance",placeholder:null===d||void 0===d.label?"Team balance":"".concat(d.label," balance"),type:"text",readOnly:!0,value:void 0===Z?"":"".concat(Z.balance," ").concat(Z.currency)})]})}}}]);