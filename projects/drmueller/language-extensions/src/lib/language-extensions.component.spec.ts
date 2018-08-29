import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageExtensionsComponent } from './language-extensions.component';

describe('LanguageExtensionsComponent', () => {
  let component: LanguageExtensionsComponent;
  let fixture: ComponentFixture<LanguageExtensionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageExtensionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageExtensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
