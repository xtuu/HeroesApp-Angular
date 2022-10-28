import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

})
export class LoginComponent {

  constructor(
    private router: Router,
    private authServices: AuthService
  ) { }

  login() {

    this.authServices.login()
      .subscribe(resp => {
        if (resp.id) {
          this.router.navigate(['./heroes'])
        }

      })

  }
}
