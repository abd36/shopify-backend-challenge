import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, MinValidator } from '@angular/forms';
import { Warehouse } from 'src/app/warehouse/warehouse';
import { WarehouseService } from 'src/app/warehouse/warehouse.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Item } from '../item';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  warehouses: Warehouse[] = [];
  errorMessage?: string;

  constructor(
    public itemService: ItemService,
    public warehouseService: WarehouseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.warehouseService.getAllWarehouses().subscribe((data) => {
      this.warehouses = data;
    })

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl(1, [Validators.required]),
      price: new FormControl(0.05, [Validators.required]),
      warehouse_id: new FormControl(null)
    })
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.form.value.price = this.form.value.price * 100
    console.log(this.form.value);

    this.itemService.createItem(this.form.value)
      .pipe(
        catchError((error) => {
          console.log(error);
          this.errorMessage = error;
          return of(null);
        })
      ).subscribe((res) => {
        console.log(res)
        if (res) {
          console.log('Item created');
          this.router.navigateByUrl('item/index');
        }
      })
  }
}
