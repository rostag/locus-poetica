import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AnagrammatorComponent } from './anagrammator.component';


describe('AnagrammatorComponent', () => {
  let component: AnagrammatorComponent;
  let fixture: ComponentFixture<AnagrammatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnagrammatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnagrammatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
