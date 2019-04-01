import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/service/rest.service';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = new User();
  public errMsg: string = '';
  public successMsg: string = '';

  constructor(private service: RestService, private router: Router, private session: SessionService) { }

  ngOnInit() {
  }

  public login () {
    this.errMsg = '';
    this.successMsg = '';

    if (!this.user.emailId) {
      this.errMsg = 'Please Enter Email Id';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.emailId)) {
      this.errMsg = 'Please Enter valid Email Id';
    } else if (!this.user.password) {
      this.errMsg = 'Please Enter Password';
    } else {
      this.service.login(this.user).subscribe(
        data => {
          this.session.loggedIn = true;
          this.session.username = data[0].name;
          this.session.emailId = data[0].emailId;
          this.session.isAdmin = !!data[0].isAdmin;
          this.router.navigate(['/home']);
        },
        err => {
          console.log(err);
          this.errMsg = err.error.err;
        }
      );
    }
  }

}
