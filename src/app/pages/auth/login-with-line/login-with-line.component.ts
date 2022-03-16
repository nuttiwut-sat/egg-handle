import { Component, OnInit } from '@angular/core';
import liff from '@line/liff';

@Component({
  selector: 'app-login-with-line',
  templateUrl: './login-with-line.component.html',
  styleUrls: ['./login-with-line.component.scss']
})
export class LoginWithLineComponent implements OnInit {
  title = 'angular-line-login';
  idToken:string | null = '';
  displayName:string = '';
  pictureUrl:string | undefined = '';
  statusMessage:string| undefined = '';
  userId:string = '';

  ngOnInit(): void {
    this.initLine();
  }

  initLine(): void {
    liff.init({ liffId: '1655250022-AVJylL18' }, () => {
      if (liff.isLoggedIn()) {
        this.runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  runApp(): void {
    const idToken = liff.getIDToken();
    this.idToken = idToken;
    liff.getProfile().then(profile => {
      console.log(profile);
      this.displayName = profile.displayName;
      this.pictureUrl = profile.pictureUrl;
      this.statusMessage = profile.statusMessage;
      this.userId = profile.userId;
    }).catch(err => console.error(err));
  }

  logout(): void {
    liff.logout();
    window.location.reload();
  }
}
