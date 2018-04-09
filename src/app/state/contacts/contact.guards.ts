import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { take, switchMap, tap, map } from 'rxjs/operators';

import { Contact } from '../../models/contact';
import { ContactsService } from '../../contacts.service';
import { ApplicationState } from '../app.state';
import { SelectContactAction, AddContactAction } from './contacts.actions';

@Injectable()
export class ContactExistsGuard implements CanActivate {

  constructor(private store: Store<ApplicationState>,
              private contactsService: ContactsService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const contactId = route.paramMap.get('id');
    this.store.dispatch(new SelectContactAction(+contactId));

    const resolveOrAddContactToList = (loaded: boolean) => {
      const addContactToList = (contact: Contact) => {
        this.store.dispatch(new AddContactAction(contact));
      };

      return loaded ? of(true) : this.contactsService
        .getContact(contactId).pipe(
          tap(addContactToList),
          map(contact => !!contact) );
    };

    return this.store.select(state => state.contacts.loaded)
      .pipe(
        take(1),
        switchMap(resolveOrAddContactToList) );
  }
}
