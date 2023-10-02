"use strict";(self.webpackChunkservicio_cliente_app=self.webpackChunkservicio_cliente_app||[]).push([[767],{5767:(k,g,u)=>{u.r(g),u.d(g,{AccountModule:()=>F});var s=u(95),m=u(6814),a=u(5794),e=u(4946),d=u(3172);let Z=(()=>{var r;class n{constructor(i,t){this.router=i,this.accountService=t,this.accountService.userValue&&this.router.navigate(["/"])}}return(r=n).\u0275fac=function(i){return new(i||r)(e.Y36(a.F0),e.Y36(d.BR))},r.\u0275cmp=e.Xpm({type:r,selectors:[["ng-component"]],decls:2,vars:0,consts:[[1,"container","col-md-6","offset-md-3","mt-5"]],template:function(i,t){1&i&&(e.TgZ(0,"div",0),e._UZ(1,"router-outlet"),e.qZA())},dependencies:[a.lC],encapsulation:2}),n})();var v=u(1374);function h(r,n){1&r&&(e.TgZ(0,"div"),e._uU(1,"El Usuario es requerido"),e.qZA())}function b(r,n){if(1&r&&(e.TgZ(0,"div",11),e.YNc(1,h,2,0,"div",12),e.qZA()),2&r){const o=e.oxw();e.xp6(1),e.Q6J("ngIf",o.f.username.errors.required)}}function C(r,n){1&r&&(e.TgZ(0,"div"),e._uU(1,"La Contrase\xf1a es requerida"),e.qZA())}function q(r,n){if(1&r&&(e.TgZ(0,"div",11),e.YNc(1,C,2,0,"div",12),e.qZA()),2&r){const o=e.oxw();e.xp6(1),e.Q6J("ngIf",o.f.password.errors.required)}}function T(r,n){1&r&&e._UZ(0,"span",13)}const _=function(r){return{"is-invalid":r}};function N(r,n){1&r&&(e.TgZ(0,"div"),e._uU(1,"First Name is required"),e.qZA())}function J(r,n){if(1&r&&(e.TgZ(0,"div",14),e.YNc(1,N,2,0,"div",15),e.qZA()),2&r){const o=e.oxw();e.xp6(1),e.Q6J("ngIf",o.f.firstName.errors.required)}}function U(r,n){1&r&&(e.TgZ(0,"div"),e._uU(1,"Last Name is required"),e.qZA())}function I(r,n){if(1&r&&(e.TgZ(0,"div",14),e.YNc(1,U,2,0,"div",15),e.qZA()),2&r){const o=e.oxw();e.xp6(1),e.Q6J("ngIf",o.f.lastName.errors.required)}}function Y(r,n){1&r&&(e.TgZ(0,"div"),e._uU(1,"Username is required"),e.qZA())}function x(r,n){if(1&r&&(e.TgZ(0,"div",14),e.YNc(1,Y,2,0,"div",15),e.qZA()),2&r){const o=e.oxw();e.xp6(1),e.Q6J("ngIf",o.f.username.errors.required)}}function y(r,n){1&r&&(e.TgZ(0,"div"),e._uU(1,"Password is required"),e.qZA())}function R(r,n){1&r&&(e.TgZ(0,"div"),e._uU(1,"Password must be at least 6 characters"),e.qZA())}function Q(r,n){if(1&r&&(e.TgZ(0,"div",14),e.YNc(1,y,2,0,"div",15),e.YNc(2,R,2,0,"div",15),e.qZA()),2&r){const o=e.oxw();e.xp6(1),e.Q6J("ngIf",o.f.password.errors.required),e.xp6(1),e.Q6J("ngIf",o.f.password.errors.minlength)}}function S(r,n){1&r&&e._UZ(0,"span",16)}const l=function(r){return{"is-invalid":r}},w=[{path:"",component:Z,children:[{path:"login",component:(()=>{var r;class n{constructor(i,t,c,p,f){this.formBuilder=i,this.route=t,this.router=c,this.accountService=p,this.alertService=f,this.loading=!1,this.submitted=!1}ngOnInit(){this.form=this.formBuilder.group({username:["",s.kI.required],password:["",s.kI.required]})}get f(){return this.form.controls}onSubmit(){this.submitted=!0,this.alertService.clear(),!this.form.invalid&&(this.loading=!0,this.accountService.login(this.f.username.value,this.f.password.value).pipe((0,v.P)()).subscribe({next:()=>{this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl||"/")},error:i=>{this.alertService.error(i),this.loading=!1}}))}}return(r=n).\u0275fac=function(i){return new(i||r)(e.Y36(s.qu),e.Y36(a.gz),e.Y36(a.F0),e.Y36(d.BR),e.Y36(d.c9))},r.\u0275cmp=e.Xpm({type:r,selectors:[["ng-component"]],decls:19,vars:11,consts:[[1,"card"],[1,"card-header"],[1,"card-body"],[3,"formGroup","ngSubmit"],[1,"mb-3"],[1,"form-label"],["type","text","formControlName","username",1,"form-control",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["type","password","formControlName","password",1,"form-control",3,"ngClass"],[1,"btn","btn-primary",3,"disabled"],["class","spinner-border spinner-border-sm me-1",4,"ngIf"],[1,"invalid-feedback"],[4,"ngIf"],[1,"spinner-border","spinner-border-sm","me-1"]],template:function(i,t){1&i&&(e.TgZ(0,"div",0)(1,"h4",1),e._uU(2,"Login"),e.qZA(),e.TgZ(3,"div",2)(4,"form",3),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.TgZ(5,"div",4)(6,"label",5),e._uU(7,"Usuario"),e.qZA(),e._UZ(8,"input",6),e.YNc(9,b,2,1,"div",7),e.qZA(),e.TgZ(10,"div",4)(11,"label",5),e._uU(12,"Contrase\xf1a"),e.qZA(),e._UZ(13,"input",8),e.YNc(14,q,2,1,"div",7),e.qZA(),e.TgZ(15,"div")(16,"button",9),e.YNc(17,T,1,0,"span",10),e._uU(18," Login "),e.qZA()()()()()),2&i&&(e.xp6(4),e.Q6J("formGroup",t.form),e.xp6(4),e.Q6J("ngClass",e.VKq(7,_,t.submitted&&t.f.username.errors)),e.xp6(1),e.Q6J("ngIf",t.submitted&&t.f.username.errors),e.xp6(4),e.Q6J("ngClass",e.VKq(9,_,t.submitted&&t.f.password.errors)),e.xp6(1),e.Q6J("ngIf",t.submitted&&t.f.password.errors),e.xp6(2),e.Q6J("disabled",t.loading),e.xp6(1),e.Q6J("ngIf",t.loading))},dependencies:[m.mk,m.O5,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u],encapsulation:2}),n})()},{path:"register",component:(()=>{var r;class n{constructor(i,t,c,p,f){this.formBuilder=i,this.route=t,this.router=c,this.accountService=p,this.alertService=f,this.loading=!1,this.submitted=!1}ngOnInit(){this.form=this.formBuilder.group({firstName:["",s.kI.required],lastName:["",s.kI.required],username:["",s.kI.required],password:["",[s.kI.required,s.kI.minLength(6)]]})}get f(){return this.form.controls}onSubmit(){this.submitted=!0,this.alertService.clear(),!this.form.invalid&&(this.loading=!0,this.accountService.register(this.form.value).pipe((0,v.P)()).subscribe({next:()=>{this.alertService.success("Registration successful",{keepAfterRouteChange:!0}),this.router.navigate(["../login"],{relativeTo:this.route})},error:i=>{this.alertService.error(i),this.loading=!1}}))}}return(r=n).\u0275fac=function(i){return new(i||r)(e.Y36(s.qu),e.Y36(a.gz),e.Y36(a.F0),e.Y36(d.BR),e.Y36(d.c9))},r.\u0275cmp=e.Xpm({type:r,selectors:[["ng-component"]],decls:31,vars:19,consts:[[1,"card"],[1,"card-header"],[1,"card-body"],[3,"formGroup","ngSubmit"],[1,"mb-3"],[1,"form-label"],["type","text","formControlName","firstName",1,"form-control",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["type","text","formControlName","lastName",1,"form-control",3,"ngClass"],["type","text","formControlName","username",1,"form-control",3,"ngClass"],["type","password","formControlName","password",1,"form-control",3,"ngClass"],[1,"btn","btn-primary",3,"disabled"],["class","spinner-border spinner-border-sm me-1",4,"ngIf"],["routerLink","../login",1,"btn","btn-link"],[1,"invalid-feedback"],[4,"ngIf"],[1,"spinner-border","spinner-border-sm","me-1"]],template:function(i,t){1&i&&(e.TgZ(0,"div",0)(1,"h4",1),e._uU(2,"Register"),e.qZA(),e.TgZ(3,"div",2)(4,"form",3),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.TgZ(5,"div",4)(6,"label",5),e._uU(7,"First Name"),e.qZA(),e._UZ(8,"input",6),e.YNc(9,J,2,1,"div",7),e.qZA(),e.TgZ(10,"div",4)(11,"label",5),e._uU(12,"Last Name"),e.qZA(),e._UZ(13,"input",8),e.YNc(14,I,2,1,"div",7),e.qZA(),e.TgZ(15,"div",4)(16,"label",5),e._uU(17,"Username"),e.qZA(),e._UZ(18,"input",9),e.YNc(19,x,2,1,"div",7),e.qZA(),e.TgZ(20,"div",4)(21,"label",5),e._uU(22,"Password"),e.qZA(),e._UZ(23,"input",10),e.YNc(24,Q,3,2,"div",7),e.qZA(),e.TgZ(25,"div")(26,"button",11),e.YNc(27,S,1,0,"span",12),e._uU(28," Register "),e.qZA(),e.TgZ(29,"a",13),e._uU(30,"Cancel"),e.qZA()()()()()),2&i&&(e.xp6(4),e.Q6J("formGroup",t.form),e.xp6(4),e.Q6J("ngClass",e.VKq(11,l,t.submitted&&t.f.firstName.errors)),e.xp6(1),e.Q6J("ngIf",t.submitted&&t.f.firstName.errors),e.xp6(4),e.Q6J("ngClass",e.VKq(13,l,t.submitted&&t.f.lastName.errors)),e.xp6(1),e.Q6J("ngIf",t.submitted&&t.f.lastName.errors),e.xp6(4),e.Q6J("ngClass",e.VKq(15,l,t.submitted&&t.f.username.errors)),e.xp6(1),e.Q6J("ngIf",t.submitted&&t.f.username.errors),e.xp6(4),e.Q6J("ngClass",e.VKq(17,l,t.submitted&&t.f.password.errors)),e.xp6(1),e.Q6J("ngIf",t.submitted&&t.f.password.errors),e.xp6(2),e.Q6J("disabled",t.loading),e.xp6(1),e.Q6J("ngIf",t.loading))},dependencies:[m.mk,m.O5,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,a.rH],encapsulation:2}),n})()}]}];let L=(()=>{var r;class n{}return(r=n).\u0275fac=function(i){return new(i||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[a.Bz.forChild(w),a.Bz]}),n})(),F=(()=>{var r;class n{}return(r=n).\u0275fac=function(i){return new(i||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[m.ez,s.UX,L]}),n})()}}]);