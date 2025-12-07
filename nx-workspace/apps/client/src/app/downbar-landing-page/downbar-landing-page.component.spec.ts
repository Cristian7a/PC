import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownbarLandingPageComponent } from './downbar-landing-page.component';

describe('DownbarLandingPageComponent', () => {
  let component: DownbarLandingPageComponent;
  let fixture: ComponentFixture<DownbarLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownbarLandingPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DownbarLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
