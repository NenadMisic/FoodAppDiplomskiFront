import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css']
})
export class UserDropdownComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  @Input() open: boolean;
  @Input() loggedIn = false;
  @Output() closing: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
  }

  auth() {
    if (this.loggedIn) {
      this.authService.logout();
      this.closing.emit(false);
      this.router.navigateByUrl('/pocetna');
    } else {
      this.closing.emit(false);
      this.router.navigateByUrl('/login');
    }
  }

}
