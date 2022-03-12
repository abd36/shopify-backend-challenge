import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { WarehouseService } from 'src/app/warehouse/warehouse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Warehouse } from 'src/app/warehouse/warehouse';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  _id!: string;
  item?: Item;
  warehouse?: Warehouse
  warehouseName: string = ""
  form!: FormGroup;

  constructor(
    public itemService: ItemService,
    public warehouseService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      deletedMessage: new FormControl(''),
    })

    this._id = this.route.snapshot.params['itemId'];
    this.itemService.getItem(this._id).subscribe((data: Item) => {
      this.item = data;
      console.log(this.item);

      if (this.item.warehouse_id) {
        this.warehouseService.getWarehouse(this.item.warehouse_id)
          .subscribe((warehouse: Warehouse) => {
            this.warehouseName = warehouse.name;
          })
      } else {
        this.warehouseName = "N/A";
      }
    });

  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.form.value.deleted = true;
    console.log(this.form.value);
    this.itemService.updateItem(this._id, this.form.value).subscribe((res) => {
      console.log("item deleted");
      this.router.navigateByUrl("item/index");
    })
  }

}
