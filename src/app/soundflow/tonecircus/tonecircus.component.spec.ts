import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TonecircusComponent } from './tonecircus.component';

describe('TonecircusComponent', () => {
  let component: TonecircusComponent;
  let fixture: ComponentFixture<TonecircusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TonecircusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TonecircusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
