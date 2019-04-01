import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { RestService } from 'src/app/service/rest.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public newUser = new User();
  public users: any = [];
  public errMsg: string = '';
  public successMsg: string = '';
  public maxDate = new Date();

  constructor(private service: RestService, public session: SessionService) { }

  ngOnInit() {
    if (this.session.loggedIn) {
      this.getAllUsers();
    }
  }

  private getAllUsers () {
    this.service.getAllUsers().subscribe(
      data => {
        console.log(data);
        this.users = data;
      }
    );
  }

  public registerNewUser () {
    this.errMsg = '';
    this.successMsg = '';

    if (!this.newUser.name) {
      this.errMsg = 'Please Enter Name';
    } else if (!this.newUser.emailId) {
      this.errMsg = 'Please Enter Email Id';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.newUser.emailId)) {
      this.errMsg = 'Please Enter valid Email Id';
    } else if (!this.newUser.dob) {
      this.errMsg = 'Please Enter Date of Birth';
    } else if (!this.newUser.mob) {
      this.errMsg = 'Please Enter Mobile Number';
    } else if (!/^\d{10}$/.test(this.newUser.mob.toString())) {
      this.errMsg = 'Please Enter 10 digits for Mobile Number';
    } else if (!this.newUser.password) {
      this.errMsg = 'Please Enter Password';
    } else if (!this.newUser.gender) {
      this.errMsg = 'Please select a Gender';
    } else {
      this.service.addUser(this.newUser).subscribe(
        (data) => {
          this.successMsg = 'Registered Succesfully';
          this.newUser = new User();
        }, 
        (err) => {
          if (err.error.errno === 19) {
            this.errMsg = 'User already exists';
          }
        }
      );
    }
  }

  public deleteUser(user: User){
    this.service.deletUser(user).subscribe(
      data => {
        this.getAllUsers();
      },
      err => {
        this.errMsg = err.error.err;
      }
    );
  }

}
