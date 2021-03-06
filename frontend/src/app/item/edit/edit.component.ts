import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Warehouse } from 'src/app/warehouse/warehouse';
import { WarehouseService } from 'src/app/warehouse/warehouse.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  _id!: string;
  item!: Item;
  form!: FormGroup;
  warehouses: Warehouse[] = [];
  errorMessage?: string;

  constructor(
    public itemService: ItemService,
    public warehouseService: WarehouseService,
    private route: ActivatedRoute,
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

    this._id = this.route.snapshot.params['itemId'];
    this.itemService.getItem(this._id).subscribe((data: Item) => {
      this.item = data;
      this.item.price /= 100;
      console.log(this.item);

      this.form.get("name")?.setValue(this.item.name);
      this.form.get("quantity")?.setValue(this.item.quantity);
      this.form.get("price")?.setValue(this.item.price);
      this.form.get("warehouse_id")?.setValue(this.item.warehouse_id);
    });


  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.form.value.price = this.form.value.price * 100
    console.log(this.form.value);

    this.itemService.updateItem(this._id, this.form.value)
      .pipe(
        catchError((error) => {
          console.log(error);
          this.errorMessage = error;
          return of(null);
        })
      ).subscribe((res) => {
        console.log(res)
        if (res) {
          console.log("item updated");
          this.router.navigateByUrl("item/index");
        }
      })
  }
}
