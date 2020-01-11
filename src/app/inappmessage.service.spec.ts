import { TestBed } from '@angular/core/testing';

import { InappmessageService } from './inappmessage.service';

describe('InappmessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InappmessageService = TestBed.get(InappmessageService);
    expect(service).toBeTruthy();
  });
});
