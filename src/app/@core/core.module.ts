import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { API_BASE_URL } from './../configs/api';


import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  StateService,
} from './utils';


import { RoleProviderService } from '../services/roleProvider/role-provider.service';

const formSetting: any = {
  redirectDelay: 500,
  strategy: 'email',
  showMessages: {
    success: true,
    error: true,
  },
  terms: true,
};


export const NB_CORE_PROVIDERS = [
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',

        token: {
          class: NbAuthJWTToken,
          key: 'token',

        },
        baseEndpoint: API_BASE_URL,
        login: {
          endpoint: '/api/login',
          method: 'post',
          redirect: {
            success: '/pages/dashboard',
            failure: null,
          },
        },
        register: {
          endpoint: '/api/sign-up',
          method: 'post',
          redirect: {
            success: '/pages/welcome/',
            failure: null,
          },
        },
        logout: {
          endpoint: '/api/logout',
          method: 'post',
          redirect: {
            success: '/auth/login/',
            failure: null,
          },
        },
        requestPass: {
          endpoint: '/api/request-pass',
          method: 'post',
        },
        resetPass: {
          endpoint: '/api/reset-pass',
          method: 'post',
        },
      }),
    ],
    forms: {
      login: formSetting,
      register: formSetting,
      requestPassword: formSetting,
      resetPassword: formSetting,
      logout: {
        redirectDelay: 0,
        strategy: 'email',
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      Client: {
        view: '*',
      },
      Trainer: {
        parent: 'Guest',
        create: '*',
        edit: '*',
      },
      Manager: {
        parent: 'Guest',
        create: '*',
        edit: '*',
      },
      Owner: {
        parent: 'Manager',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: RoleProviderService,
  },
  AnalyticsService,
  LayoutService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
