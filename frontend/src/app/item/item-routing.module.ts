import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';

const routes: Routes = [
  { path: '', redirectTo: 'item/index', pathMatch: 'full'},
  { path: 'item', 'redirectTo': 'item/index', pathMatch: 'full' },
  { path: 'item/index', component: IndexComponent },
  { path: 'item/create', component: CreateComponent },
  { path: 'item/:itemId/edit', component: EditComponent },
  { path: 'item/:itemId/delete', component: DeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
