(this.webpackJsonpsimulador_horarios=this.webpackJsonpsimulador_horarios||[]).push([[0],{52:function(e,t,n){},80:function(e,t,n){},81:function(e,t,n){},83:function(e,t,n){},84:function(e,t,n){},85:function(e,t,n){},86:function(e,t,n){},88:function(e,t,n){},89:function(e,t,n){},90:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),c=n(21),s=n.n(c),i=(n(52),n(19)),o=n.n(i);var u=n(46),d=n(32),b=n(47),j=n(43),l=n(24),h=n(11),p=n.n(h),O=n(7),f=n(10),x=n(4),m=n(44),v=n.n(m),y={base:function(){return"https://api.horarios.bitsys.tech/get?url="},departments:function(){return y.base()+"/departments"},departmentSubjects:function(e){return y.base()+"/department/"+e},subject:function(e){return y.base()+"/class/"+e},subjectShifts:function(e){return y.base()+"/class/i/"+e+"/shifts"}},g=y;function w(e){return o.a.get(g.departmentSubjects(e))}function k(e){return o.a.get(g.subject(e))}function C(e){return o.a.get(g.subjectShifts(e))}var S=p.a.mark(oe),R="[Redux] Init",A="[Redux] Set",F="[Redux] SetYears",N="[Redux] ChangeYear",_="[Redux] GetDepartments",L="[Redux] SetDepartments",D="[Redux] SetDepartment",I="[Redux] GetDepartmentSubjects",T="[Redux] SetSubjects",P="[Redux] AddOrUpdateSubjects",E="[Redux] AddSubjectDone",M="[Redux] RemoveSubject",q="[Redux] AddOrUpdateShifts",Y="[Redux] SaveClass",G="[Redux] RemoveClass",z="[Redux] SetView",B="[Redux] Nothing",U={view:void 0,year:{all:[],chosen:void 0},department:{all:[],chosen:void 0},subject:{all:[],chosen:{}},shifts:{},classes:{},loading:!0},V=Object(l.a)({storage:v.a,key:"simulador-horarios"},(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case A:var n=Object(x.a)({},e);return n[t.payload.name]=t.payload.content,n;case F:var a=Object(x.a)({},e);return a.year=t.payload,a;case N:var r=Object(x.a)({},e);return r.year.chosen=t.payload,r;case _:var c=Object(x.a)({},e);return c.loading=!0,c;case L:var s=Object(x.a)({},e);return s.department=Object(x.a)(Object(x.a)({},e.department),{},{all:t.payload}),s.loading=!1,s;case D:var i=Object(x.a)({},e);return i.department=Object(x.a)(Object(x.a)({},e.department),{},{chosen:t.payload}),i;case I:var o=Object(x.a)({},e);return o.loading=!0,o;case T:var u=Object(x.a)({},e);return u.subject=Object(x.a)(Object(x.a)({},e.subject),{},{all:t.payload}),u.loading=!1,u;case P:var d=Object(x.a)({},e);return d.loading=!0,d;case E:var b=Object(x.a)({},e),j=Object(x.a)({},e.subject.chosen);return j[t.payload.id]=t.payload,b.subject=Object(x.a)(Object(x.a)({},e.subject),{},{chosen:Object(x.a)({},j)}),b;case M:var l=Object(x.a)({},e),h=Object(x.a)({},e.subject.chosen);delete h[t.payload],l.subject=Object(x.a)(Object(x.a)({},e.subject),{},{chosen:Object(x.a)({},h)});var p=Object(x.a)({},e.shifts);return delete p[t.payload],l.shifts=Object(x.a)({},p),l;case q:var O=Object(x.a)({},e);return O.shifts=Object(x.a)({},e.shifts),O.shifts[t.payload.subject]=t.payload.shifts,O;case Y:var f=Object(x.a)({},e),m=Object(x.a)({},e.classes);return m[t.payload.subject]?m[t.payload.subject].count++:(m[t.payload.subject]={},m[t.payload.subject].count=1),m[t.payload.subject][t.payload.type]||(m[t.payload.subject][t.payload.type]={}),m[t.payload.subject][t.payload.type][t.payload.number]=Object(x.a)({},e.shifts[t.payload.subject][t.payload.type][t.payload.number]),f.classes=m,f;case G:var v=Object(x.a)({},e),y=Object(x.a)({},e.classes);return y[t.payload.subject].count--,delete y[t.payload.subject][t.payload.type][t.payload.number],0==y[t.payload.subject].count&&delete y[t.payload.subject],v.classes=y,v;case z:var g=Object(x.a)({},e);return g.view=t.payload,g;default:var w=Object(x.a)({},e);return w.loading=!1,w}})),H=function(){return{type:R}},J=function(e,t){return{type:A,payload:{name:e,content:t}}},Q=function(e){return{type:F,payload:e}},X=function(e){return{type:N,payload:e}},K=function(){return{type:_}},W=function(e){return{type:L,payload:e}},Z=function(e){return{type:D,payload:e}},$=function(e){return{type:T,payload:e}},ee=function(e){return{type:P,payload:e}},te=function(e){return{type:E,payload:e}},ne=function(e){return{type:M,payload:e}},ae=function(e,t){return{type:q,payload:{subject:e,shifts:t}}},re=function(e,t,n){return{type:Y,payload:{subject:e,type:t,number:n}}},ce=function(e,t,n){return{type:G,payload:{subject:e,type:t,number:n}}},se=function(e){return{type:z,payload:e}},ie=function(){return{type:B}};function oe(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(O.d)(R,p.a.mark((function e(){var t,n,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(t={all:[],chosen:(new Date).getMonth()>=9?(new Date).getFullYear()+1:(new Date).getFullYear()},n=t.chosen;n>=2015;n--)t.all.push(n);return e.next=4,Object(O.b)(Q(t));case 4:return e.next=6,Object(O.b)(K());case 6:return e.next=8,Object(O.c)((function(e){return e.redux.classes}));case 8:if(a=e.sent,!Array.isArray(a)){e.next=12;break}return e.next=12,Object(O.b)(J("classes",{}));case 12:return e.next=14,Object(O.c)((function(e){return e.redux.view}));case 14:if("chosen"==e.sent){e.next=18;break}return e.next=18,Object(O.b)(J("view",void 0));case 18:case"end":return e.stop()}}),e)})));case 2:return e.next=4,Object(O.d)(_,p.a.mark((function e(){var t,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.get(g.departments());case 2:return t=e.sent,n=t.data,e.next=6,Object(O.b)(W(n));case 6:case"end":return e.stop()}}),e)})));case 4:return e.next=6,Object(O.d)(D,p.a.mark((function e(t){var n,a,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.payload,e.next=3,w(n);case 3:return a=e.sent,r=a.data,e.next=7,Object(O.b)($(r.classes));case 7:case"end":return e.stop()}}),e)})));case 6:return e.next=8,Object(O.d)(N,p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.payload,e.next=3,Object(O.c)((function(e){return e.redux.subject.chosen}));case 3:return n=e.sent,e.next=6,Object(O.b)(ee(Object.keys(n)));case 6:case"end":return e.stop()}}),e)})));case 8:return e.next=10,Object(O.d)(P,p.a.mark((function e(t){var n,a,r,c,s,i,o,u,d,b,j;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.payload,a=0;case 2:if(!((r=Array.isArray(n)?n[a++]:n)>0)){e.next=22;break}return e.next=6,k(r);case 6:return c=e.sent,s=c.data,i=s,o=s.instances,e.next=12,Object(O.c)((function(e){return e.redux.year.chosen}));case 12:for(u=e.sent,d=!1,b=void 0,j=0;!d&&j<o.length;j++)o[j].year==u&&(b=o[j].id,d=!0);if(!b){e.next=20;break}return e.delegateYield(p.a.mark((function e(){var t,n,a,c,s,o,u;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(O.b)(te(i));case 2:return(t=Object(x.a)({},i)).credits=t.credits/2,delete t.instances,delete t.url,e.next=8,C(b);case 8:return n=e.sent,a=n.data,c=a,s={t:{},to:{},tp:{},tpo:{},p:{},po:{}},e.next=14,w(t.department.id);case 14:return o=e.sent,u=o.data.building.abbreviation,c.map((function(e){var n=Object(x.a)({},e);delete n.teachers,delete n.url;for(var a=0;a<n.instances.length;a++)n.instances[a].duration=n.instances[a].duration/30,n.instances[a].room=n.instances[a].room?u+" "+n.instances[a].room:void 0;var r=e.type_display.indexOf("Te\xf3rico-Pr\xe1tico")>=0?"TP":e.type_display.indexOf("Te\xf3rico")>=0?"T":"P";e.type_display.indexOf("Online")>=0&&(r+="O"),n.type={name:r,title:e.type_display},delete n.type_display,s[r.toLowerCase()][e.number]={subject:t,shift:n}})),e.next=19,Object(O.b)(ae(r,s));case 19:case"end":return e.stop()}}),e)}))(),"t0",18);case 18:e.next=22;break;case 20:return e.next=22,Object(O.b)(ne(r));case 22:if(Array.isArray(n)&&a<=n.length){e.next=2;break}case 23:return e.next=25,Object(O.b)(ie());case 25:case"end":return e.stop()}}),e)})));case 10:case"end":return e.stop()}}),S)}var ue=p.a.mark(be),de=Object(f.c)({redux:V});function be(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(O.a)([oe()]);case 2:case"end":return e.stop()}}),ue)}var je=Object(b.a)(),le=[].concat(Object(u.a)(Object(d.b)({immutableCheck:!1,serializableCheck:!1,thunk:!0})),[je]),he=Object(d.a)({reducer:de,middleware:le,devTools:!1,enhancers:[j.reduxBatch]}),pe=Object(l.b)(he);je.run(be);var Oe=he,fe=n(9),xe=n(45),me=(n(80),n(81),n(0)),ve=function(e){var t=e.name,n=e.logo,a=e.years,r=e.year,c=e.departments,s=e.department,i=e.subjects,o=e.subject,u=Object(fe.b)(),d=Object(fe.c)((function(e){return e.redux.view})),b=function(e){u(X(e))},j=function(e){u(se(e))},l=Object.values(o).sort((function(e,t){return e.abbreviation>t.abbreviation}));return Object(me.jsxs)(me.Fragment,{children:[Object(me.jsxs)("div",{id:"topMenu",children:[Object(me.jsxs)("span",{children:[Object(me.jsx)("img",{src:n}),Object(me.jsx)("h1",{children:t})]}),Object(me.jsxs)("span",{children:[Object(me.jsxs)("select",{value:r,onChange:function(e){return b(e.target.value)},children:[Object(me.jsx)("option",{disabled:!0,selected:!0,children:"Escolher Ano Letivo"}),a.map((function(e){return Object(me.jsx)("option",{value:e,children:e})}))]}),Object(me.jsxs)("select",{value:s,onChange:function(e){return function(e){u(Z(e))}(e.target.value)},children:[Object(me.jsx)("option",{disabled:!0,selected:!0,children:"Escolher Departamento"}),c.map((function(e){return Object(me.jsx)("option",{value:e.id,children:e.name})}))]}),Object(me.jsxs)("select",{onChange:function(e){return function(e){u(ee(e))}(e.target.value)},children:[Object(me.jsx)("option",{value:-1,selected:!0,children:"Adicionar Cadeira"}),i.map((function(e){return o[e.id]?Object(me.jsx)(me.Fragment,{}):Object(me.jsx)("option",{value:e.id,children:e.name})}))]})]})]}),Object(me.jsxs)("div",{id:"subTopMenu",children:[Object(me.jsx)("div",{id:"subjects",children:l.map((function(e){return Object(me.jsxs)("div",{title:e.name,children:[e.abbreviation,Object(me.jsx)("span",{onClick:function(){return function(e){u(ne(e))}(e.id)},children:"X"})]})}))}),Object(me.jsxs)("div",{id:"menu",children:[Object(me.jsx)("div",{className:"option",id:"update",onClick:function(){return b(r)},children:Object(me.jsx)("span",{children:"\u21ba Atualizar"})}),Object(me.jsxs)("div",{id:"view",children:[Object(me.jsx)("span",{className:void 0==d?"active":"",onClick:function(){return j(void 0)},children:"Escolher"}),Object(me.jsx)("span",{className:"chosen"==d?"active":"",onClick:function(){return j("chosen")},children:"Escolhido"})]})]})]})]})},ye={name:"Simulador de Hor\xe1rios",logo:"./logo.png"},ge=function(){var e=Object(fe.c)((function(e){return e.redux.year.all})),t=Object(fe.c)((function(e){return e.redux.year.chosen})),n=Object(fe.c)((function(e){return e.redux.department.all})),a=Object(fe.c)((function(e){return e.redux.department.chosen})),r=Object(fe.c)((function(e){return e.redux.subject.all})),c=Object(fe.c)((function(e){return e.redux.subject.chosen}));return Object(me.jsx)(ve,{name:ye.name,logo:ye.logo,years:e,year:t,departments:n,department:a,subjects:r,subject:c})},we=(n(83),n(28)),ke=n.n(we),Ce=(n(84),function(e){for(var t=e.times,n=[],a=0;a<t-1;a++)n.push(1);return Object(me.jsxs)(me.Fragment,{children:[n.map((function(e){return Object(me.jsx)("td",{})})),Object(me.jsx)("td",{className:"with-right-border"})]})}),Se=function(e){var t=e.maxClasses,n=e.hours,a=e.classes,r=e.filled,c=e.chosenClasses,s=Object(fe.b)(),i=function(e,t,n){c[e]&&c[e][t]&&c[e][t][n]?s(ce(e,t,n)):s(re(e,t,n))};return Object(me.jsx)(me.Fragment,{children:Object(me.jsxs)("table",{id:"timetable",className:"timetable",children:[Object(me.jsx)("thead",{children:Object(me.jsxs)("tr",{children:[Object(me.jsx)("th",{children:"Hora"}),Object(me.jsx)("th",{colSpan:t[0],children:"2\xaa"}),Object(me.jsx)("th",{colSpan:t[1],children:"3\xaa"}),Object(me.jsx)("th",{colSpan:t[2],children:"4\xaa"}),Object(me.jsx)("th",{colSpan:t[3],children:"5\xaa"}),Object(me.jsx)("th",{colSpan:t[4],children:"6\xaa"})]})}),Object(me.jsx)("tbody",{children:n.map((function(e){return Object(me.jsxs)("tr",{children:[Object(me.jsxs)("td",{children:[-1==(e/60).toString().indexOf(".5")?parseInt(e/60)<10?"0"+parseInt(e/60):parseInt(e/60):parseInt(e/60)+1<10?"0"+(parseInt(e/60)+1):parseInt(e/60)+1,":00"]}),[0,1,2,3,4].map((function(s){return Object(me.jsxs)(me.Fragment,{children:[r[n.indexOf(e)][s]?a[n.indexOf(e)][s].sort((function(e,t){return e.subject.abbreviation!=t.subject.abbreviation?e.subject.abbreviation>t.subject.abbreviation:e.shift.number>t.shift.number})).map((function(e){return Object(me.jsxs)("td",{rowSpan:e.shift.duration,className:"class ".concat(e.shift.type.name.toLowerCase()," ").concat(e.subject.id,"-").concat(e.shift.type.name.toLowerCase(),"-").concat(e.shift.number),onMouseOver:function(){return t=e.subject.id+"-"+e.shift.type.name.toLowerCase()+"-"+e.shift.number,void ke()("."+t).addClass("hover");var t},onMouseLeave:function(){return t=e.subject.id+"-"+e.shift.type.name.toLowerCase()+"-"+e.shift.number,void ke()("."+t).removeClass("hover");var t},children:[c[e.subject.id]&&c[e.subject.id][e.shift.type.name.toLowerCase()]&&c[e.subject.id][e.shift.type.name.toLowerCase()][e.shift.number]?Object(me.jsx)("div",{className:"save",title:"Remover",onClick:function(){return i(e.subject.id,e.shift.type.name.toLowerCase(),e.shift.number)},children:"\u2715"}):Object(me.jsx)("div",{className:"save",title:"Guardar",onClick:function(){return i(e.subject.id,e.shift.type.name.toLowerCase(),e.shift.number)},children:"\u2605"}),Object(me.jsx)("h3",{children:Object(me.jsx)("span",{title:e.subject.name,children:e.subject.abbreviation})}),Object(me.jsxs)("p",{children:[Object(me.jsxs)("span",{title:e.shift.type.title+" "+e.shift.number,children:[e.shift.type.name," ",e.shift.number]}),Object(me.jsx)("br",{}),e.shift.room]})]})})):Object(me.jsx)(Ce,{times:t[s]-r[n.indexOf(e)][s]}),t[s]>r[n.indexOf(e)][s]&&r[n.indexOf(e)][s]?Object(me.jsx)(Ce,{times:t[s]-r[n.indexOf(e)][s]}):Object(me.jsx)(me.Fragment,{})]})}))]})}))})]})})},Re=function(){for(var e=Object(fe.c)((function(e){return e.redux.shifts})),t=Object(fe.c)((function(e){return e.redux.classes})),n=Object(fe.c)((function(e){return e.redux.view})),a=[],r=8;r<=23.5;r+=.5)a.push(60*r);var c=[],s=[];a.map((function(){var e=[],t=[];[1,2,3,4,5].map((function(){e.push([]),t.push(0)})),c.push(e),s.push(t)}));var i=[1,1,1,1,1],o="chosen"==n?t:e;return Object.keys(o).map((function(e){Object.keys(o[e]).map((function(t){Object.keys(o[e][t]).map((function(n){var r=o[e][t][n];r.shift.instances.map((function(e){c[a.indexOf(e.start)][e.weekday].push({subject:r.subject,shift:Object(x.a)(Object(x.a)({},e),{},{number:r.shift.number,type:r.shift.type})});for(var t=a.indexOf(e.start);t<a.indexOf(e.start)+e.duration;t++)s[t][e.weekday]++,i[e.weekday]=Math.max(i[e.weekday],s[t][e.weekday])}))}))}))})),Object(me.jsx)("div",{id:"content",children:Object(me.jsx)(Se,{maxClasses:i,hours:a,classes:c,filled:s,chosenClasses:t})})},Ae=(n(85),function(){return Object(me.jsx)("div",{className:"loaderContainer",children:Object(me.jsx)("div",{className:"loader"})})}),Fe=(n(86),n(18)),Ne=function(){return Object(me.jsxs)("div",{id:"footer",children:[Object(me.jsx)("img",{id:"logo",src:"/logo.png"}),Object(me.jsx)("div",{id:"menu",children:Object(me.jsxs)(Fe.b,{to:"/about",className:"option",children:[Object(me.jsx)("ion-icon",{name:"information-circle"}),"Sobre"]})})]})},_e=function(){return Object(me.jsx)(Ne,{})},Le=n(31),De=function(){Le.a.initialize("UA-190799873-1"),Le.a.pageview(window.location.pathname+window.location.search);var e=Object(fe.b)(),t=Object(fe.c)((function(e){return e.redux.loading}));return Object(a.useEffect)((function(){e(H())}),[]),Object(me.jsxs)(me.Fragment,{children:[Object(me.jsx)(ge,{}),Object(me.jsx)(Re,{}),Object(me.jsx)(_e,{}),t?Object(me.jsx)(Ae,{}):Object(me.jsx)(me.Fragment,{})]})},Ie=(n(88),n(8)),Te=(n(89),function(){return Object(me.jsx)("div",{id:"about",children:Object(me.jsxs)("div",{id:"content",children:[Object(me.jsxs)("div",{className:"header",children:[Object(me.jsx)("h2",{children:"Sobre"}),Object(me.jsx)(Fe.b,{id:"close",to:"/",children:"\u2715"})]}),Object(me.jsxs)("div",{className:"content",children:[Object(me.jsx)("h4",{children:"Objetivo"}),"Permitir a simula\xe7\xe3o de hor\xe1rios da ",Object(me.jsx)("a",{href:"https://www.fct.unl.pt/",target:"_blank",children:"NOVA School of Science and Technology | FCT NOVA"}),".",Object(me.jsx)("h4",{children:"Contribuir"}),"Quaisquer sugest\xf5es de melhoria s\xe3o sempre bem vindas!",Object(me.jsx)("br",{}),"O c\xf3digo que permite p\xf4r esta plataforma em funcionamento est\xe1 dispon\xedvel ",Object(me.jsx)("a",{href:"https://github.com/4lexcorrei4/simulador_horarios",target:"_blank",children:"aqui"}),".",Object(me.jsx)("br",{}),"Podes contribuir e ajudar sempre que quiseres, sempre segundo a licensa ",Object(me.jsx)("a",{href:"https://github.com/4lexcorrei4/simulador_horarios/blob/master/LICENSE",target:"_blank",children:"GPLv3"}),".",Object(me.jsx)("h4",{children:"Contacto"}),"Para me contactares basta enviares mensagem por uma das redes sociais dispon\xedveis ",Object(me.jsx)("a",{href:"https://bitsys.tech/",target:"_blank",children:"aqui"}),".",Object(me.jsx)("h4",{children:"Desenvolvedor"}),Object(me.jsx)("a",{href:"https://bitsys.tech/",target:"_blank",children:"Alexandre Correia"}),Object(me.jsx)("h4",{children:"Cr\xe9ditos"}),"Frameworks e servi\xe7os usados:",Object(me.jsxs)("ul",{children:[Object(me.jsxs)("li",{children:[Object(me.jsx)("a",{href:"https://reactjs.org/",target:"_blank",children:"React"}),": Front-end"]}),Object(me.jsxs)("li",{children:[Object(me.jsx)("a",{href:"https://supernova.nunl.pt/",target:"_blank",children:"Supernova"}),": Acesso aos conte\xfados"]})]})]})]})})});var Pe=function(){return o.a,Object(me.jsx)(fe.a,{store:Oe,children:Object(me.jsx)(xe.a,{persistor:pe,loading:null,children:Object(me.jsxs)(Fe.a,{children:[Object(me.jsx)(De,{}),Object(me.jsx)(Ie.c,{children:Object(me.jsx)(Ie.a,{path:"/about",children:Object(me.jsx)(Te,{})})})]})})})},Ee=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,91)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};s.a.render(Object(me.jsx)(r.a.StrictMode,{children:Object(me.jsx)(Pe,{})}),document.getElementById("root")),Ee()}},[[90,1,2]]]);
//# sourceMappingURL=main.b5811b21.chunk.js.map