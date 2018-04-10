import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { ContactsDetailComponent } from './contacts-detail.component';
import { ContactsMaterialModule } from '../contacts-material.module';

import { Contact } from '../models/contact';
import { CONTACT_DATA } from '../data/contact-data';

import { ContactsService } from '../contacts.service';

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
      providers: []
    });

    fixture = TestBed.createComponent(ContactsDetailComponent);
    component = fixture.componentInstance;

    testContact = {...CONTACT_DATA[2]};

    component.contact = testContact;
  });

  it('should render contact', () => {
    const debugEl = fixture.debugElement.query(
      By.css('mat-card-title')
    );
    fixture.detectChanges();

    expect(debugEl.nativeElement.textContent)
      .toContain(testContact.name);
  });

  it('should emit back event', () => {
    let backEmitted = false;
    const buttonEl = fixture.debugElement.query(
      By.css('#backBtn')
    );

    component.back.subscribe(() => {
      backEmitted = true;
    });

    buttonEl.triggerEventHandler('click', null);
    expect(backEmitted).toBe(true);
  });

  it('should emit edit event', () => {
    let editEmitted = false;
    const buttonEl = fixture.debugElement.query(
      By.css('#editBtn')
    );

    component.edit.subscribe(() => {
        editEmitted = true;
    });

    buttonEl.triggerEventHandler('click', null);
    expect(editEmitted).toBe(true);
  });
});
