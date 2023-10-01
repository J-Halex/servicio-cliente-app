import { Component } from '@angular/core';
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

  ClienteID:string = "";
  NombreContacto:string = "";
  NumeroCelular:string = "";
  EmailContacto:string = "";
  Motivo:string = "";
  Funcionalidad:string = "";
  Asunto:string = "";
  Descripcion:string = "";
  observacionesServicioAlCliente:string = "";



  constructor(
    private alertService: AlertService,
    private jbpmService: JbpmService,
    private crmService: CrmService,
    private route: ActivatedRoute,
    private routerT: Router,
    private accountService: AccountService
  ) {

    this.user = this.accountService.userValue;
  }


  ngOnInit() {
    this.isAsesorServicioAlCliente = this.user?.role === Role.ServicioCliente;
    this.idtask = parseInt(this.route.snapshot.params['taskId']);
    this.idprocess = this.route.snapshot.params['processId'];
    this.jbpmService.getVariablesByTaskId(parseInt(this.idprocess), this.user?.username ?? "", this.user?.password ?? "").subscribe(
      (response) => {
        this.variableinstance = response['variable-instance'];
        for (let i = 0; i < this.variableinstance.length; i++) {
          var obj=this.variableinstance[i];
          if(obj['name'] == 'clienteID'){
            this.ClienteID = obj['value'];
          }
          if(obj['name'] == 'contactoNombre'){
            this.NombreContacto = obj['value'];
          }
          if(obj['name'] == 'contactoCelular'){
            this.NumeroCelular = obj['value'];
          }
          if(obj['name'] == 'contactoEmail'){
            this.EmailContacto = obj['value'];
          }
          if(obj['name'] == 'motivo'){
            this.Motivo = obj['value'];
          }
          if(obj['name'] == 'funcionalidad'){
            this.Funcionalidad = obj['value'];
          }
          if(obj['name'] == 'asunto'){
            this.Asunto = obj['value'];
          }
          if(obj['name'] == 'descripcion'){
            this.Descripcion = obj['value'];
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async startTask(solicitud: any) {
    try {
      await firstValueFrom(this.jbpmService.startTask(this.idtask));
      await firstValueFrom(this.jbpmService.completedTask(this.idtask, solicitud));
      this.alertService.success('Servicio registrado', { keepAfterRouteChange: true });
      this.routerT.navigateByUrl('/');
    } catch (error: any) {
      this.alertService.error(error.toString());
    }
  }
  onCerrarServicio() {
    this.startTask({
      "servicioResuelto": true,
      "observacionesServicioAlCliente":this.observacionesServicioAlCliente
    });
  }
  
  onEscalaraServicio() {
    this.startTask({
      "servicioResuelto": false,
      "observacionesServicioAlCliente":this.observacionesServicioAlCliente
    });
  }



}
