import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeService } from './../employee.service';
import { EmployeeModel } from '../employee-model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})


export class FirstPageComponent implements OnInit{
  employeeForm: FormGroup;
  addressForm: FormGroup;
  passwordConfirm!: FormGroup;
  emailsFormArray!: FormArray;
  initial: String = '';
  isChecked: boolean = false;
  dataSent!: String[];
  checkAdd: boolean = false;
  hello: any = ''


  constructor(private fb: FormBuilder, private snack: MatSnackBar, private employeeService: EmployeeService
    ,private router: Router) {
    // this.addressForm = this.fb.group({
    //   address: [''],
    //   district: [''],
    //   subdistrict: [''],
    //   city: [''],
    //   province: [''],
    //   country: [''],
    //   postcode: [''],
    // });
  
    // this.employeeForm = this.fb.group({
    //   id: ['', [Validators.required, Validators.pattern(/^\d{3,}$/)]],
    //   name: ['', Validators.required],
    //   surname: ['', Validators.required],
    //   initialEmail: [this.initial, Validators.required],
    //   otherEmail: [''],
    //   emails: this.fb.array([]),
    //   username: ['', [Validators.required, Validators.pattern(/^(?!.*(?:admin|user|name|password)).*$/i)]],
    //   password: ['', Validators.required],
    //   conpassword: ['', Validators.required],
    //   addressForm: this.addressForm,
    //   telephone: ['']
    // });

    this.addressForm = new FormGroup({
      address: new FormControl(''),
      district: new FormControl(''),
      subdistrict: new FormControl(''),
      city: new FormControl(''),
      province: new FormControl(''),
      country: new FormControl(''),
      postcode: new FormControl(''),
    });
    
    this.employeeForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern(/^\d{3,}$/)]),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      initialEmail: new FormControl(this.initial, Validators.required),
      otherEmail: new FormControl(''),
      emails: new FormArray([]),
      username: new FormControl('', [Validators.required, Validators.pattern(/^(?!.*(?:admin|user|name|password)).*$/i)]),
      password: new FormControl('', Validators.required),
      conpassword: new FormControl('', Validators.required),
      addressForm: this.addressForm,
      telephone: new FormControl('')
    });

    // if (this.isChecked) {
    //   this.employeeForm.addControl('otherEmail', new FormControl('', Validators.required));
    // }

    this.emailsFormArray = this.employeeForm.get('emails') as FormArray;
  }

  ngOnInit(): void {
    this.isChecked = false;
  }

  addEmail() {
    const initialEmail = this.employeeForm.get('initialEmail')?.value;
    if (initialEmail != null && initialEmail.trim() !== '') {
    this.initial = initialEmail;
    console.log(this.initial);
    const emailControl = this.fb.control(initialEmail);
    this.emailsFormArray.push(emailControl);
    // this.employeeForm.get('initialEmail')?.reset();
    }
  }

  addMoreEmail() {
    const email = this.employeeForm.value.otherEmail;
    if (email != null && email.trim() !== '') {
    const emailControl = this.fb.control(email);
    this.emailsFormArray.push(emailControl);
    this.employeeForm.get('otherEmail')?.reset(); 
    }
    this.dataSent = this.emailsFormArray.value;
    this.checkAdd= true;
    console.log(this.dataSent);
  }

  deleteEmail(index: number): void {
    this.emailsFormArray.removeAt(index);
    this.dataSent = this.emailsFormArray.value;
  }
  

  onSubmitEmployee() {
    // this.addMoreEmail()
    if (this.employeeForm.valid) {
      this.addEmail();
      const formData = {
        id: this.employeeForm.value.id,
        name: this.employeeForm.value.name,
        surname: this.employeeForm.value.surname,
        // username: this.employeeForm.value.username,
        // password: this.employeeForm.value.password,
        email: this.employeeForm.value.initialEmail,
        // address: {
          address: this.addressForm.value.address,
          district: this.addressForm.value.district,
          subdistrict: this.addressForm.value.subdistrict,
          city: this.addressForm.value.city,
          province: this.addressForm.value.province,
          country: this.addressForm.value.country,
          postcode: this.addressForm.value.postcode,
        // },
        telephone: this.employeeForm.value.telephone,
      };
      this.checkAdd= false;
      this.isChecked=false;
      const checkbox = document.getElementById('checkbox') as HTMLInputElement;
      checkbox.checked = false;      
      this.createEmployee(formData);
    }
  }

  resetForm() {
    this.employeeForm.reset();
    const checkbox = document.getElementById('checkbox') as HTMLInputElement;
    checkbox.checked = false;
    this.checkAdd= false;
    this.isChecked=false;
    this.emailsFormArray.clear();
  }

  openSnackBar() {
    Swal.fire({
      html:
        '<div class="fs-2 fw-bolder">Saved successfully</div>',
      confirmButtonText: 'Ok',
      customClass: {
        confirmButton: 'btn btn-success fs-4 text-center py-0 ms-1',
      },
    }).then((result)=> {
      if (result.isConfirmed) {
        this.resetForm();
      }
    })
  }

check() {
  this.isChecked = !this.isChecked;
}

goToSearchPage() {
    this.router.navigate(['']);
}

// patchMockData(): void {
//   const mockData = {
//     id: '456',
//     name: 'Kwan Kwan',
//     initialEmail: 'kwan@example.com',
//     username: 'kwan',
//     addressForm: {
//       address: 'Home',
//       district: 'Some District',
//       subdistrict: 'Some Subdistrict',
//       country: 'Kwanland',
//     },
//     telephone: '123456789055',
//   };

//   this.employeeForm.patchValue(mockData);
//   console.log("mock", mockData);
// }

 addressData = {
  address: '123 Main St',
  district: 'kwan',
  subdistrict: 'SuebKwan',
  city: 'hello',
  province: 'world',
  country: 'Kwanland',
  postcode: '12345'
};

mockData(): void {
  const mockData = {
    id: '123',
    name: '',
    surname: 'mocksurname',
    initialEmail: 'email@example.com',
    emails: [''],
    username: 'johndoe',
    password: 'password123',
    conpassword: 'password123',
    telephone: '1234567890',
    address: this.addressData
  };

  this.addressForm.setValue(this.addressData);
  this.employeeForm.patchValue(mockData);
  // const checkbox = document.getElementById('checkbox') as HTMLInputElement;
  // checkbox.checked = false;
  // this.checkAdd= false;
  // this.isChecked=false;   
}


createEmployee(employee: EmployeeModel) {
  this.employeeService.showLoading();
  console.log("data sent to backend: " + employee);
  this.employeeService.createEmployee(employee).subscribe((response) => {
    Swal.close();
    console.log(response);
    this.openSnackBar();
  }, error => {
    console.log(error);
  })
}


}

