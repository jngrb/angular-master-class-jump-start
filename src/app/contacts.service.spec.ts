import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { delay, catchError } from 'rxjs/operators';

import { API_ENDPOINT } from './app.tokens';

import { Contact } from './models/contact';
import { CONTACT_DATA } from './data/contact-data';

import { ContactsService } from './contacts.service';

describe('ContactsService', () => {

  const MOCKED_API_ENDPOINT = 'http://localhost:4201/api';
  const mockResponse: Contact[] = [
    CONTACT_DATA[2], CONTACT_DATA[4], CONTACT_DATA[6]
  ];

  let service: ContactsService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ContactsService,
        { provide: API_ENDPOINT, useValue: MOCKED_API_ENDPOINT }
      ]
    });

    service = TestBed.get(ContactsService);
    backend = TestBed.get(HttpTestingController);
  });

  it('should provide all contacts', () => {
    service.getContacts().subscribe( results => {
      expect(results.length).toBe(mockResponse.length);
    });

    const req = backend.expectOne(MOCKED_API_ENDPOINT + '/contacts');
    backend.expectNone(MOCKED_API_ENDPOINT + '/contact');

    expect(req.cancelled).toBeFalsy();
    req.flush({items: mockResponse});

    backend.verify();
  });

  it('should provide the contacts with ID=2', async(() => {
    const TEST_ID = '2';
    service.getContact(TEST_ID).subscribe( result => {
      expect(result.id).toMatch(TEST_ID); // cannot be toBe, because of type mismatch
    });

    backend.expectNone(MOCKED_API_ENDPOINT + '/contacts');
    backend.expectOne(MOCKED_API_ENDPOINT + `/contacts/${TEST_ID}`).flush({item: CONTACT_DATA[2]});
    backend.verify();
  }));

  it('should be able to update the contact with ID=2', async(() => {
    const updatedContact = {...CONTACT_DATA[2], name: 'Ali Baba'};
    service.updateContact(updatedContact).subscribe( result => {
      expect(result).toEqual(updatedContact);
    });

    backend.expectNone(MOCKED_API_ENDPOINT + '/contacts');
    const req = backend.expectOne(MOCKED_API_ENDPOINT + `/contacts/${updatedContact.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({item: updatedContact}, {status: 200, statusText: 'OK'});
    backend.verify();
  }));

  it('should not be able to update the contact with an invalid ID', async(() => {
    const updatedContact = {...CONTACT_DATA[2], name: 'Ali Baba', id: 100};
    service.updateContact(updatedContact)
      .pipe( catchError( (err: HttpErrorResponse) => { expect(err).toBeDefined(); return []; } ) )
      .subscribe( result => {
        expect(false).toBeTruthy();
      });

    backend.expectNone(MOCKED_API_ENDPOINT + '/contacts');
    const req = backend.expectOne(MOCKED_API_ENDPOINT + `/contacts/${updatedContact.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({item: updatedContact}, {status: 404, statusText: 'Contact not found'});
    backend.verify();
  }));
});
