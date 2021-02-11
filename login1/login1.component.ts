import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { LoginRequest } from 'src/app/models/loginrequest';
import { LoginService } from 'src/app/services/login-service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css']
})
export class Login1Component implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequest;
  registerSuccessMessage!: string;
  isError!: boolean;

  constructor(private authService: LoginService, private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {}
    
  login() {
    this.loginRequestPayload.username = this.loginForm.get('username')!.value ;
    this.loginRequestPayload.password = this.loginForm.get('password')!.value;
      this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.isError = false;
      this.router.navigate(['/main']);
      
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

}
