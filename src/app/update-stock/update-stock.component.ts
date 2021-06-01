import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Stock } from '../stock';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent implements OnInit {

  id: string;
  stock: Stock;

  constructor(private route: ActivatedRoute,private router: Router,
    private stockService: StockService) { }

  ngOnInit() {
    this.stock = new Stock();

    this.id = this.route.snapshot.params['id'];
    
    this.stockService.getStock(this.id)
      .subscribe(data => {
        console.log(data)
        this.stock = data;
      }, error => console.log(error));
  }

  updateStock() {
    this.stockService.updateStock(this.id, this.stock)
      .subscribe(data => {
        console.log(data);
        this.stock = new Stock();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateStock();    
  }

  gotoList() {
    this.router.navigate(['/stocks']);
  }
}