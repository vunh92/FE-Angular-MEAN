import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestscreenComponent } from './testscreen.component';

describe('TestscreenComponent', () => {
  let component: TestscreenComponent;
  let fixture: ComponentFixture<TestscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
