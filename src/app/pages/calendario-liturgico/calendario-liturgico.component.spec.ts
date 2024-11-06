import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioLiturgicoComponent } from './calendario-liturgico.component';

describe('CalendarioLiturgicoComponent', () => {
  let component: CalendarioLiturgicoComponent;
  let fixture: ComponentFixture<CalendarioLiturgicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioLiturgicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioLiturgicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
