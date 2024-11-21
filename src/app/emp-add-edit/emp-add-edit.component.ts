import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../core/service.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent implements OnInit {
  empForm : FormGroup;
  education: string[] = [
    'Matric',
    'Intermediate',
    'Diploma',
    'Graduation',
    'Post-Graduation'
  ];

  constructor(
    private _formBuilder : FormBuilder,
    private empService:EmployeeService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any,
    private coreService: ServiceService){
    this.empForm = this._formBuilder.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:''
    });
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data);
  }
  //This event will be called whenever submit event is triggered.
  onFormSubmit(){
    if(this.data){
      if(this.empForm.valid){
        this.empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (res) => {
            alert('Employee updated successfully');
            this.coreService.openSnackBar('Employee Updated','Done');
            this.dialogRef.close(true);
          },
          error: (error) => {console.log('Error occured');}
        });
      }
    }
    else{
      if(this.empForm.valid){
        this.empService.addEmployee(this.empForm.value).subscribe({
          //if it is success
          next: (val: any) =>{
              alert('Employee added successfully');
              this.coreService.openSnackBar('Employee Added');
              //after doing that we can close the popup or model by using close
              //we are passing parameter as true to just let another component know that is comign true and data can be added to list.
              this.dialogRef.close(true);
          },
          //if it fails
          error: (err: any) => {
             console.log(err)
          }
        })
      }
    }
    
  }
}
