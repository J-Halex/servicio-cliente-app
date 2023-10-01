import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CrmService {
    private customerSubject: BehaviorSubject<any | null>;
    public customer: Observable<any | null>;
    
    constructor(
        private http: HttpClient
    ) {
        this.customerSubject = new BehaviorSubject({});
        this.customer = this.customerSubject.asObservable();
    }

    
    public get customerValue() {
        return this.customerSubject.value;
    }

    setCustomer(nit: string) {
        return this.getCustomerByNit(nit)
            .pipe(map(customer => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('customer', JSON.stringify(customer.records[0]));
                this.customerSubject.next(customer.records[0]);
                return customer.records[0];
            }));
    }

    getCustomerByNit(nit: string) {
        const query = `SELECT Id, Nit__c, Party.Name, Party.Nro_Celular__c, Party.Email__c FROM Customer WHERE Nit__c='${nit}'`;
        return this.http.get<any>(`${environment.apiCrmProxy}/api/SalesForce/consulta?query=${encodeURIComponent(query)}`);
    }

    getServicesByCustomerId(id: string) {
        const query = `SELECT Id_Servicio__c, Name, Descripcion__c, ClienteId__c, Estado__c, Funcionalidad__c, MotivoServicio__c, Fecha_Creacion__c, Fecha_Final__c FROM Service_Siigo__c WHERE ClienteId__c='${id}'`;
        return this.http.get<any>(`${environment.apiCrmProxy}/api/SalesForce/consulta?query=${encodeURIComponent(query)}`);
    }

    createService(data: any) {
        return this.http.post(`${environment.apiCrmProxy}/api/SalesForce/insertar/Service_Siigo__c`, data);
    }
}