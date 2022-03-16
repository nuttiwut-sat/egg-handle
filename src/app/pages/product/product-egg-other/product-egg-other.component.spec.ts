import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEggOtherComponent } from './product-egg-other.component';

describe('ProductEggOtherComponent', () => {
  let component: ProductEggOtherComponent;
  let fixture: ComponentFixture<ProductEggOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEggOtherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEggOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
