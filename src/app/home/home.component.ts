import { Component } from '@angular/core';

import { User } from '@app/models';
import { AccountService, JbpmService } from '@app/services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  user: User | null;

  tareas: any[] = [];

  constructor(private accountService: AccountService, private jbpmService: JbpmService) {
    this.user = this.accountService.userValue;
  }

  ngOnInit() {


    this.jbpmService.getTasksByUser(this.user?.username || "", this.user?.password || "")
      .subscribe(
        (response) => {
          this.tareas = response['task-summary'];
        },
        (error) => {
          console.error(error);
        }
      );

  }
}
