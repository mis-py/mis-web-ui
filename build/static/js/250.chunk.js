"use strict";(self.webpackChunkexodus_crm=self.webpackChunkexodus_crm||[]).push([[250],{9250:function(e,l,n){n.r(l),n.d(l,{default:function(){return b}});var a=n(9439),o=n(7313),u=n(249),r=n(1413),t=n(5471),d=n(4254),c=n(6417),s={option:function(e,l){return(0,r.Z)((0,r.Z)({},e),{},{fontWeight:l.isSelected?"bold":"normal",color:l.isSelected?"#ffffff":"#757575",backgroundColor:l.isSelected?"#1A69DF":"#1d1d1d",borderRadius:"4px"})},singleValue:function(e){return(0,r.Z)((0,r.Z)({},e),{},{color:"#757575",backgroundColor:"#1d1d1d"})},control:function(e,l){return(0,r.Z)((0,r.Z)({},e),{},{background:"#1d1d1d",color:"#757575",borderColor:"none",borderWidth:"0",boxShadow:(l.isFocused,null)})},menu:function(e){return(0,r.Z)((0,r.Z)({},e),{},{padding:10,backgroundColor:"#1d1d1d"})},input:function(e){return(0,r.Z)((0,r.Z)({},e),{},{color:"#757575"})}},i=function(e){var l=(0,d.zQ)({team_id:e.teamId}).data,n=void 0===l?[]:l,u=o.useState([]),r=(0,a.Z)(u,2),i=r[0],f=r[1];return o.useEffect((function(){f(null===n||void 0===n?void 0:n.map((function(e){return{value:e.id,label:e.username}})))}),[n]),(0,c.jsxs)("label",{className:"flex flex-col gap-1 mb-4 ".concat(void 0===e.labelClass?"":e.labelClass).trim(),htmlFor:"user",children:["User",(0,c.jsx)(t.ZP,{isClearable:!0,options:i,styles:s,placeholder:null===e.placeholder?"":e.placeholder,value:null===e.user?"":e.user,onChange:e.onChange})]})},f=n(8741),b=function(e){var l={balance:0,currency:"USD"},n=o.useState({}),r=(0,a.Z)(n,2),t=r[0],s=r[1],b=o.useState({}),v=(0,a.Z)(b,2),m=v[0],p=v[1],h=o.useState(l),x=(0,a.Z)(h,2),Z=x[0],C=x[1],g=(0,d.L7)({team:void 0===t||null===t||void 0===t.value?0:t.value},{skip:void 0===t||null===t||void 0===t.value}).data;o.useEffect((function(){null!==t&&C(g)}),[g,t]);return(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center gap-3",children:[(0,c.jsx)(u.Z,{labelClass:"flex-grow",placeholder:(null===t||void 0===t.label)&&"No team",team:null===t||void 0===t.label?null:t,onChange:function(e){s(e),p(null),null===e&&C(l)}}),(0,c.jsx)(i,{labelClass:"md:w-[150px]",teamId:null===t?null:t.value,user:null===m||void 0===m.label?null:m,placeholder:(null===m||void 0===m.label)&&"No user",onChange:function(e){return p(e)}})]}),(0,c.jsx)(f.Z,{label:"Balance",id:"team_balance",placeholder:null===t||void 0===t.label?"Team balance":"".concat(t.label," balance"),type:"text",readOnly:!0,value:void 0===Z?"":"".concat(Z.balance," ").concat(Z.currency)})]})}}}]);