import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class JbpmService {
  private username: string = 'wbadmin';
  private password: string = 'wbadmin';
  private containerJBPM: string = "servicio-cliente-siigo_1.0.0-SNAPSHOT";
  private processJBPM: string = "servicio-cliente-siigo.servicio-cliente";

  constructor(
    private http: HttpClient
  ) {

  }

  getBasicAuthHeader(username: string, password: string): string {
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

  completedTask(id: number, variables: any) {
    const headers = this.getHeaders();
    const data = { ...variables };
    return this.http.put<any>(`${environment.apiUrlJBPM}/server/containers/${this.containerJBPM}/tasks/${id}/states/completed`, data, { headers: headers });
  }
}