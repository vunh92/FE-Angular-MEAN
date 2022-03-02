import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdNavComponent } from './ad-nav.component';

describe('AdNavComponent', () => {
  let component: AdNavComponent;
  let fixture: ComponentFixture<AdNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
