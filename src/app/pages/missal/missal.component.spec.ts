import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissalComponent } from './missal.component';

describe('MissalComponent', () => {
  let component: MissalComponent;
  let fixture: ComponentFixture<MissalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
