import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandamentosComponent } from './mandamentos.component';

describe('MandamentosComponent', () => {
  let component: MandamentosComponent;
  let fixture: ComponentFixture<MandamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MandamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MandamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
