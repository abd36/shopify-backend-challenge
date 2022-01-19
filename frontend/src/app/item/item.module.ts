import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IndexComponent,
    EditComponent,
    CreateComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ItemModule { }
