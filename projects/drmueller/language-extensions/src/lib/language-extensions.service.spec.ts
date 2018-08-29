import { TestBed, inject } from '@angular/core/testing';

import { LanguageExtensionsService } from './language-extensions.service';

describe('LanguageExtensionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageExtensionsService]
    });
  });

  it('should be created', inject([LanguageExtensionsService], (service: LanguageExtensionsService) => {
    expect(service).toBeTruthy();
  }));
});
