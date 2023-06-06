import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './../employee.service';
import { EmployeeModel } from '../employee-model';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  employees!: EmployeeModel[];
  searchForm!: FormGroup;
  searchItems!: { id: '', name: '', surname: '' };
  isData: boolean = true;

  constructor(private employeeService: EmployeeService, private router: Router, private fb: FormBuilder) {
    this.employees = [];
    this

    this.searchForm = this.fb.group({
      searchId: [''],
      searchName: [''],
      searchSurname: [''],
    })
  }

  ngOnInit(): void {
    this.search();
  }

  resetForm() {
    this.searchForm.reset();
    this.search();
  }

  goToUpdate(id: number){
    this.router.navigate(['update', id]);
  }

  goToCreate(){
    this.router.navigate(['create']);
  }

  deleteEmployee(id: number){
  Swal.fire({
    html:
      '<div class="fs-2 fw-bolder">Are you sure?</div>' +
      '<div class="fs-5">Are you sure you want to delete this employee?<div>',
    icon: 'warning',
    showCancelButton: true,
    buttonsStyling: false,
    confirmButtonText: 'Delete',
    confirmButtonColor: '#DC3545',
    cancelButtonColor: 'btn-outline-success',
    reverseButtons: true,
    customClass: {
      confirmButton: 'btn btn-danger fs-4 text-center py-0 ms-1',
      cancelButton: 'btn btn-outline-success fs-4 text-center py-0 me-1',
    },
  }).then((result)=> {
    console.log(result);
    if (result.isConfirmed) {
      this.employeeService.deleteEmployee(id).subscribe(
        response => {
          Swal.fire({
            html:
              '<div class="fs-2 fw-bolder">Deleted successfully</div>',
            confirmButtonText: 'Ok',
            customClass: {
              confirmButton: 'btn btn-success fs-4 text-center py-0 ms-1',
            },
          }).then((result)=> {
            if (result.isConfirmed) {
              this.search();
            }
          })
        },
        error => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.text,
          });
        }
      );
      
    }
  })
  }

search() {
  this.employeeService.showLoading();
  const searchId = this.searchForm.controls['searchId'].value;
  const searchName = this.searchForm.controls['searchName'].value;
  const searchSurname = this.searchForm.controls['searchSurname'].value;
  this.searchItems = {
    id: searchId ? searchId.trim() : '',
    name: searchName ? searchName.trim() : '',
    surname: searchSurname ? searchSurname.trim() : ''
  };
  console.log("searchItems" + this.searchItems);
  this.employeeService.searchEmployee(this.searchItems).subscribe((response) => {
    Swal.close()
    console.log("response", response);
    this.employees = response;
    if (response.length == 0) {
      this.isData = false;
    } else {
      this.isData = true;
    }
  }, error => {
    console.log(error);
  })
}


}
