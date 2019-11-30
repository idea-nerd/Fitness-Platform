import { TestBed } from '@angular/core/testing';

import { RoleProviderService } from './role-provider.service';

describe('RoleProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleProviderService = TestBed.get(RoleProviderService);
    expect(service).toBeTruthy();
  });
});
