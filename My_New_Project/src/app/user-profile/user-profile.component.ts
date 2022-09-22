import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../user.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userModelObj: UserModel = new UserModel()
  formValue: FormGroup | any;
  readonly = false;
  isLoading = true;
  userId: any;
  user: any

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
    this.formValue = this.formBuilder.group({

      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.email],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      phone: ['', Validators.pattern('[- +()0-9]+') && Validators.required],
      website: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?') && Validators.required],
      comment: [''],
    })
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.httpService.getUserById(this.userId).subscribe(val =>
      this.user = val)
    this.isLoading = false


  }

  onEditClick(row: any) {
    this.userModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name)
    this.formValue.controls['username'].setValue(row.username)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['street'].setValue(row.address.street)
    this.formValue.controls['city'].setValue(row.address.city)
    this.formValue.controls['zipCode'].setValue(row.address.zipcode)
    this.formValue.controls['phone'].setValue(row.phone)
    this.formValue.controls['website'].setValue(row.website)

    this.readonly = !this.readonly
  }

  onUpdateUserClick() {
    this.userModelObj.name = this.formValue.value.name
    this.userModelObj.username = this.formValue.value.username
    this.userModelObj.email = this.formValue.value.email
    this.userModelObj.address.street = this.formValue.value.street
    this.userModelObj.address.city = this.formValue.value.city
    this.userModelObj.address.zipcode = this.formValue.value.zipCode
    this.userModelObj.phone = this.formValue.value.phone
    this.userModelObj.website = this.formValue.value.website

    this.httpService.editUser(this.userModelObj, this.userModelObj.id)
      .subscribe(res => {
          console.log(this.userModelObj)
          alert("Updated successfully")
          this.formValue.reset();
          this.router.navigate(['']);
        },
        err => {
          alert('something got wrong')
        })
  }


}
