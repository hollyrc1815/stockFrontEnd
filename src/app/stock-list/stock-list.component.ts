import { StockDetailsComponent } from '../stock-details/stock-details.component';
import { Observable } from "rxjs";
import { StockService } from "../stock.service";
import { Stock } from "../Stock";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-stock-list",
  templateUrl: "./stock-list.component.html",
  styleUrls: ["./stock-list.component.css"]
})
export class StockListComponent implements OnInit {
  stocks: Observable<Stock[]>;

  constructor(private stockService: StockService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.stocks = this.stockService.getStocksList();
  }

  deleteStock(id: string) {
    this.stockService.deleteStock(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  stockDetails(id: string){
    this.router.navigate(['details', id]);
  }
}