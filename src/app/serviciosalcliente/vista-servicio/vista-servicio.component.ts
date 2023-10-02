import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role, User } from '@app/models';
import { AccountService, CrmService, JbpmService } from '@app/services';
import { AlertService } from '@app/services/alert.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-vista-servicio',
  templateUrl: './vista-servicio.component.html',
  styleUrls: ['./vista-servicio.component.css']
})
export class VistaServicioComponent {
  idtask: number = 0;
  idprocess: string = "";
  user: User | null;
  variableinstance: [] = [];
  isAsesorServicioAlCliente: boolean = false;
  isAsesorOperacional: boolean = false;

  ClienteID: string = "";
  NombreContacto: string = "";
  NumeroCelular: string = "";
  EmailContacto: string = "";
  Motivo: string = "";
  Funcionalidad: string = "";
  Asunto: string = "";
  Descripcion: string = "";
  resultadoAnalisisServicio: number = 0;
  observacionesServicioAlCliente: string = "";
  observacionesAreaOperaciones: string = "";

  submitting: boolean = false;
  submitted: boolean = false;

  frmAnalisisOperacional!: FormGroup;
  frmAnalisisDesarrollo!: FormGroup;
  frmContactoCliente!: FormGroup;

  get fao() { return this.frmAnalisisOperacional.controls; }
  get fadev() { return this.frmAnalisisDesarrollo.controls; }
  get fcl() { return this.frmContactoCliente.controls; }

  constructor(
    private alertService: AlertService,
    private jbpmService: JbpmService,
    private route: ActivatedRoute,
    private routerT: Router,
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) {

    this.user = this.accountService.userValue;
  }

  ngOnInit() {
    this.isAsesorServicioAlCliente = this.user?.role === Role.ServicioCliente;
    this.isAsesorOperacional = this.user?.role === Role.TechnologyAnalyst;
    this.idtask = parseInt(this.route.snapshot.params['taskId']);
    this.idprocess = this.route.snapshot.params['processId'];
    this.jbpmService.getVariablesByTaskId(parseInt(this.idprocess), this.user?.username ?? "", this.user?.password ?? "").subscribe(
      (response) => {
        this.variableinstance = response['variable-instance'];
        for (let i = 0; i < this.variableinstance.length; i++) {
          var obj = this.variableinstance[i];
          if (obj['name'] === 'clienteID') {
            this.ClienteID = obj['value'];
          }
          if (obj['name'] === 'contactoNombre') {
            this.NombreContacto = obj['value'];
          }
          if (obj['name'] === 'contactoCelular') {
            this.NumeroCelular = obj['value'];
          }
          if (obj['name'] === 'contactoEmail') {
            this.EmailContacto = obj['value'];
          }
          if (obj['name'] === 'motivo') {
            this.Motivo = obj['value'];
          }
          if (obj['name'] === 'funcionalidad') {
            this.Funcionalidad = obj['value'];
          }
          if (obj['name'] === 'asunto') {
            this.Asunto = obj['value'];
          }
          if (obj['name'] === 'descripcion') {
            this.Descripcion = obj['value'];
          }
          if (obj['name'] === 'resultadoAnalisisServicio') {
            this.resultadoAnalisisServicio = Number(obj['value']);
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );

    this.frmAnalisisOperacional = this.formBuilder.group({
      analisis: ['', Validators.required],
      observaciones: ['', Validators.required],
    });

    this.frmAnalisisDesarrollo = this.formBuilder.group({
      observaciones: ['', Validators.required]
    });

    this.frmContactoCliente = this.formBuilder.group({
      observaciones: ['', Validators.required],
      servicioResuelto: [false],
    });
  }

  async startTask(solicitud: any) {
    this.submitting = true;

    try {
      await firstValueFrom(this.jbpmService.startTaskGeneric(this.idtask, this.user?.username ?? "", this.user?.password ?? ""));
      await firstValueFrom(this.jbpmService.completedTaskGeneric(this.idtask, solicitud, this.user?.username ?? "", this.user?.password ?? ""));
      this.alertService.success('Cambios realizados', { keepAfterRouteChange: true });
      this.routerT.navigateByUrl('/');
    } catch (error: any) {
      this.alertService.error(error.toString());
    }

    this.submitting = false;
  }

  onCerrarServicio() {
    this.startTask({
      "servicioResuelto": true,
      "observacionesServicioAlCliente": this.observacionesServicioAlCliente
    });
  }

  onEscalaraServicio() {
    this.startTask({
      "servicioResuelto": false,
      "observacionesServicioAlCliente": this.observacionesServicioAlCliente
    });
  }

  onSubmitAnalisisOperacional() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.frmAnalisisOperacional.invalid) {
      return;
    }

    this.submitted = false;
    const value = this.frmAnalisisOperacional.value;

    this.startTask({
      "resultadoAnalisisServicio": value.analisis,
      "observacionesAreaOperaciones": value.observaciones
    });
  }

  onSubmitAnalisisDesarrollo() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.frmAnalisisDesarrollo.invalid) {
      return;
    }

    this.submitted = false;
    const value = this.frmAnalisisDesarrollo.value;

    this.startTask({
      "observacionesAreaOperaciones": value.observaciones
    });
  }

  onSubmitContactoCliente() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.frmContactoCliente.invalid) {
      return;
    }
    
    this.submitted = false;
    const value = this.frmContactoCliente.value;

    this.startTask({
      "servicioResuelto": !value.servicioResuelto,
      "observacionesContactoServicioAlCliente": value.observaciones
    });
  }
}
