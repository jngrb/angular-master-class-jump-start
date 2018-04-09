import { TestBed, inject } from '@angular/core/testing';

import { ContactsEffectsService } from './contacts-effects.service';

describe('ContactsEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactsEffectsService]
    });
  });

  it('should be created', inject([ContactsEffectsService], (service: ContactsEffectsService) => {
    expect(service).toBeTruthy();
  }));
});
