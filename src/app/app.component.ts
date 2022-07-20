import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public userIsLogged: boolean = false;
  // title = 'app';
  // ngOnInit(): void {
  //   type MyArrayType = Array<User>;
  //   const users: MyArrayType = [
  //     { name: 'Coss', email: 'coss@gmail.com', password: '1234' },
  //     { name: 'Florin', email: 'flor@gmail.com', password: '3456' },
  //   ];
  //   localStorage.setItem('users', JSON.stringify(users));
  // }

  ngOnInit(): void {
    const userIsLoggedString = localStorage.getItem('userIsLogged');
    const userIsLogged = JSON.parse(userIsLoggedString ?? '');
    this.userIsLogged = userIsLogged;
  }

  ngAfterViewChecked(): void {
    const userIsLoggedString = localStorage.getItem('userIsLogged');
    const userIsLogged = JSON.parse(userIsLoggedString ?? '');
    setTimeout(() => {
      this.userIsLogged = userIsLogged;
    });
  }

  signOutCurrentUser() {
    console.log(8888);
    localStorage.setItem('userIsLogged', JSON.stringify(false));
  }
}

// export interface User {
//   name: string;
//   email: string;
//   password: string;
// }
