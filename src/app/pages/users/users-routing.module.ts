import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { CreateUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';

const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [
    {
      path: 'users',
      component: UsersComponent,
    },
    {
      path: 'add',
      component: CreateUserComponent,
    },
    {
      path: 'edit',
      component: EditUserComponent,
    },
    {
      path: 'view',
      component: ViewUsersComponent,
    },
  ],
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {
}
