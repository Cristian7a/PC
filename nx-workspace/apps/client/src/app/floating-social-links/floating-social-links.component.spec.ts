import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingSocialLinksComponent } from './floating-social-links.component';

describe('FloatingSocialLinksComponent', () => {
  let component: FloatingSocialLinksComponent;
  let fixture: ComponentFixture<FloatingSocialLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingSocialLinksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingSocialLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
