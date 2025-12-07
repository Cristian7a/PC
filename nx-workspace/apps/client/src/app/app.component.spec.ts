import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

describe('AppComponent', () => {
  let mockTranslateService: Partial<TranslateService>;
  beforeEach(async () => {
    mockTranslateService = {
      addLangs: vi.fn(),
      setFallbackLang: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([])],
      providers: [{ provide: TranslateService, useValue: mockTranslateService }],
    }).compileComponents();
  });

  it(`should have as title 'client'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('client');
  });
});
