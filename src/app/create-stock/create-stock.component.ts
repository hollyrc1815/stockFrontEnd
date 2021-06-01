import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Stock } from '../stock';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent implements OnInit {

  stock: Stock = new Stock();
  submitted = false;

  constructor(private stockService: StockService,
    private router: Router) { }

  ngOnInit() {
  }

  newEmployee(): void {
    this.submitted = false;
    this.stock = new Stock();
  }

  save() {
    this.stockService
    .createStock(this.stock).subscribe(data => {
      console.log(data)
      this.stock = new Stock();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/stocks']);
  }
}