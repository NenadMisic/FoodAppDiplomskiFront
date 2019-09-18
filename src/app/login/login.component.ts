import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginUser } from '../shared/loginUser.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMsg = '';
  errorOpened = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  login(form: NgForm) {
    const user: LoginUser = new LoginUser(form.value.email, form.value.password);
    console.log(user);
    this.auth.login(user).subscribe(data => {
      this.router.navigateByUrl('/restorani');
    }, err => {
      if (err.error) {
        this.errorMsg = err.error.message;
        this.errorOpened = true;
      }
    });
  }

  closingError() {
    this.errorOpened = false;
  }

}
