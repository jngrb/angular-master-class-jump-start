import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { delay } from 'rxjs/operators';

import { API_ENDPOINT } from './app.tokens';

import { Contact } from './models/contact';
import { CONTACT_DATA } from './data/contact-data';

import { ContactsService } from './contacts.service';

describe('ContactsService', () => {

  let service: ContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientModule
      ],
      providers: [
        ContactsService,
        { provide: API_ENDPOINT, useValue: 'http://localhost:4201/api' }
      ]
    });

    // alternative DI resolution: service = TestBed.get(ContactsService);
    /* get the dependency resolution from the scope of a component:
     * fixture.debugElement.injector.get(DependencyToken) */
  });

  beforeEach(inject([ContactsService], contactsService => {
    service = contactsService;
  }));

  it('should provide all contacts - sync test', () => {
    service.getContacts().pipe( delay( 100 ) )
      .subscribe( results => {
        expect(results.length).toBe(0); // will not fail because the delay prevent evaluation
        expect(results.length).toBeGreaterThan(0);
      });

    const TEST_ID = '2';
    service.getContact(TEST_ID).subscribe( result => {
      expect(result.id).toMatch(TEST_ID); // cannot be toBe, because of type mismatch
    });
  });

  it('should provide all contacts', async(() => {
    service.getContacts().subscribe( results => {
      expect(results.length).toBeGreaterThan(0);
    });
  }));

  it('should provide the contacts with ID=2', async(() => {
    const TEST_ID = '2';
    service.getContact(TEST_ID).subscribe( result => {
      expect(result.id).toMatch(TEST_ID); // cannot be toBe, because of type mismatch
    });
  }));
});
