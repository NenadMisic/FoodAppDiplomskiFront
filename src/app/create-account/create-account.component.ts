import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserToRegister } from '../shared/userToRegister.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  registerForm: FormGroup;
  errorMsg = '';
  errorOpened = false;
  passValid = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password1: new FormControl('', [Validators.required]),
      password2: new FormControl('', Validators.required)
    });
  }

  register(form: FormGroup) {
    const newUser: UserToRegister = new UserToRegister(form.value.email, form.value.username, form.value.password1);
    console.log(newUser);
    console.log(JSON.stringify(newUser));
    this.auth.register(newUser).subscribe(data => {
      this.router.navigateByUrl('/restorani');
    }, err => {
      if (err.error) {
        this.errorMsg = err.error.message;
        this.errorOpened = true;
      }
    });
  }

  checkPasswords(form: FormGroup) {
    if (this.registerForm) {
      const pass: string = form.value.password1;
      const confirmPass: string = form.value.password2;

      if (pass === confirmPass && pass.length > 0) {
        this.passValid = true;
        this.errorOpened = false;
      } else {
        if (confirmPass.length <= 0) {
          this.errorOpened = false;
        } else {
          this.passValid = false;
          this.errorMsg = 'Passwords don\'t match';
          this.errorOpened = true;
        }
      }
    }
  }

  closingError() {
    this.errorOpened = false;
  }

}
