import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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

    service = TestBed.get(ContactsService);
  });

  it('should provide all contacts - sync test', () => {
    service.getContacts().subscribe( results => {
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
