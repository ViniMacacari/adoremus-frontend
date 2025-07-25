import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationConscienceComponent } from './examination-conscience.component';

describe('ExaminationConscienceComponent', () => {
  let component: ExaminationConscienceComponent;
  let fixture: ComponentFixture<ExaminationConscienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExaminationConscienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminationConscienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
