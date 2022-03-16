import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithLineComponent } from './login-with-line.component';

describe('LoginWithLineComponent', () => {
  let component: LoginWithLineComponent;
  let fixture: ComponentFixture<LoginWithLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginWithLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWithLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
