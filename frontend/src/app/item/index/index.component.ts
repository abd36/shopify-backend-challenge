import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { WarehouseService } from 'src/app/warehouse/warehouse.service';
import { Item } from '../item';
import { Warehouse } from 'src/app/warehouse/warehouse';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  items: Item[] = [];
  deletedItems: Item[] = [];
  warehouses: { [_id: string]: string[]; } = {};

  constructor(public itemService: ItemService, public warehouseService: WarehouseService) { }

  ngOnInit(): void {
    this.refreshAllItems();
  };

  refreshAllItems(): void {
    this.warehouseService.getAllWarehouses().subscribe((data: Warehouse[]) => {
      for (const warehouse of data.values()) {
        this.warehouses[warehouse._id] = [warehouse.name, warehouse.address];
      }
      
      this.itemService.getAllItems().subscribe((data: Item[]) => {
        this.items = data;
        console.log("items");
        console.log(data);
        console.log(this.items);
      });
  
      this.itemService.getAllDeletedItems().subscribe((data: Item[]) => {
        this.deletedItems = data;
        console.log("deleted items");
        console.log(this.deletedItems);
      });
    })
  }

  restoreItem(item: Item) {
    const restoreData: any = {
      deleted: false,
      deletedMessage: ''
    }
    
    this.itemService.updateItem(item._id, restoreData).subscribe(() => {
      console.log("item restored");
      this.refreshAllItems();
    })
  }

  permanentlyDeleteItem(id: string) {
    this.itemService.deleteItem(id).subscribe(() => {
      console.log("deleted item");
      this.refreshAllItems();
    })
  }

}
