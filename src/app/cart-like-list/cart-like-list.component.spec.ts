import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartLikeListComponent } from './cart-like-list.component';

describe('CartLikeListComponent', () => {
  let component: CartLikeListComponent;
  let fixture: ComponentFixture<CartLikeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartLikeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartLikeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
