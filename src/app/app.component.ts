import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { error } from 'node:console';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from './core/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Crud-Application';
  displayedColumns: string[] = [
    'id', 
    'firstName', 
    'lastName', 
    'email', 
    'dob', 
    'education', 
    'gender',
    'package',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _matDialog: MatDialog, 
              private empService: EmployeeService,
              private coresrevice: ServiceService) {  }
  
  ngOnInit(): void {
      this.getEmployeeList();
  }
  openAddEditEmpForm()
  {
    const dialogRef = this._matDialog.open(EmpAddEditComponent) //pass the component inside open() which we want to open
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getEmployeeList();
        }
      },
      error: (error) => {console.log(error);}
    });
  }

  getEmployeeList()
  {
      //this.empService.getEmployeeList will return an observable and we need to subscribe to that observable.
      this.empService.getEmployeeList().subscribe({
        next : (response) => {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (error) => {
          console.log('some error occured');
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id : number){
    this.empService.deleteEmployee(id).subscribe({
      next : (res) => {
        alert('Employee deleted');
        this.coresrevice.openSnackBar('Employee deleted','Done');
        this.getEmployeeList();
      },
      error: (error) => {console.log(error)}
    });
  }

  openEditForm(data: any){
    const dialogRef = this._matDialog.open(EmpAddEditComponent, {
        data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getEmployeeList();
        }
      },
      error: (error) => {console.log(error);}
    });
  }
}
