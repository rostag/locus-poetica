import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonotextComponent } from './monotext.component';

describe('MonotextComponent', () => {
  let component: MonotextComponent;
  let fixture: ComponentFixture<MonotextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonotextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonotextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
