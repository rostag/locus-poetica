"use strict";(self.webpackChunkpoetry_gen=self.webpackChunkpoetry_gen||[]).push([[651],{3651:(Z,c,a)=>{a.r(c),a.d(c,{LatynizatorModule:()=>b});var m=a(6895),r=a(4006),p=a(9549),d=a(4144),y=a(3327),s=a(1772),f=a(7947),t=a(4650);function g(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"div",8)(1,"span",9),t._uU(2),t.qZA(),t.TgZ(3,"span",10),t._uU(4,"\u2192"),t.qZA(),t.TgZ(5,"input",11),t.NdJ("input",function(u){const z=t.CHM(e).index,x=t.oxw();return t.KtG(x.updateReplacement(u,z))}),t.qZA()()}if(2&n){const e=i.$implicit;t.xp6(2),t.Oqu(e[0]),t.xp6(3),t.Q6J("value",e[1])}}const h=[{path:"",component:(()=>{class n{constructor(e){this.fb=e,this.replacements=Object.entries(s.a)}ngOnInit(){const e=this.fb.control("\u041d\u0435 \u0436\u0443\u0440\u044e\u0441\u044c \u044f, \u0430 \u043d\u0435 \u0441\u043f\u0438\u0442\u044c\u0441\u044f\n\u0427\u0430\u0441\u043e\u043c \u0434\u043e \u043f\u0456\u0432\u043d\u043e\u0447\u0456,\n\u0423\u0441\u0435 \u0441\u0432\u0456\u0442\u044f\u0442\u044c \u0442\u0456 \u0431\u043b\u0438\u0441\u043a\u0443\u0447\u0456\n\u0422\u0432\u043e\u0457 \u0447\u043e\u0440\u043d\u0456 \u043e\u0447\u0456. ",r.kI.required);this.latForm=this.fb.group({text:e}),e.valueChanges.subscribe(o=>{this.updateOutput()}),requestAnimationFrame(()=>{this.updateOutput()})}switchDirection(){const e=this.replacements.map(o=>o.reverse());(0,s.E)(Object.fromEntries(e)),this.replacements=Object.entries(s.a),this.updateOutput()}updateReplacement(e,o){s.a[this.replacements[o][0]]=e.target.value,this.updateOutput()}updateOutput(){this.output=(0,f.WG)(this.latForm.get("text")?.value)}setCopyBox(e){const o=document.createElement("textarea");o.style.position="fixed",o.style.left="0",o.style.top="0",o.style.opacity="0",o.value=e,document.body.appendChild(o),o.focus(),o.select(),document.execCommand("copy"),document.body.removeChild(o)}copyToClipboard(e){e.stopPropagation(),this.setCopyBox(this.output)}replacementsToClipboard(e){e.stopPropagation(),this.setCopyBox(JSON.stringify(s.a,null,2))}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(r.QS))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-latynizator"]],decls:27,vars:3,consts:[[1,"latynize-form",3,"formGroup"],["appearance","fill",1,"latynize-full-width"],["formControlName","text","matInput","","placeholder","\u041c\u0456\u0441\u0446\u0435 \u0434\u043b\u044f \u0442\u0435\u043a\u0441\u0442\u0443..."],["mat-raised-button","",1,"copy-button",3,"click"],[1,"output"],["mat-raised-button","",3,"click"],[1,"replacements"],["class","r-row",4,"ngFor","ngForOf"],[1,"r-row"],[1,"character"],[1,"arrow"],["type","text",1,"replacement",3,"value","input"]],template:function(e,o){1&e&&(t.TgZ(0,"div")(1,"h1"),t._uU(2,"Latynizator"),t.qZA(),t.TgZ(3,"form",0)(4,"mat-form-field",1)(5,"mat-label"),t._uU(6,"Uveditj tekst ukra\u0457nsjkoju"),t.qZA(),t._UZ(7,"textarea",2),t.qZA()(),t.TgZ(8,"h2")(9,"span"),t._uU(10,"Tekst ukrajinsjkoju latynkoju:"),t.qZA(),t._uU(11,"\xa0"),t.TgZ(12,"button",3),t.NdJ("click",function(l){return o.copyToClipboard(l)}),t._uU(13," Skopijuvaty "),t.qZA()(),t.TgZ(14,"p",4),t._uU(15),t.qZA(),t.TgZ(16,"button",5),t.NdJ("click",function(){return o.switchDirection()}),t._uU(17,"Revers"),t.qZA(),t._UZ(18,"hr"),t.TgZ(19,"h2")(20,"span"),t._uU(21,"Tablycja zamin:"),t.qZA(),t._uU(22,"\xa0"),t.TgZ(23,"button",3),t.NdJ("click",function(l){return o.replacementsToClipboard(l)}),t._uU(24," Skopijuvaty Zaminy "),t.qZA()(),t.TgZ(25,"div",6),t.YNc(26,g,6,2,"div",7),t.qZA()()),2&e&&(t.xp6(3),t.Q6J("formGroup",o.latForm),t.xp6(12),t.Oqu(o.output),t.xp6(11),t.Q6J("ngForOf",o.replacements))},dependencies:[m.sg,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u,p.KE,p.hX,d.Nt],styles:["[_nghost-%COMP%]{flex:auto;margin:1em;display:block}.latynize-full-width[_ngcontent-%COMP%]{min-width:320px;display:block}.latynize-full-width[_ngcontent-%COMP%]   .mat-input-element[_ngcontent-%COMP%]{min-height:100px}h2[_ngcontent-%COMP%]{margin:1rem 0}.copy-button[_ngcontent-%COMP%]{padding:.2rem;font-weight:400}.replacements[_ngcontent-%COMP%]{font-size:large;display:flex;flex-wrap:wrap;justify-content:space-between;gap:.5rem;.r-row {flex: 3 3 100px; padding: .25rem 0 .25rem .5rem; font-size: 1.2rem; border-radius: .5rem; background-color: #eee; .character {font-weight: bold; width: 1.2rem; display: inline-block; text-align: center; color: #333;} .arrow {color: #777; width: 2.5rem; display: inline-block; text-align: center;} .replacement {font-size: 1.2rem; font-weight: bold; width: 1.5rem; display: inline-block; text-align: center; padding: .2rem; border: 1px solid #777; border-radius: 4px;}}}"]}),n})()}];let C=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[y.Bz.forChild(h),y.Bz]}),n})();class v{}let b=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({providers:[v],imports:[m.ez,r.UX,C,p.lN,d.c]}),n})()}}]);