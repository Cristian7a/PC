import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownbarLandingPageMenuComponent } from './downbar-landing-page-menu.component';

describe('DownbarLandingPageMenuComponent', () => {
  let component: DownbarLandingPageMenuComponent;
  let fixture: ComponentFixture<DownbarLandingPageMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownbarLandingPageMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DownbarLandingPageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
