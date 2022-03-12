import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: 'warehouse/create', component: CreateComponent },
  { path: 'warehouse/manage', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
