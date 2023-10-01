import { Component, OnInit } from '@angular/core';

import { Role, User } from '@app/models';
import { AccountService, CrmService } from '@app/services';
import { firstValueFrom } from 'rxjs';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    user: User | null;
    customer: any | null;
    loading = false;
    serviciosCustomer: any;

    constructor(private accountService: AccountService, private crmService: CrmService) {
        this.user = this.accountService.userValue;
    }

    ngOnInit(): void {
        if (!!this.user && this.user.role === Role.Customer) {
            this.findInfoCustomer();
        }
    }

    async findInfoCustomer() {
        this.loading = true;

        try {
            const customer = await firstValueFrom(this.crmService.setCustomer(this.user?.nit || ''));
            this.serviciosCustomer = await firstValueFrom(this.crmService.getServicesByCustomerId(customer.Id));
        } catch (error: any) {
            console.error(error);
        }

        this.loading = false;
    }
}