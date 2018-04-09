import { Contact } from '../../models/contact';
import { ContactsActionTypes,
    ContactsActions } from './contacts.actions';

export interface ContactsState {
  list: Array<Contact>;
  selectedContactId?: number;
}

const INITIAL_STATE: ContactsState = {
  list: [] /*,
  selectedContactId */
};

export function contactsReducer(
  state: ContactsState = INITIAL_STATE,
  action: ContactsActions) {

  switch (action.type) {
    case ContactsActionTypes.LOAD_CONTACTS_SUCCESS:
      return {
        ...state,
        list: action.payload };
    case ContactsActionTypes.SELECT_CONTACT:
      return {
        ...state,
        selectedContactId: action.payload };
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
