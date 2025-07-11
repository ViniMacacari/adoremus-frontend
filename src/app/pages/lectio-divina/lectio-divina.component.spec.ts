import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectioDivinaComponent } from './lectio-divina.component';

describe('LectioDivinaComponent', () => {
  let component: LectioDivinaComponent;
  let fixture: ComponentFixture<LectioDivinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LectioDivinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectioDivinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
