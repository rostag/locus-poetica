(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{DLCH:function(t,e,n){"use strict";n.r(e);var o=n("ofXK"),c=n("3Pt+"),r=n("kmnG"),i=n("qFsG"),a=n("tyNb"),l=n("xMJH"),s=n("fXoL");const p=[{path:"",component:(()=>{class t{constructor(t){this.fb=t}ngOnInit(){const t=this.fb.control("",c.C.required);this.latForm=this.fb.group({text:t}),t.valueChanges.subscribe(t=>{this.output=Object(l.c)(t)})}copyText(t){t.stopPropagation();const e=document.createElement("textarea");e.style.position="fixed",e.style.left="0",e.style.top="0",e.style.opacity="0",(new Date).toDateString(),document.body.appendChild(e),e.focus(),e.select(),document.execCommand("copy"),document.body.removeChild(e)}}return t.\u0275fac=function(e){return new(e||t)(s.Nb(c.f))},t.\u0275cmp=s.Hb({type:t,selectors:[["app-latynizator"]],decls:12,vars:2,consts:[[1,"latynize-form",3,"formGroup"],["appearance","fill",1,"latynize-full-width"],["formControlName","text","matInput","","placeholder","\u041c\u0456\u0441\u0446\u0435 \u0434\u043b\u044f \u0442\u0435\u043a\u0441\u0442\u0443..."],[1,"output"]],template:function(t,e){1&t&&(s.Sb(0,"div"),s.Sb(1,"h1"),s.xc(2," \u041b\u0430\u0442\u0438\u043d\u0456\u0437\u0430\u0442\u043e\u0440 "),s.Rb(),s.Sb(3,"form",0),s.Sb(4,"mat-form-field",1),s.Sb(5,"mat-label"),s.xc(6,"\u0422\u0435\u043a\u0441\u0442 \u0443\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u043e\u044e"),s.Rb(),s.Ob(7,"textarea",2),s.Rb(),s.Rb(),s.Sb(8,"h2"),s.xc(9," Latynized: "),s.Rb(),s.Sb(10,"p",3),s.xc(11),s.Rb(),s.Rb()),2&t&&(s.Bb(3),s.hc("formGroup",e.latForm),s.Bb(8),s.yc(e.output))},directives:[c.E,c.r,c.k,r.c,r.g,c.c,i.a,c.q,c.i],styles:["[_nghost-%COMP%]{flex:auto;margin:1em;display:block}.latynize-full-width[_ngcontent-%COMP%]{min-width:500px;height:200px;display:block}.latynize-full-width[_ngcontent-%COMP%]   .mat-input-element[_ngcontent-%COMP%]{min-height:100px}"]}),t})()}];let u=(()=>{class t{}return t.\u0275mod=s.Lb({type:t}),t.\u0275inj=s.Kb({factory:function(e){return new(e||t)},imports:[[a.d.forChild(p)],a.d]}),t})();class b{}n.d(e,"LatynizatorModule",(function(){return d}));let d=(()=>{class t{}return t.\u0275mod=s.Lb({type:t}),t.\u0275inj=s.Kb({factory:function(e){return new(e||t)},providers:[b],imports:[[o.c,c.y,u,r.e,i.b]]}),t})()}}]);