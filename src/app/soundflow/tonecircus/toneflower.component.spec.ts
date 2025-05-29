import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ToneFlowerComponent } from "./toneflower.component";

describe("TonecircusComponent", () => {
  let component: ToneFlowerComponent;
  let fixture: ComponentFixture<ToneFlowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToneFlowerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToneFlowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
