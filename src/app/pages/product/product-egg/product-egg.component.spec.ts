import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEggComponent } from './product-egg.component';

describe('ProductEggComponent', () => {
  let component: ProductEggComponent;
  let fixture: ComponentFixture<ProductEggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEggComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
