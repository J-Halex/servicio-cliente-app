import { Component ,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  AlertService } from '@app/services';
import { JbpmService } from '@app/services/jbpm.services';

@Component({
  selector: 'app-formulario-servicio',
  templateUrl: './formulario-servicio.component.html',
  styleUrls: ['./formulario-servicio.component.css']
})
export class FormularioServicioComponent {

  form!: FormGroup;
    id?: string;    
    clienteID: string = '';
    contactoNombre: string = '';
    contactoCelular: string = '';
    contactoEmail: string = '';
    motivo: string = '';
    funcionalidad: string = '';
    asunto: string = '';
    descripcion:string = '';
    loading = false;
    submitting = false;
    submitted = false;
    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private jbpmService: JbpmService,
      private alertService: AlertService
  ) { }
    ngOnInit() {
      

      // form with validation rules
      this.form = this.formBuilder.group({
        contactoNombre: ['', Validators.required],
        contactoCelular: ['', Validators.required],
        contactoEmail: ['', Validators.required],
        motivo: ['', Validators.required],
        funcionalidad: ['', Validators.required],
        asunto: ['', Validators.required],
        descripcion: ['', Validators.required],
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      // this.submitted = true;

      // // reset alerts on submit
      // this.alertService.clear();

      // // stop here if form is invalid
      // if (this.form.invalid) {
      //     return;
      // }
      // this.loading = true;
      // this.submitting = true;
      this.jbpmService.getContainer().subscribe(x => {
        console.log(x);
        this.loading = false;
    });
  }


}
