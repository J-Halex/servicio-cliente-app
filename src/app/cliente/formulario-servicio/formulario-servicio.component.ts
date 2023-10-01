import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, JbpmService } from '@app/services';
import { first, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-formulario-servicio',
  templateUrl: './formulario-servicio.component.html'
})
export class FormularioServicioComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private jbpmService: JbpmService
  ) { }

  ngOnInit() {
    // form with validation rules
    this.form = this.formBuilder.group({
      clienteID: ['', Validators.required],
      contactoNombre: ['', Validators.required],
      contactoCelular: ['', Validators.required],
      contactoEmail: ['', [Validators.required, Validators.email]],
      motivo: ['', Validators.required],
      funcionalidad: ['', Validators.required],
      asunto: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;

    const solicitud = this.form.value;
    this.startTask(solicitud);
  }

  async startTask(solicitud: any) {
    try {
      const processId = await firstValueFrom(this.jbpmService.startProcess());
      const tasks: any = await firstValueFrom(this.jbpmService.getTasksByProcessId(Number(processId)));
      const taskId: any = tasks['task-summary'][0]['task-id'];
      await firstValueFrom(this.jbpmService.startTask(taskId));
      await firstValueFrom(this.jbpmService.completedTask(taskId, solicitud));
      this.alertService.success('Servicio registrado', { keepAfterRouteChange: true });
    } catch (error: any) {
      this.alertService.error(error.toString());
      this.submitting = false;
    }
  }

}
