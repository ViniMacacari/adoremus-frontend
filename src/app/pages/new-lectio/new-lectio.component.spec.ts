import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLectioComponent } from './new-lectio.component';

describe('NewLectioComponent', () => {
  let component: NewLectioComponent;
  let fixture: ComponentFixture<NewLectioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewLectioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLectioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
