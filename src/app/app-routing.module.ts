import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { CreateStockComponent } from './create-stock/create-stock.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { UpdateStockComponent } from './update-stock/update-stock.component';

const routes: Routes = [
  { path: '', redirectTo: 'stock', pathMatch: 'full' },
  { path: 'stocks', component: StockListComponent },
  { path: 'add', component: CreateStockComponent },
  { path: 'update/:id', component: UpdateStockComponent },
  { path: 'details/:id', component: StockDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
