import { createSelector } from '@ngrx/store';

import { Contact } from '../../models/contact';
import { ContactsActionTypes,
    ContactsActions } from './contacts.actions';

export interface ContactsState {
  list: Array<Contact>;
  loaded: boolean;
  selectedContactId: number;
}

const INITIAL_STATE: ContactsState = {
  list: [],
  loaded: false,
  selectedContactId: null
};

export namespace ContactsQuery {
  export const getContacts = (state) => state.contacts.list;
  export const getLoaded   = (state) => state.contacts.loaded;
  export const getSelectedContactId = (state) => state.contacts.selectedContactId;
  export const getSelectedContact = createSelector(
    getContacts,
    getSelectedContactId,
    (contacts, id) => contacts.find(contact => contact.id === id) );
}

export function contactsReducer(
  state: ContactsState = INITIAL_STATE,
  action: ContactsActions) {

  switch (action.type) {
    case ContactsActionTypes.LOAD_CONTACTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loaded: true };
    case ContactsActionTypes.SELECT_CONTACT:
      return {
        ...state,
        selectedContactId: action.payload };
    case ContactsActionTypes.ADD_CONTACT: {
      const contact = state.list.find(elem => elem.id === action.payload.id);
      return {
        ...state,
        list: !contact ? [...state.list, action.payload] :
          state.list
        };
    }
    case ContactsActionTypes.UPDATE_CONTACT:
      const updatedList = state.list.map(contact => {
        return contact.id === action.payload.id
          ? { ...contact, ...action.payload }
          : contact;
        });
      return {
        ...state,
        list: updatedList };
    default:
      return state;
  }
}
