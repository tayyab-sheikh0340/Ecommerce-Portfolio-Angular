import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { FormControl, FormGroup, MinLengthValidator, Validators } from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public totalItem : number = 0;
  public searchTerm !: string;
  constructor(private cartService : CartService) { }
  loginFormActive = false;
  RePassword : string = 'none';

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }


  // <!-- .........login form ....................... -->


toggleLoginForm() {
  this.loginFormActive = !this.loginFormActive;
}

closeLoginForm() {
  this.loginFormActive = false;
}


// ---------------Reactive form validation-----------------

registerForm =  new FormGroup({
  firstname : new FormControl("", [
    // First name is required code.
    Validators.required, 
    // Name is too Short code.
    Validators.minLength(3),
  //   Name should start with Alphabet code.
  Validators.pattern("[a-zA-Z].*")
  ]),

  lastname : new FormControl("", [
    // Last name is required code.
    Validators.required, 
    // Name is too Short code.
    Validators.minLength(3),
  //   Name should start with Alphabet code.
  Validators.pattern("[a-zA-Z].*")
  ]),
  
  email : new FormControl("", [
    // Last name is required code.
    Validators.required,
    // Email is required.
    Validators.email,
   
  ]),

  mobile : new FormControl("",[ 
    // number is required.
    Validators.required,
     // Only use numbers
  Validators.pattern("[0-9].*")
   ]),

  gender : new FormControl("",[
    Validators.required
  ]),

  password : new FormControl("", [

  ]),

});


// Error when any input missed or empty

get FirstName(): FormControl{
  return this.registerForm.get("firstname") as FormControl;
}

get LastName(): FormControl{
  return this.registerForm.get("lastname") as FormControl;
}

get Email(): FormControl{
  return this.registerForm.get("email") as FormControl;
}

get Mobile(): FormControl{
  return this.registerForm.get("mobile") as FormControl;
}

get Gender(): FormControl{
  return this.registerForm.get("gender") as FormControl;
}

get Password(): FormControl{
  return this.registerForm.get("password") as FormControl;
}


registerSubmited(){
    console.log("Submited");
}

}
