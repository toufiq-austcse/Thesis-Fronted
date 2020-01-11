import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InappmessagemodalComponent } from './inappmessagemodal.component';

describe('InappmessagemodalComponent', () => {
  let component: InappmessagemodalComponent;
  let fixture: ComponentFixture<InappmessagemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InappmessagemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InappmessagemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
