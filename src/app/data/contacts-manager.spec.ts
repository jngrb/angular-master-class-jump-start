import { TestBed, async } from '@angular/core/testing';
import { Contact } from '../models/contact';
import { ContactManager } from './contact-manager';
import { CONTACT_DATA } from './contact-data';

describe( 'ContactManager', () => {

  let contactManager: ContactManager;

  beforeEach( () => {
    contactManager = new ContactManager(CONTACT_DATA);
  });

  it('should return all contacts', () => {
    expect(contactManager.getAll()).toEqual(CONTACT_DATA);
  });

  it('should return a single contact', () => {
    const id = 1;
    expect(contactManager.get(id).id).toBe(id);
  });

  it('should return null for an invalid ID', () => {
    const invalidId = -1;
    expect(contactManager.get(invalidId)).toBeNull();
  });

  describe('adding a contact', () => {
    let newContact: Contact;
    let originalLength: number;

    beforeEach( () => {
      newContact = { id: 100, name: 'New Contact' };
      originalLength = contactManager.contacts.length;
    });

    it('should increase the length of the contacts array', () => {
      contactManager.add(newContact);
      expect(contactManager.contacts.length).toBeGreaterThan(originalLength);
    });

    it('should add the new contact to the list of contacts', () => {
      contactManager.add(newContact);
      expect(contactManager.contacts).toContain(newContact);
    });
  });

  describe('updating a contact', () => {
    let nonExistingContact: Contact;
    let contactToBeUpdated: Contact;
    let originalLength: number;

    beforeEach( () => {
      nonExistingContact = { id: 100, name: 'Nonexisting Contact' };
      contactToBeUpdated = contactManager.contacts[2];
      originalLength = contactManager.contacts.length;
    });

    it('should not work for a non-existing contact - method I', () => {
      try {
        contactManager.update(nonExistingContact);
        expect(false).toBeTruthy();
      } catch (err) {
        expect(err).toEqual(new Error(`Trying to update contact that doesn't exist with ID: ${nonExistingContact.id}!`));
      }
    });

    it('should not work for a non-existing contact - method II', () => {
      expect(() => contactManager.update(nonExistingContact))
        .toThrow(new Error(`Trying to update contact that doesn't exist with ID: ${nonExistingContact.id}!`));
    });

    it('should not work for a non-existing contact - method II', () => {
      expect(() => contactManager.update(nonExistingContact))
        .toThrowError(`Trying to update contact that doesn't exist with ID: ${nonExistingContact.id}!`);
    });

    it('should change the updated contact in the list of contacts', () => {
      contactToBeUpdated.name = 'Changed Name';
      contactManager.update(contactToBeUpdated);
      expect(contactManager.contacts[2]).toEqual(contactToBeUpdated);
    });
  });
});
