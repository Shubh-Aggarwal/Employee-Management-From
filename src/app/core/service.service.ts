import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _snackbar: MatSnackBar) { }

  openSnackBar(message: string, action?: string){
    this._snackbar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',

    });
  }
}
