import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class JbpmService {
  private username: string = 'wbadmin';
  private password: string = 'wbadmin';
  private containerJBPM: string = "servicio-cliente-siigo_1.0.0-SNAPSHOT";
  private processJBPM: string = "servicio-cliente-siigo.servicio-cliente";
  private oauthUrl = 'https://bpmsintegrations-57n6eonktq-uc.a.run.app/api/SalesForce';//'https://login.salesforce.com/services/oauth2/token';

  private usernameSalesForce: string = 'haroldsvg@force.com';
  private passwordSalesForce: string = '5al35Harol';
  private clientIdSalesForce: string = '3MVG9OGq41FnYVsFIxQ2F.QAg0I7MVqMH5mKW8.tV5g5tk8VsHZPy4sc9sU7WtNwra1oM2CkuCcteDt5NHhpD';
  private clientSecretSalesForce: string = '4C4C16D09AA130136FC2A2389EFAA814FB3A3D33F735344F18A69E317BC37C67';

  constructor(
    private http: HttpClient
  ) {

  }

  getBasicAuthHeader(username: string, password: string): string {
    const credentials = `${username}:${password}`;
    const base64Credentials = btoa(credentials);
    return `Basic ${base64Credentials}`;
  }

  getBasicAuthHeaderGeneric(username: string, password: string): string {
    const credentials = `${username}:${password}`;
    const base64Credentials = btoa(credentials);
    return `Basic ${base64Credentials}`;
  }



  getHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getBasicAuthHeader(this.username, this.password),
    });
    return headers;
  }

  getHeadersGeneric(_username: string, _password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getBasicAuthHeaderGeneric(_username, _password),
    });
    return headers;
  }

  startProcess() {
    const headers = this.getHeaders();
    return this.http.post<string>(`${environment.apiUrlJBPM}/server/containers/${this.containerJBPM}/processes/${this.processJBPM}/instances`, {}, { headers: headers });
  }

  getTasksByProcessId(id: number) {
    const headers = this.getHeaders();
    return this.http.get<any>(`${environment.apiUrlJBPM}/server/queries/tasks/instances/process/${id}`, { headers: headers });
  }

  startTask(id: number) {
    const headers = this.getHeaders();
    return this.http.put<any>(`${environment.apiUrlJBPM}/server/containers/${this.containerJBPM}/tasks/${id}/states/started`, { "auto-progress": true }, { headers: headers });
  }

  startTaskGeneric(id: number, username: string, password: string) {
    const headers = this.getHeadersGeneric(username, password);
    return this.http.put<any>(`${environment.apiUrlJBPM}/server/containers/${this.containerJBPM}/tasks/${id}/states/started`, { "auto-progress": true }, { headers: headers });
  }

  completedTask(id: number, variables: any) {
    const headers = this.getHeaders();
    const data = { ...variables };
    return this.http.put<any>(`${environment.apiUrlJBPM}/server/containers/${this.containerJBPM}/tasks/${id}/states/completed`, data, { headers: headers });
  }

  completedTaskGeneric(id: number, variables: any, username: string, password: string) {
    const headers = this.getHeadersGeneric(username, password);
    const data = { ...variables };
    return this.http.put<any>(`${environment.apiUrlJBPM}/server/containers/${this.containerJBPM}/tasks/${id}/states/completed`, data, { headers: headers });
  }

  getBearerSalesForce() {
    debugger;

    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('client_id', this.clientIdSalesForce); // Reemplaza 'tu_client_id' con el valor real
    formData.append('client_secret', this.clientSecretSalesForce); // Reemplaza 'tu_client_secret' con el valor real
    formData.append('username', this.usernameSalesForce);
    formData.append('password', this.passwordSalesForce);

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // });

    const headers = new HttpHeaders({
      'Authorization': `Bearer 00DHn000001PUWU!AQ8AQOslUqVLe0ecE6shiyWaI3hcOYqiEnNa8tfY2UtG92qnnvafLhNCrpR67jMoyW3d1rqUq1DORued12mN8Pn8KJO_sUb.`
    });

    var url = "https://abc6542-dev-ed.develop.my.salesforce.com/services/data/v58.0/query/?q=SELECT+Nit__c,Party.Name,Party.Nro_Celular__c,Party.Email__c+FROM+Customer+WHERE+Nit__c='12345'"

    this.http.get(url, { headers }).subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí
        console.log(response);
      },
      (error) => {
        // Manejar errores aquí
        console.error(error);
      }
    );

    // this.http.post(this.oauthUrl, formData, { headers })
    //   .subscribe((response) => {
    //     console.log(response);
    //   },
    //     (error) => {
    //       console.error('Error en la solicitud:', error);
    //       // Manejar el error aquí
    //     });
  }


  getTasksByUser(userId: string, password: string) {
    var url = `${environment.apiUrlJBPM}/server/queries/tasks/instances/owners?status=Reserved&user='${userId}'&page=0&pageSize=10&sortOrder=false`;
    const headers = this.getHeadersGeneric(userId, password);
    return this.http.get<any>(url, { headers: headers })
  }

  getVariablesByTaskId(taskId: number, userId: string, password: string) {
    var url = `${environment.apiUrlJBPM}/server/containers/${this.containerJBPM}/processes/instances/${taskId}/variables/instances`;
    const headers = this.getHeadersGeneric(userId, password);
    return this.http.get<any>(url, { headers: headers })
  }


}
