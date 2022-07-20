import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  submitUserData(
    fullName: string,
    userName: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string
  ): UserData {
    const userData = {
      name: fullName,
      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      confirmPassword: confirmPassword,
    };
    localStorage.setItem('loggedUser', JSON.stringify(userData));
    localStorage.setItem('userIsLogged', JSON.stringify(true));
    return userData;
  }
}

interface UserData {
  name: string;
}
