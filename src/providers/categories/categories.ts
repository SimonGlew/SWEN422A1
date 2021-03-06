import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProvider } from '../user/user';
import { Events } from 'ionic-angular';

import { Storage } from '@ionic/storage';
/*
  Generated class for the CategoriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriesProvider {

  constructor(public http: HttpClient, public storage: Storage, public events: Events, public userProvider: UserProvider) {
    console.log('Hello CategoriesProvider Provider');
  }


  saveCategories(categories: any) {
    let user = this.userProvider.getCurrentUser()

    if (user) {
      this.storage.set((user.id + '_categories'), categories)
    } else {
      this.storage.set(('local_categories'), categories)
    }
  }

  loadCategories() {
    let user = this.userProvider.getCurrentUser()

    if (user) {
      return this.storage.get(String(user.id + '_categories'))
        .then(categories => {
          this.events.publish('categories:getAll', categories)
        })
    } else {
      return this.storage.get('local_categories')
        .then(categories => {
            this.events.publish('categories:getAll', categories)
        })
    }
  }
}
