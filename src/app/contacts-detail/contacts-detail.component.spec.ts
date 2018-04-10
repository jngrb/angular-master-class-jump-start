import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { ContactsDetailComponent } from './contacts-detail.component';
import { ContactsMaterialModule } from '../contacts-material.module';

import { Contact } from '../models/contact';
import { CONTACT_DATA } from '../data/contact-data';

import { ContactsService } from '../contacts.service';

class FakeContactsService {
}

describe('ContactsDetailComponent', () => {

  let fixture: ComponentFixture<ContactsDetailComponent>;
  let component: ContactsDetailComponent;
  let testContact: Contact;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsDetailComponent],
      imports: [
        ContactsMaterialModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ContactsService, useClass: FakeContactsService }
      ]
    });

    fixture = TestBed.createComponent(ContactsDetailComponent);
    component = fixture.componentInstance;

    testContact = CONTACT_DATA[2];
  });

  it('should render contact', () => {
    const expectedContact = {...testContact};
    component.contact = expectedContact;

    const debugEl = fixture.debugElement.query(
      By.css('mat-card-title')
    );
    fixture.detectChanges();

    expect(debugEl.nativeElement.textContent)
      .toContain(expectedContact.name);
  });
});
