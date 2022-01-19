import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  _id!: string;
  item!: Item;
  form!: FormGroup;

  constructor(
    public itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._id = this.route.snapshot.params['itemId'];
    this.itemService.getItem(this._id).subscribe((data: Item) => {
      this.item = data;
      console.log(this.item);
    });
    
    this.form = new FormGroup({
      deletedMessage: new FormControl('', [Validators.required]),
    })
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
