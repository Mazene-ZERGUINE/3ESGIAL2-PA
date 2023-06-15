import { Component, OnInit } from '@angular/core';
import { Chat } from '../shared/models/chat.interface';
import { Path } from '../../../shared/enum/path.enum';

@Component({
  selector: 'app-user-chats-list',
  templateUrl: './user-chats-list.component.html',
  styleUrls: ['./user-chats-list.component.scss'],
})
export class UserChatsListComponent implements OnInit {
  chats?: Chat[] = [
    {
      messagerie_id: 1,
      message: 'string',
      expediteur_id: 1,
      destinataire_id: 2,
      created_at: new Date(),
    },
    {
      messagerie_id: 2,
      message: 'string',
      expediteur_id: 1,
      destinataire_id: 3,
      created_at: new Date(),
    },
  ];
  usersPath = Path.users;

  constructor() {}

  ngOnInit(): void {
    // TODO
  }
}
