import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';

import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { ApplicationState } from '../state/index';
import { SelectContactAction, UpdateContactAction } from '../state/contacts/contacts.actions';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(private contactsService: ContactsService,
              private store: Store<ApplicationState>,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    /* this.contactsService.getContact(this.route.snapshot.paramMap.get('id'))
                        .subscribe(contact => this.contact = contact); */
    /* now handled in the canActivate guard:
    const contactId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new SelectContactAction(+contactId));*/

    this.contact$ = this.store.select(state => {
      const id = state.contacts.selectedContactId;
      const contact = state.contacts.list.find(elem =>
        elem.id === id);
      /* Attention: store state should be immutable!
       * The ngModel in the form template implements two-way data binding
       * and thus the returned object must be a deep copy!
       * But do not make the copy here, because it would make the store
       * evalutation pretty slow. Thus, we map the Observable to a copy afterwards. */
      return contact;
    }).pipe( map( contact => /*Object.assign({}, contact)*/ ({...contact}) ) );
  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
    this.contactsService.updateContact(contact)
      .subscribe(() => {
        this.store.dispatch(new UpdateContactAction(contact));
        this.goToDetails(contact);
      });
  }

  private goToDetails(contact: Contact) {
    this.router.navigate(['/contact', contact.id ]);
  }
}
