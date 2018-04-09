import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';

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
    let contactId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new SelectContactAction(+contactId));

    this.contact$ = this.store.select(state => {
      let id = state.contacts.selectedContactId;
      let contact = state.contacts.list.find(contact =>
        contact.id == id);
      return Object.assign({}, contact);
    });
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
