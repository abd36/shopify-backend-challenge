import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'src/app/warehouse/warehouse.service';
import { Warehouse } from 'src/app/warehouse/warehouse';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  warehouses: Warehouse[] = [];

  constructor(public warehouseService: WarehouseService) { }

  ngOnInit(): void {
    this.refreshWarehouses();
  }

  refreshWarehouses(): void {
    this.warehouseService.getAllWarehouses().subscribe((data) => {
      this.warehouses = data;
      console.log("warehouses");
      console.log(this.warehouses);
    })
  }

  deleteWarehouse(id: string) {
    this.warehouseService.deleteWarehouse(id).subscribe(() => {
      console.log(`deleted warehouse ${id}`);
      this.refreshWarehouses();
    })
  }

}
