import{a as A,b as U}from"./chunk-VGFKE3TT.js";import"./chunk-LUOTSRTK.js";import{C as L,G as j,H as N,f as v,k as F,t as O,z as I}from"./chunk-SDJKY3TK.js";import"./chunk-WJ5UF3SW.js";import{Fb as W,O as w,Oa as e,Ob as S,P as _,Pa as n,Ta as d,cb as t,db as T,gb as f,hb as D,ib as g,oa as u,sa as B,wa as P,xa as C}from"./chunk-YFS674CC.js";var E={m:[120432,120822],b:[119808,120782],i:[119860,48],bi:[119912,48],c:[119964,48],bc:[120016,48],f:[120068,48],d:[120120,120792],bf:[120172,48],s:[120224,120802],bs:[120276,120812],is:[120328,48],bis:[120380,48],bg:[120488,48],gi:[120546,48],bgi:[120604,48]},k={m:{" ":8192,"-":8211},i:{h:8462},f:{C:8493,H:8460,I:8465,R:8476,Z:8488}},m="m",M=!1,b=!1,J="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",K="0123456789",G={monospace:"m",script:"c",fraktur:"f",double:"d",sans:"s",greek:"g"},h={bold:"b",italic:"i",underline:"u",strike:"k"},R={doublestruck:"double","double-struck":"double",sansserif:"sans","sans-serif":"sans"},Q=`---- Monotext Help ----
Converts text to a unicode variant

Usage:
    monotext [flags] [text]
Use with a pipe:
    cat file | monotext [flags]

Flags:
  Types:
    -monospace -m   Monospace text (default)
    -script    -c   Script (!)
    -fraktur   -f   Fraktur (!)
    -double    -d   Double-struck (!)
    -sans      -s   Sans-serif
    -greek     -g   Greek (characters might not yield their respective greek version)
                    This doesn't have a regular version!

    (!): Some characters do not exist in the regular version of this set (i.e. without bold/italic)

  Modifiers:
    -bold      -b   Bold
        Can be used with: script, fraktur, sans and greek
        Serif is used when no type is specified
    -italic    -i   Italic
        Can be used with: sans and greek
        Serif is used when no type is specified
    -underline -u   Underline
        Can be used with any
    -strike    -k   Strike-through
        Can be used with any
`,H=(()=>{class a{convert(l,s){let i="";for(let r of l){let o,p=r;if(k[m]&&k[m].hasOwnProperty(p)){let c=k[m][p];p=String.fromCodePoint(c)}m&&(o=J.indexOf(p))>-1?i+=String.fromCodePoint(o+E[m][0]):m&&(o=K.indexOf(p))>-1?i+=String.fromCodePoint(o+E[m][1]):i+=p,M&&(i+="\u0332"),b&&(i+="\u0336")}return i}mono(l,s){let i="",r=[],o=[],p=!0;for(let x in l)if(l[x][0]==="-"&&p){let c=l[x].replace(/^-+/,""),z=c.split("").sort().join("");if(c in R)c=R[c];else if(c in G)r.push(G[c]);else if(c in h)r.push(h[c]);else{if(c==="help")return i=Q,i;r=r.concat(z.split(""))}}else p=!1,o.push(l[x]);return r.includes(h.underline)&&(r.splice(r.indexOf(h.underline),1),M=!0),r.includes(h.strike)&&(r.splice(r.indexOf(h.strike),1),b=!0),m=r.sort().join(""),!E.hasOwnProperty(m)&&!M&&!b?(i=`No such combination: ${m}. Check help text below.`,i):(!M&&!b&&!m&&(m="m"),i=this.convert(s,!0),i)}static{this.\u0275fac=function(s){return new(s||a)}}static{this.\u0275prov=w({token:a,factory:a.\u0275fac,providedIn:"root"})}}return a})();var Z=(()=>{class a{constructor(l){this.monoService=l,this.result="",this.textInput="hi",this.flags={monospace:!0,script:!1,fraktur:!1,double:!1,sans:!1,greek:!1},this.flags2={bold:!1,italic:!1,underline:!1,strike:!1}}ngOnInit(){this.render()}setText(l){this.textInput=l?.target?.value,this.render()}render(){let l=[];for(let s in this.flags)this.flags[s]&&l.push("-"+s);for(let s in this.flags2)this.flags2[s]&&l.push("-"+s);this.result=this.monoService.mono(l,this.textInput)}static{this.\u0275fac=function(s){return new(s||a)(B(H))}}static{this.\u0275cmp=P({type:a,selectors:[["app-monotext"]],standalone:!1,decls:131,vars:11,consts:[[1,"grid-wrap"],["appearance","fill",1,"full-height"],["matInput","",1,"textarea-input",3,"keydown"],[1,"result"],[1,"flags"],[3,"ngModelChange","change","ngModel"],[1,"flags2"],[1,"tbs"],["align","left"],["align","center"],["href","https://github.com/MightyPork/monotext"]],template:function(s,i){s&1&&(e(0,"h1"),t(1,"Convert string to monotext"),n(),e(2,"p"),t(3,"A small utility for converting text to a unicode variant."),n(),e(4,"div",0)(5,"mat-form-field",1)(6,"mat-label"),t(7,"Enter text to convert"),n(),e(8,"textarea",2),d("keydown",function(o){return i.setText(o)}),n()(),e(9,"div",3),t(10),n(),e(11,"div",4)(12,"div"),t(13,"Types:"),n(),e(14,"mat-checkbox",5),g("ngModelChange",function(o){return D(i.flags.monospace,o)||(i.flags.monospace=o),o}),d("change",function(){return i.render()}),t(15,"Monospace"),n(),e(16,"mat-checkbox",5),g("ngModelChange",function(o){return D(i.flags.script,o)||(i.flags.script=o),o}),d("change",function(){return i.render()}),t(17,"Script"),n(),e(18,"mat-checkbox",5),g("ngModelChange",function(o){return D(i.flags.fraktur,o)||(i.flags.fraktur=o),o}),d("change",function(){return i.render()}),t(19,"Fraktur"),n(),e(20,"mat-checkbox",5),g("ngModelChange",function(o){return D(i.flags.double,o)||(i.flags.double=o),o}),d("change",function(){return i.render()}),t(21,"Double"),n(),e(22,"mat-checkbox",5),g("ngModelChange",function(o){return D(i.flags.sans,o)||(i.flags.sans=o),o}),d("change",function(){return i.render()}),t(23,"Sans"),n(),e(24,"mat-checkbox",5),g("ngModelChange",function(o){return D(i.flags.greek,o)||(i.flags.greek=o),o}),d("change",function(){return i.render()}),t(25,"Greek"),n()(),e(26,"div",6)(27,"div"),t(28,"Modifiers:"),n(),e(29,"mat-checkbox",5),g("ngModelChange",function(o){return D(i.flags2.bold,o)||(i.flags2.bold=o),o}),d("change",function(){return i.render()}),t(30,"Bold"),n(),e(31,"mat-checkbox",5),g("ngModelChange",function(o){return D(i.flags2.italic,o)||(i.flags2.italic=o),o}),d("change",function(){return i.render()}),t(32,"Italic"),n(),e(33,"mat-checkbox",5),g("ngModelChange",function(o){return D(i.flags2.underline,o)||(i.flags2.underline=o),o}),d("change",function(){return i.render()}),t(34,"Underline"),n(),e(35,"mat-checkbox",5),g("ngModelChange",function(o){return D(i.flags2.strike,o)||(i.flags2.strike=o),o}),d("change",function(){return i.render()}),t(36,"Strike"),n()()(),e(37,"h2"),t(38,"Examples:"),n(),e(39,"table",7)(40,"thead")(41,"tr")(42,"th",8),t(43,"Flag"),n(),e(44,"th",9),t(45,"Short"),n(),e(46,"th",8),t(47,"Description"),n(),e(48,"th",8),t(49,"Example"),n()()(),e(50,"tbody")(51,"tr")(52,"td",8),t(53,"monospace"),n(),e(54,"td",9),t(55,"m"),n(),e(56,"td",8),t(57,"Monospace text (default)"),n(),e(58,"td",8),t(59,"\u{1D67C}\u{1D698}\u{1D697}\u{1D698}\u{1D69C}\u{1D699}\u{1D68A}\u{1D68C}\u{1D68E}\u2002\u{1D69D}\u{1D68E}\u{1D6A1}\u{1D69D}!"),n()(),e(60,"tr")(61,"td",8),t(62,"script"),n(),e(63,"td",9),t(64,"c"),n(),e(65,"td",8),t(66,"Script "),n(),e(67,"td",8),t(68,"\u{1D4BB}\u{1D4B6}\u{1D4C3}\u{1D4B8}\u{1D4CE} \u{1D4C8}\u{1D4B8}\u{1D4C7}\u{1D4BE}\u{1D4C5}\u{1D4C9}"),n()(),e(69,"tr")(70,"td",8),t(71,"fraktur"),n(),e(72,"td",9),t(73,"f"),n(),e(74,"td",8),t(75,"Fraktur "),n(),e(76,"td",8),t(77,"\u{1D516}\u{1D52D}\u{1D529}\u{1D522}\u{1D52B}\u{1D521}\u{1D526}\u{1D521} \u{1D523}\u{1D52F}\u{1D51E}\u{1D528}\u{1D531}\u{1D532}\u{1D52F}"),n()(),e(78,"tr")(79,"td",8),t(80,"double"),n(),e(81,"td",9),t(82,"d"),n(),e(83,"td",8),t(84,"Double-struck "),n(),e(85,"td",8),t(86,"\u{1D53B}\u{1D560}\u{1D566}\u{1D553}\u{1D55D}\u{1D556}-\u{1D564}\u{1D565}\u{1D563}\u{1D566}\u{1D554}\u{1D55C}"),n()(),e(87,"tr")(88,"td",8),t(89,"sans"),n(),e(90,"td",9),t(91,"s"),n(),e(92,"td",8),t(93,"Sans-serif"),n(),e(94,"td",8),t(95,"\u{1D5B2}\u{1D5BA}\u{1D5C7}\u{1D5CC}. \u{1D5B2}\u{1D5BE}\u{1D5CB}\u{1D5C2}\u{1D5BF}\u{1D5CC}."),n()(),e(96,"tr")(97,"td",8),t(98,"greek"),n(),e(99,"td",9),t(100,"g"),n(),e(101,"td",8),t(102,"Greek"),e(103,"sup"),t(104,"1"),n()(),e(105,"td",8),t(106,"\u{1D6C2}\u{1D6D4}\u{1D6C5}\u{1D6C7}\u{1D6C8}\u{1D6C9}\u{1D6CB}\u{1D6CC}"),n()(),e(107,"tr")(108,"td",8),t(109,"bold"),n(),e(110,"td",9),t(111,"b"),n(),e(112,"td",8),t(113,"Bold (modifier)"),n(),e(114,"td",8),t(115,"\u{1D41B}\u{1D4F8}\u{1D591}\u{1D6C5} \u{1D601}\u{1D5F2}\u{1D605}\u{1D601}"),n()(),e(116,"tr")(117,"td",8),t(118,"italic"),n(),e(119,"td",9),t(120,"i"),n(),e(121,"td",8),t(122,"Italic (modifier)"),e(123,"sup"),t(124,"2"),n()(),e(125,"td",8),t(126,"\u{1D456}\u{1D635}\u{1D6FC}\u{1D459}\u{1D62A}\u{1D450}"),n()()()(),e(127,"pre"),t(128,`---- Monotext Help ----
Converts text to a unicode variant

Usage:
    Select Type ans Modifier

    Types:
    Monospace text (default)
    Script (!)
    Fraktur (!)
    Double-struck (!)
    Sans-serif
    Greek (characters might not yield their respective greek version. Doesn't have a regular version!

    (!): Some characters do not exist in the regular version of this set (i.e. without bold/italic)

    Modifiers:
    Bold
        Can be used with: script, fraktur, sans and greek
        Serif is used when no type is specified
    Italic
        Can be used with: sans and greek
        Serif is used when no type is specified
    Underline
        Can be used with any
    Strike-through
        Can be used with any
`),n(),e(129,"a",10),t(130,"Based on MightyPork/monotext"),n()),s&2&&(u(10),T(i.result),u(4),f("ngModel",i.flags.monospace),u(2),f("ngModel",i.flags.script),u(2),f("ngModel",i.flags.fraktur),u(2),f("ngModel",i.flags.double),u(2),f("ngModel",i.flags.sans),u(2),f("ngModel",i.flags.greek),u(5),f("ngModel",i.flags2.bold),u(2),f("ngModel",i.flags2.italic),u(2),f("ngModel",i.flags2.underline),u(2),f("ngModel",i.flags2.strike))},dependencies:[v,F,A,j,L,I],styles:["[_nghost-%COMP%]{display:block;padding:1rem}pre[_ngcontent-%COMP%]{font-family:monospace}.grid-wrap[_ngcontent-%COMP%]{display:grid;gap:1rem;grid-template-columns:1fr;grid-template-rows:1fr 1fr;background-color:#fafafa;padding:1rem;border:1px solid #eee}.flags[_ngcontent-%COMP%], .flags2[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr}.textarea-input[_ngcontent-%COMP%]{height:100%}h2[_ngcontent-%COMP%]{margin:1rem}.tbs[_ngcontent-%COMP%]{margin-top:1rem}.tbs[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#eee}.tbs[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .tbs[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border:1px solid #eee;padding:.3rem}"]})}}return a})();var X=[{path:"",component:Z}],q=(()=>{class a{static{this.\u0275fac=function(s){return new(s||a)}}static{this.\u0275mod=C({type:a})}static{this.\u0275inj=_({imports:[S.forChild(X),S]})}}return a})();var fe=(()=>{class a{static{this.\u0275fac=function(s){return new(s||a)}}static{this.\u0275mod=C({type:a})}static{this.\u0275inj=_({imports:[W,q,O,U,N]})}}return a})();export{fe as MonotextModule};
