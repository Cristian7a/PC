import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollNavigatorComponent } from './scroll-navigator.component';

describe('ScrollNavigatorComponent', () => {
  let component: ScrollNavigatorComponent;
  let fixture: ComponentFixture<ScrollNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollNavigatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
