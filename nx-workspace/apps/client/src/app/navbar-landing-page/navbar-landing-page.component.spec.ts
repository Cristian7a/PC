import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLandingPageComponent } from './navbar-landing-page.component';

describe('NavbarLandingPageComponent', () => {
  let component: NavbarLandingPageComponent;
  let fixture: ComponentFixture<NavbarLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarLandingPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
