import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLiturgicalInfoComponent } from './modal-liturgical-info.component';

describe('ModalLiturgicalInfoComponent', () => {
  let component: ModalLiturgicalInfoComponent;
  let fixture: ComponentFixture<ModalLiturgicalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalLiturgicalInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLiturgicalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
