import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBlogPostComponent } from './new-blog-post.component';

describe('NewBlogPostComponent', () => {
  let component: NewBlogPostComponent;
  let fixture: ComponentFixture<NewBlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBlogPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
