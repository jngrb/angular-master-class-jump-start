import { ContactsActionTypes, ContactsActions,
  LoadContactsAction, LoadContactsSuccessAction,
  SelectContactAction, AddContactAction,
  UpdateContactAction, UpdateContactSuccessAction } from './contacts/contacts.actions';
import { ContactsState, ContactsQuery } from './contacts/contacts.reducer';
import { ContactExistsGuard } from './contacts/contact.guards';
import { ROOT_REDUCER, ApplicationState } from './app.state';

import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';

const META_REDUCERS = !environment.production
  ? [storeFreeze]
  : [];

export { ContactsActionTypes, ContactsActions,
  LoadContactsAction, LoadContactsSuccessAction,
  SelectContactAction, AddContactAction,
  UpdateContactAction, UpdateContactSuccessAction,
  ContactsState, ContactsQuery,
  ContactExistsGuard,
  ROOT_REDUCER, ApplicationState,
  META_REDUCERS };
