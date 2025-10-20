import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaintComponent } from './saint.component';

describe('SaintComponent', () => {
  let component: SaintComponent;
  let fixture: ComponentFixture<SaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
