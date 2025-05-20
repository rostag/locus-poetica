import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TonetestComponent } from './tonetest.component';

describe('TonetestComponent', () => {
  let component: TonetestComponent;
  let fixture: ComponentFixture<TonetestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TonetestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TonetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
