import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TonematrixComponent } from './tonematrix.component';

describe('TonematrixComponent', () => {
  let component: TonematrixComponent;
  let fixture: ComponentFixture<TonematrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TonematrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TonematrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
