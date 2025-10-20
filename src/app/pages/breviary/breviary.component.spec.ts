import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreviaryComponent } from './breviary.component';

describe('BreviaryComponent', () => {
  let component: BreviaryComponent;
  let fixture: ComponentFixture<BreviaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreviaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreviaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
