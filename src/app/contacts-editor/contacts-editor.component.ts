import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';

import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { ApplicationState,
  SelectContactAction, UpdateContactAction,
  ContactsQuery } from '../state';

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

    this.contact$ = this.store.select(ContactsQuery.getSelectedContact)
      .pipe( map( contact => ({...contact}) ) );
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
