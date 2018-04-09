import { Action } from '@ngrx/store';
import { Contact } from '../../models/contact';

export enum ContactsActionTypes {
  LOAD_CONTACTS = '[Contacts] Load All Contacts',
  UPDATE_CONTACT = '[Contacts] Update Contact',
  LOAD_CONTACTS_SUCCESS = '[Contacts] Load success',
  UPDATE_CONTACT_SUCCESS = '[Contacts] Update contact success',
  SELECT_CONTACT = '[Contacts] Select contact',
  ADD_CONTACT = '[Contacts] Add contact'
}

export class LoadContactsAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACTS;

  constructor() { }
}

export class LoadContactsSuccessAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACTS_SUCCESS;

  constructor(public payload: Array<Contact>) { }
}

export class SelectContactAction implements Action {
  readonly type = ContactsActionTypes.SELECT_CONTACT;

  constructor(public payload: number) { }
}

export class AddContactAction implements Action {
  readonly type = ContactsActionTypes.ADD_CONTACT;

  constructor(public payload: Contact) { }
}

export class UpdateContactAction implements Action {
  readonly type = ContactsActionTypes.UPDATE_CONTACT;

  constructor(public payload: Contact) { }
}

export class UpdateContactSuccessAction implements Action {
  readonly type = ContactsActionTypes.UPDATE_CONTACT_SUCCESS;

  constructor(public payload: Contact) { }
}

export type ContactsActions =
  LoadContactsAction | LoadContactsSuccessAction |
  SelectContactAction | AddContactAction |
  UpdateContactAction | UpdateContactSuccessAction;
