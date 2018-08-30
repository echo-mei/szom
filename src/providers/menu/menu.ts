import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import { BASE_URL } from '../../config';
import { Observable } from '../../../node_modules/rxjs';
import { StorageProvider } from '../storage/storage';

@Injectable()
export class MenuProvider {

  constructor(
    public http: HttpProvider,
    public storage: StorageProvider
  ) {
  }

  listMenuTree(): Observable<any> {
    return this.http.get(`${BASE_URL}/menuItem/listMenuTree`);
  }

  storeMenu(menus) {
    let menuList = {
      menuKey: 'root',
      menuName: 'root',
      children: []
    };
    function constructMenu(menu, children) {
      children.forEach((c) => {
        let child = {
          menuKey: c.entry.menuKey,
          menuName: c.entry.menuName,
          children: []
        };
        constructMenu(child, c.children);
        menu.children.push(child);
      });
    }
    constructMenu(menuList, menus);
    this.storage.set('menuList', JSON.stringify(menuList));
  }

  hasMenu(menuKey: string): boolean {
    let menuList = JSON.parse(this.storage.get('menuList'));
    function findMenu(list) {
      return list.find((item) => {
        return item.menuKey == menuKey || findMenu(item.children);
      }) ? true : false;
    }
    return findMenu(menuList.children) ? true : false;
  }

  getMenu(menuKey: string) {
    let menuList = JSON.parse(this.storage.get('menuList'));
    let menu;
    function findMenu(list) {
      list.find((item) => {
        if(item.menuKey === menuKey) {
          menu = item;
          return true;
        }else {
          return findMenu(item.children);
        }
      });
    }
    findMenu(menuList.children);
    return menu;
  }

}
