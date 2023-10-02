import { Component } from '@angular/core';

import { AccountService } from './services';
import { Role, User } from './models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    user?: User | null;
    showServicio: boolean = true;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => {
            this.user = x;
            this.showServicio = this.user?.role === Role.Customer;
        });
    }

    logout() {
        this.accountService.logout();
    }
}