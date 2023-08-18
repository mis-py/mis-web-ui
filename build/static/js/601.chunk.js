"use strict";(self.webpackChunkexodus_crm=self.webpackChunkexodus_crm||[]).push([[601],{5601:function(e,a,n){n.r(a),n.d(a,{default:function(){return S}});var t=n(4165),l=n(5861),s=n(9439),r=n(7313),i=n(249),o=n(4205),c=n(6192),u=n(7415),d=n(6417),m=function(e){var a=(0,c.zQ)({team_id:e.teamId}).data,n=void 0===a?[]:a,t=r.useState([]),l=(0,s.Z)(t,2),i=l[0],m=l[1];return r.useEffect((function(){m(null===n||void 0===n?void 0:n.map((function(e){return{value:e.id,label:e.username}})))}),[n]),(0,d.jsxs)("label",{className:"flex flex-col gap-1 mb-4 ".concat(void 0===e.labelClass?"":e.labelClass).trim(),htmlFor:"user",children:["User",(0,d.jsx)(o.ZP,{isClearable:!0,options:i,styles:u.Z,placeholder:null===e.placeholder?"":e.placeholder,value:null===e.user?"":e.user,onChange:e.onChange})]})},f=n(8741),p=n(3433),v=n(507),h=n(8645),x=function(e){var a=(0,c.k3)().data,n=void 0===a?[]:a,i=r.useState([]),m=(0,s.Z)(i,2),x=m[0],b=m[1],g=r.useState([]),Z=(0,s.Z)(g,2),S=Z[0],y=Z[1],j=r.useState(10),C=(0,s.Z)(j,2),N=C[0],_=C[1],k=(0,c.h8)(),D=(0,s.Z)(k,2),w=D[0],V=D[1],O=r.useState([]),E=(0,s.Z)(O,2),A=E[0],P=E[1],J=r.useState([]),T=(0,s.Z)(J,2),z=T[0],I=T[1];r.useEffect((function(){var e=[];n.forEach((function(a){return e.push({value:a,label:a})})),b(e)}),[n]);r.useEffect((function(){var a=setTimeout((0,l.Z)((0,t.Z)().mark((function a(){return(0,t.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(!(0===e.domainSearchValue.trim().length||N<1||0===S.length||null===e.team_id)){a.next=2;break}return a.abrupt("return");case 2:return I([]),P([]),a.next=6,w({team_id:e.team_id,q:e.domainSearchValue,zones:S,max_price:N,quantity:3}).then((function(e){P(e.data)}));case 6:case"end":return a.stop()}}),a)}))),1e3);return function(){return clearTimeout(a)}}),[S,N,e.domainSearchValue,e.team_id,w]);return(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{className:"flex flex-wrap items-center gap-3",children:[(0,d.jsx)(f.Z,{id:"domain_search",type:"text",label:"Domain search",placeholder:"Type here domain name...",className:"flex-grow",value:void 0===e.domainSearchValue?"test crypto cart":e.domainSearchValue,changeValue:void 0===e.setDomainSearchValue?function(){}:e.setDomainSearchValue}),(0,d.jsx)(f.Z,{id:"max_price",type:"number",label:"Max domain price",placeholder:"Type price here",className:"md:w-[150px]",value:N,changeValue:function(e){_(e.target.value)}}),(0,d.jsxs)("label",{className:"flex flex-col gap-1 mb-4 md:w-[200px]",htmlFor:"team",children:["Domain zone",(0,d.jsx)(o.ZP,{isClearable:!0,isMulti:!0,options:x,styles:u.Z,placeholder:"Select zones...",onChange:function(e){var a=[];e.forEach((function(e){return a.push(e.value)})),y(a)}})]})]}),V.isLoading?(0,d.jsx)(v.Z,{}):void 0!==A&&A.length?(0,d.jsx)("div",{className:"flex flex-col gap-4",children:A.map((function(e){return(0,d.jsx)(h.Z,{className:!1===e.is_available?"opacity-40":"",children:(0,d.jsxs)("div",{className:"flex flex-nowrap items-center",children:[(0,d.jsx)("input",{value:e.domain,type:"checkbox",onChange:function(e){return function(e){var a=e.checked,n=e.value;I(a?function(e){return[].concat((0,p.Z)(e),[n])}:function(e){return e.filter((function(e){return e!==n}))})}(e.target)}}),(0,d.jsx)("p",{className:"pl-6",children:e.domain}),(0,d.jsxs)("p",{className:"ml-auto text-primary",children:[e.price,e.currency]})]})},e.domain)}))}):null,void 0!==z&&z.length?(0,d.jsx)("button",{onClick:function(){var a=typeof e.onSetupDomainsCallback;"function"===a?e.onSetupDomainsCallback({selectedDomains:z,domainsSearchResult:A,maxDomainPrice:N}):console.error("props.onSetupDomainsCallback should be a function, ".concat(a," given"))},className:"btn-primary mt-4",children:"Setup domains"}):null]})},b=function(e){var a=(0,c.xH)().data,n=void 0===a?[]:a,t=r.useState([]),l=(0,s.Z)(t,2),i=l[0],m=l[1];return r.useEffect((function(){Array.isArray(n)&&m(n.map((function(e){return{value:e.id,label:e.ip_address}})))}),[n]),(0,d.jsx)(o.ZP,{isClearable:!0,options:i,styles:u.Z,placeholder:"Select ip address...",onChange:e.onChange})},g=n(4491),Z=n(6153),S=function(e){var a={balance:0,currency:"USD"},n=r.useState({}),o=(0,s.Z)(n,2),u=o[0],p=o[1],S=(0,Z.h)();void 0!==S&&(S.onmessage=function(e){var a=JSON.parse(e.data);if(void 0!==a.data&&void 0!==a.data.message&&void 0!==a.data.message.body&&void 0!==a.data.message.body.domain){var n=JSON.parse(JSON.stringify(u));n[a.data.message.body.domain]={message:a.data.message.body.status+" "+a.data.message.body.state+" "+a.data.message.body.detail,state:"".concat(a.data.message.body.status,"_").concat(a.data.message.body.state)},p(n),Object.values(n).every((function(e){return"done_finish"===e.state}))&&(g.Am.success("All domains have been successfully set up!"),X([]),F(""))}});var y=r.useState({}),j=(0,s.Z)(y,2),C=j[0],N=j[1],_=r.useState({}),k=(0,s.Z)(_,2),D=k[0],w=k[1],V=r.useState(a),O=(0,s.Z)(V,2),E=O[0],A=O[1],P=r.useState(10),J=(0,s.Z)(P,2),T=J[0],z=J[1],I=r.useState(""),L=(0,s.Z)(I,2),q=L[0],F=L[1],M=void 0===C||null===C||void 0===C.value,U=(0,c.L7)({team:M?0:C.value},{skip:M}).data,B=(0,c.rf)(),H=(0,s.Z)(B,2),Q=H[0],R=H[1],G=r.useState([]),K=(0,s.Z)(G,2),W=K[0],X=K[1],Y=r.useState({}),$=(0,s.Z)(Y,2),ee=$[0],ae=$[1];r.useEffect((function(){null!==C&&A(U)}),[U,C]);var ne=function(){var e=(0,l.Z)((0,t.Z)().mark((function e(){var a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],Object.entries(ee).forEach((function(e){var n=(0,s.Z)(e,2),t=n[0],l=n[1];a.push({name:t,vps_id:l})})),e.next=4,Q({team_id:C.value,user_id:D.value,max_price:T,domains:a}).then((function(e){if(void 0===e.error){g.Am.success("Domains setup in progress");var a={};Object.entries(ee).forEach((function(e){var n=(0,s.Z)(e,1)[0];a[n]={state:"in_progress"}})),p(a)}else void 0!==e.error.data.detail?g.Am.error(e.error.data.detail):g.Am.error(e.error.data.message)}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{className:W.length?"hidden":null,children:[(0,d.jsxs)("div",{className:"flex flex-wrap items-center gap-3",children:[(0,d.jsx)(i.Z,{labelClass:"flex-grow",placeholder:(null===C||void 0===C.label)&&"No team",team:null===C||void 0===C.label?null:C,onChange:function(e){N(e),w(null),null===e&&A(a)}}),(0,d.jsx)(m,{labelClass:"md:w-[200px]",teamId:null===C?null:C.value,user:null===D||void 0===D.label?null:D,placeholder:(null===D||void 0===D.label)&&"No user",onChange:function(e){return w(e)}})]}),(0,d.jsx)(f.Z,{label:"Balance",id:"team_balance",placeholder:null===C||void 0===C.label?"Team balance":"".concat(C.label," balance"),type:"text",readOnly:!0,value:void 0===E?"":"".concat(E.balance," ").concat(E.currency)}),(0,d.jsx)(x,{team_id:null===C||void 0===C.value?null:C.value,domainSearchValue:q,setDomainSearchValue:function(e){void 0!==F&&F(e.target.value)},onSetupDomainsCallback:function(e){X(e.selectedDomains),z(e.maxDomainPrice)}})]}),W.length?(0,d.jsxs)("div",{children:[W.map((function(e){return(0,d.jsxs)(h.Z,{children:[(0,d.jsxs)("div",{children:["Domain: ",e]}),(0,d.jsxs)("div",{className:"flex gap-3 items-center mt-2",children:["IP address:",(0,d.jsx)(b,{onChange:function(a){!function(e,a){var n=JSON.parse(JSON.stringify(ee));void 0===a||null===a?delete n[e]:n[e]=a.value,ae(n)}(e,a)}}),void 0!==u[e]&&("in_progress"===u[e].state?"In progress...":u[e].message)]})]},e)})),W.length===Object.keys(ee).length&&!1===R.isLoading&&(0,d.jsx)("button",{onClick:function(){ne()},className:"btn-primary mt-4",children:"Setup domains"}),R.isLoading?(0,d.jsx)(v.Z,{}):null]}):null]})}}}]);