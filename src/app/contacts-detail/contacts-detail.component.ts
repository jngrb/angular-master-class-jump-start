import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ContactsService } from '../contacts.service';
import { Contact } from '../models/contact';

import { Store } from '@ngrx/store';
import { ApplicationState } from '../state/index';
import { SelectContactAction } from '../state/contacts/contacts.actions';

@Component({
  selector: 'trm-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(private contactsService: ContactsService,
    private store: Store<ApplicationState>,
    private route: ActivatedRoute) {}

  ngOnInit() {
    /*this.contactsService.getContact(this.route.snapshot.paramMap.get('id'))
                        .subscribe(contact => this.contact = contact);*/
    /* now handled in the canActivate guard:
    const contactId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new SelectContactAction(+contactId));*/

    this.contact$ = this.store.select(state => {
      const id = state.contacts.selectedContactId;
      const contact = state.contacts.list.find(elem =>
        elem.id === id);
      return contact;
    });
  }
}
