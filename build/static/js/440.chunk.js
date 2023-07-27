"use strict";(self.webpackChunkexodus_crm=self.webpackChunkexodus_crm||[]).push([[440],{8440:function(e,t,r){r.r(t),r.d(t,{default:function(){return b}});var n=r(4165),a=r(5861),s=r(9439),c=r(7313),i=r(8467),l=r(7630),o=r(8821),u=r(860),d=r(6417),x=function(e){var t=e.filterGrid,r=e.showFilter,n=e.setShowFilter,a=e.setFilterGrid,i=e.geos,l=e.setGeo,x=c.useState(!1),f=(0,s.Z)(x,2),m=f[0],p=f[1];return(0,d.jsxs)("div",{className:"".concat(r?"translate-x-0":"translate-x-full"," fixed duration-300 bg-blackSecond w-[300px] right-0 h-screen z-30 py-7 px-5"),children:[(0,d.jsx)(u.j7p,{onClick:function(){return n(!1)},className:"absolute text-2xl right-3 top-3 cursor-pointer"}),(0,d.jsx)("h2",{className:"h4 text-gray mb-7",children:"Sort by"}),(0,d.jsxs)("div",{className:"flex gap-2 mb-6",children:[(0,d.jsx)("button",{onClick:function(){return a(2)},className:"".concat(2===t?"bg-primary":"bg-backGround"," flex justify-center items-center w-[32px] h-[32px] rounded duration-300 hover:bg-primary"),children:(0,d.jsx)(o.K9B,{})}),(0,d.jsx)("button",{onClick:function(){return a(1)},className:"".concat(1===t?"bg-primary":"bg-backGround"," flex justify-center items-center w-[32px] h-[32px] rounded duration-300 hover:bg-primary"),children:(0,d.jsx)(o.ut$,{})})]}),(0,d.jsxs)("div",{className:"flex flex-col",children:[(0,d.jsxs)("div",{onClick:function(){return p(!m)},className:"flex items-center gap-2 body-2 text-gray cursor-pointer mb-5",children:[(0,d.jsx)("h2",{className:"".concat(m?"text-primary":"text-gray"," duration-300"),children:"Geolocation"}),(0,d.jsx)(u.OId,{className:"".concat(m?"rotate-180 text-primary":"rotate-0 text-gray"," duration-300")})]}),(0,d.jsx)("div",{className:"".concat(m?"opacity-100 visible":"opacity-0 invisible"," flex gap-2 overflow-hidden duration-300 text-gray text-sm"),children:null===i||void 0===i?void 0:i.map((function(e,t){return(0,d.jsx)("button",{onClick:function(){return l(e)},className:"bg-backGround flex justify-center items-center w-[32px] h-[32px] rounded duration-300 text-white hover:bg-primary",children:e},e)}))})]})]})},f=r(9231),m=r(2916),p=r(5958),h=r(507),b=function(){var e,t=(0,i.s0)(),r=c.useState(!1),u=(0,s.Z)(r,2),b=u[0],j=u[1],g=c.useState(!1),v=(0,s.Z)(g,2),y=v[0],w=v[1],N=c.useState(1),k=(0,s.Z)(N,2),Z=k[0],C=k[1],S=c.useState(null),G=(0,s.Z)(S,2),_=G[0],F=(G[1],c.useState("")),L=(0,s.Z)(F,2),z=L[0],D=L[1],O=c.useState(""),A=(0,s.Z)(O,2),E=A[0],R=A[1],U=(0,l.mV)("?geo=".concat(E)),$=U.data,B=void 0===$?[]:$,I=U.isLoading,J=(0,l.yF)(),K=(0,s.Z)(J,1)[0],P=(0,l.zm)(),Q=(0,s.Z)(P,1)[0],V=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!B){e.next=4;break}return e.next=4,K().unwrap();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),q=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t,r){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!B){e.next=4;break}return e.next=4,Q(r).unwrap();case 4:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}();return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(x,{filterGrid:Z,showFilter:y,filterGeo:_,setShowFilter:w,setFilterGrid:C,geos:B&&B.geos,setGeo:R}),(0,d.jsx)("div",{className:"py-6",children:(0,d.jsxs)("div",{className:"flex flex-col",children:[(0,d.jsxs)("div",{className:"flex justify-between gap-3 mb-5",children:[(0,d.jsxs)("div",{className:"flex flex-auto",children:[(0,d.jsx)("button",{onClick:function(){return j(!b)},className:"".concat(b?"rounded-l-lg text-primary":"rounded-l-lg text-gray"," flex justify-center duration-300 items-center px-3 h-[32px] bg-blackSecond"),children:(0,d.jsx)(m.jRj,{})}),(0,d.jsx)("div",{className:"relative h-[32px] w-full duration-300",children:(0,d.jsx)("input",{className:"".concat(b?"w-full px-3":"w-0 px-0"," bg-blackSecond h-full text-xs text-gray border-none placeholder:text-gray duration-300 rounded-r w-full focus:shadow-none focus:ring-0"),type:"search",placeholder:"Enter user name to search...",value:z,onChange:function(e){return D(e.target.value)}})})]}),(0,d.jsx)("div",{onClick:function(){return w(!0)},className:"px-5 flex items-center justify-center bg-blackSecond rounded-lg duration-200 cursor-pointer text-gray hover:bg-primary hover:text-white",children:(0,d.jsx)(p.Ol$,{})})]}),(0,d.jsxs)("div",{className:"flex justify-between items-center mb-3",children:[(0,d.jsxs)("a",{onClick:function(e){return V(e)},href:"#",className:"flex items-center gap-2 text-gray cursor-pointer",children:[(0,d.jsx)(o.cAs,{}),(0,d.jsx)("p",{children:"Update all thumbnails"})]}),(0,d.jsx)("h2",{onClick:function(){return R("")},className:"cursor-pointer text-gray",children:"Reset filter"})]}),(0,d.jsx)("div",{className:"flex flex-wrap gap-4",children:I?(0,d.jsx)(h.Z,{}):null===(e=B.landings)||void 0===e?void 0:e.filter((function(e){return e.name.toLowerCase().includes(z.toLowerCase().trim())||e.branch_name.toLowerCase().includes(z.toLowerCase().trim())})).map((function(e){return(0,d.jsxs)("div",{className:"".concat(1===Z?"w-full":"w-[calc(50%_-_8px)]"," relative duration-300 flex flex-col justify-between p-3 w-full h-[160px] rounded md:h-[300px]"),children:[(0,d.jsx)("div",{className:"absolute bg-black/30 inset-0 z-10"}),(0,d.jsx)("img",{className:"absolute w-full h-full object-cover inset-0 rounded",src:"data:image/webp;base64, ".concat(e.thumbnail),alt:""}),(0,d.jsxs)("div",{className:"flex justify-between z-20",children:[(0,d.jsxs)("div",{className:"flex gap-3",children:[(0,d.jsxs)("a",{href:e.clone_url,target:"_blank",rel:"noreferrer",className:"group cursor-pointer relative flex justify-center items-center w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary",children:[(0,d.jsx)(f.Z,{name:"Download ".concat(e.name)}),(0,d.jsx)(m._hL,{})]}),(0,d.jsxs)("button",{onClick:function(){return t("/webcat/".concat(e.id))},className:"group cursor-pointer relative flex justify-center items-center w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary",children:[(0,d.jsx)(f.Z,{name:"Edit ".concat(e.name)}),(0,d.jsx)(m.vPQ,{})]}),(0,d.jsxs)("button",{onClick:function(t){return q(t,e.id)},className:"group cursor-pointer relative flex justify-center items-center w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary",children:[(0,d.jsx)(f.Z,{name:"Update ".concat(e.name," thumbnail")}),(0,d.jsx)(o.cAs,{})]})]}),(0,d.jsxs)("button",{className:"group cursor-pointer relative flex justify-center items-center w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary",children:[(0,d.jsx)(f.Z,{name:"Open ".concat(e.name)}),(0,d.jsx)(m.rDJ,{})]})]}),(0,d.jsxs)("div",{className:"flex justify-between items-end z-20",children:[(0,d.jsx)("h3",{children:e.name}),(0,d.jsxs)("div",{className:"flex items-end gap-3",children:[(0,d.jsx)("p",{className:"body-2 text-gray",children:e.branch_name}),(0,d.jsx)("button",{onClick:function(){return R(e.geo)},className:"flex justify-center items-center text-sm w-[32px] h-[32px] rounded bg-blackSecond duration-300 hover:bg-primary",children:e.geo})]})]})]},e.id)}))})]})})]})}}}]);