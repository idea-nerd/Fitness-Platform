import { Component } from '@angular/core';
import { NbAuthJWTToken, 
         NbAuthService 
        } from '@nebular/auth';

import { OWNER_MENU_ITEMS, 
         TRAINER_MENU_ITEMS, 
         MANAGER_MENU_ITEMS 
        } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  user: any;
  menu: any;
  constructor(private authService: NbAuthService) {
            this.authService.onTokenChange()
                .subscribe((token: NbAuthJWTToken) => {
                  if (token.isValid()) {
                    this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
                    this.user = this.user.payload[0];

                    switch (this.user.role) {
                      case 'Owner':
                        this.menu = OWNER_MENU_ITEMS;
                        break;
                      case 'Trainer':
                        this.menu = TRAINER_MENU_ITEMS;
                        break;
                      case 'Nutritionist':
                        this.menu = TRAINER_MENU_ITEMS;
                        break;
                      case 'Manager':
                        this.menu = MANAGER_MENU_ITEMS;
                        break;
                    }
                  }
              });
  }

}
