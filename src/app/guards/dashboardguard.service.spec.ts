import { TestBed } from '@angular/core/testing';

import { DashboardguardService } from './dashboardguard.service';

describe('DashboardguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardguardService = TestBed.get(DashboardguardService);
    expect(service).toBeTruthy();
  });
});
