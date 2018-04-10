import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs/observable/of';

import { ContactsListComponent } from './contacts-list.component';
import { ContactsMaterialModule } from '../contacts-material.module';

import { Contact } from '../models/contact';
import { CONTACT_DATA } from '../data/contact-data';

import { API_ENDPOINT } from '../app.tokens';

import { ContactsService } from '../contacts.service';
import { EventBusService } from '../event-bus.service';

describe('ContactsDetailComponent', () => {

  let fixture: ComponentFixture<ContactsListComponent>;
  let component: ContactsListComponent;
  let contactsService: ContactsService;
  let testContacts: Contact[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsListComponent],
      imports: [
        ContactsMaterialModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        ContactsService,
        EventBusService,
        { provide: API_ENDPOINT, useValue: 'http://localhost:4201/api' }
      ]
    });

    fixture = TestBed.createComponent(ContactsListComponent);
    component = fixture.componentInstance;

    // bad: contactsService = TestBed.get(ContactsService);
    contactsService = fixture.debugElement.injector.get(ContactsService);

    testContacts = [CONTACT_DATA[2], CONTACT_DATA[4], CONTACT_DATA[6]];
  });

  it('should fetch and display contacts', () => {

    spyOn(contactsService, 'getContacts').and.returnValue(of(testContacts));

    fixture.detectChanges(); // call ngOnInit and do all the change detection and view updating

    const viewItems = fixture.debugElement.queryAll(By.css('h3'));

    expect(contactsService.getContacts).toHaveBeenCalled();
    expect(viewItems.length).toEqual(testContacts.length);
  });
});
