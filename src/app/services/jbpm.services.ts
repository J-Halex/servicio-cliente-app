import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/models';

@Injectable({ providedIn: 'root' })
export class JbpmService {
    private username = 'wbadmin';
    private password = 'wbadmin';
 

    constructor(
        private http: HttpClient
    ) {
        
    }

    containerJBPM:string ="servicio-cliente-siigo_1.0.0-SNAPSHOT"
    
    getBasicAuthHeader(username: string, password: string): string {
        const credentials = `${username}:${password}`;
        const base64Credentials = btoa(credentials);
        return `Basic ${base64Credentials}`;
      }
      
    getContainer(){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.getBasicAuthHeader(this.username, this.password),
          });
        var response = this.http.get<string>(`${environment.apiUrlJBPM}/server/containers`,{headers:headers});
        return response;
    }
}