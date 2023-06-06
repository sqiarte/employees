import { EmployeeService } from './../employee.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeModel } from '../employee-model';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.css']
})
export class UpdatePageComponent {
  id!: number;
  employee!: EmployeeModel;
  emailsFormArray!: FormArray;
  employeeForm!: FormGroup;
  addressForm: FormGroup;
  initial: String = '';
  isChecked: boolean = false;
  dataSent!: String[];
  checkAdd: boolean = false;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router){

  this.addressForm = this.fb.group({
      address: [''],
      district: [''],
      subdistrict: [''],
      city: [''],
      province: [''],
      country: [''],
      postcode: [''],
    });
  
    this.employeeForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      initialEmail: [this.initial, Validators.required],
      telephone: ['']
    });
    this.emailsFormArray = this.employeeForm.get('emails') as FormArray;
  }

  ngOnInit(): void {
    this.employeeService.showLoading();
    this.isChecked = false;
    this.id = this.route.snapshot.params[`id`];
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      Swal.close();
      this.employee = data;
      console.log(data);
      console.log("response name :"+data.name);
      this.mockData();
    }, error => console.log(error));
  }

  updateEmployee(){
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(data => {
      console.log(data);
      Swal.fire({
        html:
          '<div class="fs-2 fw-bolder">Updated successfully</div>',
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton: 'btn btn-success fs-4 text-center py-0 ms-1',
        },
      }).then((result)=> {
        if (result.isConfirmed) {
            this.goToSearchPage();
        }
      })
    }, error => console.log(error));
  }

  goToSearchPage() {
    this.router.navigate(['']);
}

check() {
  this.isChecked = !this.isChecked;
}

deleteEmail(index: number): void {
  this.emailsFormArray.removeAt(index);
  this.dataSent = this.emailsFormArray.value;
}

onSubmitEmployee() {
  if (this.employeeForm.valid) {
    const formData = {
      id: this.id,
      name: this.employeeForm.value.name,
      surname: this.employeeForm.value.surname,
      email: this.employeeForm.value.initialEmail,
      address: this.addressForm.value.address,
      district: this.addressForm.value.district,
      subdistrict: this.addressForm.value.subdistrict,
      city: this.addressForm.value.city,
      province: this.addressForm.value.province,
      country: this.addressForm.value.country,
      postcode: this.addressForm.value.postcode,
      telephone: this.employeeForm.value.telephone,
    };   
    console.log(formData);
    this.employee = formData;
    this.updateEmployee();
  }
}


mockData(): void {
  const mockData = {
    id: this.id,
    name: this.employee.name,
    surname: this.employee.surname,
    initialEmail: this.employee.email,
    telephone: this.employee.telephone,
  };

  const mockAddress = {
    address: this.employee.address,
    district: this.employee.district,
    subdistrict: this.employee.subdistrict,
    city: this.employee.city,
    province: this.employee.province,
    country: this.employee.country,
    postcode: this.employee.postcode
  }
  this.employeeForm.setValue(mockData);
  this.addressForm.setValue(mockAddress);
}


}
