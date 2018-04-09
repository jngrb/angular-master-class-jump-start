import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { tap, map, switchMap } from 'rxjs/operators';

import { ContactsService } from './contacts.service';
import { Contact } from './models/contact';

import {
  ContactsActionTypes,
  LoadContactsSuccessAction,
  UpdateContactAction,
  UpdateContactSuccessAction
} from './state/contacts/contacts.actions';

@Injectable()
export class ContactsEffectsService {

  constructor(private actions$: Actions,
    private contactsService: ContactsService,
    private router: Router) { }

  @Effect()
  getContacts$ = this.actions$
    .ofType( ContactsActionTypes.LOAD_CONTACTS ).pipe(
      switchMap( _ => {
        return this.contactsService.getContacts();
      }),
      map( (contacts: Array<Contact>) =>
        new LoadContactsSuccessAction(contacts) )
    );

  @Effect()
  updateContact$ = this.actions$
    .ofType( ContactsActionTypes.UPDATE_CONTACT ).pipe(
      map( action => (<UpdateContactAction>action).payload ),
      switchMap( (contact: Contact) =>
        this.contactsService.updateContact(contact) ),
      tap( (contact: Contact) => this.router.navigate(['/contact', contact.id]) ),
      map((contact: Contact) => new UpdateContactSuccessAction(contact) )
   );
}
