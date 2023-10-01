import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, CrmService, JbpmService } from '@app/services';
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
  customer: any | null;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private jbpmService: JbpmService,
    private crmService: CrmService,
    private router: Router
  ) { }

  ngOnInit() {
    this.customer = this.crmService.customerValue;

    // form with validation rules
    this.form = this.formBuilder.group({
      clienteID: [this.customer?.Nit__c || '', Validators.required],
      contactoNombre: [this.customer?.Party.Name || '', Validators.required],
      contactoCelular: [this.customer?.Party.Nro_Celular__c || '', Validators.required],
      contactoEmail: [this.customer?.Party.Email__c || '', [Validators.required, Validators.email]],
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
      await this.createServiceCRM(processId, solicitud);
      this.alertService.success('Servicio registrado', { keepAfterRouteChange: true });
      this.router.navigateByUrl('/');
    } catch (error: any) {
      this.alertService.error(error.toString());
      this.submitting = false;
    }
  }

  async createServiceCRM(processId: string, solicitud: any) {
    try {
      const customer = this.crmService.customerValue;

      const data = {
        "Id_Servicio__c": processId,
        "Name": solicitud.asunto,
        "Descripcion__c": solicitud.descripcion,
        "ClienteId__c": customer.Id,
        "Estado__c": "Creado",
        "Fecha_Creacion__c": this.fomatDate(new Date()),
        "Funcionalidad__c": solicitud.funcionalidad,
        "MotivoServicio__c": solicitud.motivo
      };
      await firstValueFrom(this.crmService.createService(data));
    } catch (error: any) {
      console.error(error);
    }
  }

  fomatDate(d: Date) {
    const datestring = d.getFullYear() + "-" +
        ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        ("0" + d.getDate()).slice(-2);

    return datestring;
  }
}
