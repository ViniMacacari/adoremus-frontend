import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBreviaryComponent } from './new-breviary.component';

describe('NewBreviaryComponent', () => {
  let component: NewBreviaryComponent;
  let fixture: ComponentFixture<NewBreviaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBreviaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBreviaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
