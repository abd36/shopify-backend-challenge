import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../warehouse.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, MinValidator} from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  errorMessage?: string;

  constructor(
    public warehouseService: WarehouseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);

    this.warehouseService.createWarehouse(this.form.value)
      .pipe(
        catchError((error) => {
          console.log(error);
          this.errorMessage = error;
          return of(null);
        })
      ).subscribe((res) => {
        console.log(res)
        if (res) {
          console.log('Warehouse created');
          this.router.navigateByUrl('warehouse/manage');
        }
      })
  }

}
