import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundflowComponent } from './soundflow.component';

describe('SoundflowComponent', () => {
  let component: SoundflowComponent;
  let fixture: ComponentFixture<SoundflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoundflowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoundflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
