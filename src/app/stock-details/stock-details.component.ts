import { Component, OnInit, Input } from '@angular/core';
import { StockService } from '../stock.service';
import { Stock } from '../stock';
import { ActivatedRoute, Router } from '@angular/router';
import { StockListComponent } from '../stock-list/stock-list.component';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe, formatDate } from '@angular/common'

export interface CompanyData {
  Price: string;
  Date: string;
  Time: string;
}
export const PICK_FORMATS = {
  parse: {dateInput: {month: 'numeric', year: 'numeric', day: 'numeric'}},
  display: {
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'numeric'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
      if (displayFormat === 'input') {
          return formatDate(date,'yyyy-MMM-dd', this.locale);;
      } else {
          return date.toDateString();
      }
  }
}

const ELEMENT_DATA: CompanyData[] = [
  {Price: "1,694,217.00", Date: '01-02-2020', Time: "8:53"},
  {Price: "2,692,396.00", Date: '01-02-2020', Time: "8:53"},
  {Price: "6,719,294.00", Date: '01-02-2020', Time: "8:53"},
  {Price: "2,926,916.00", Date: '01-02-2020', Time: "8:53"},
  {Price: "6,361,691.00", Date: '01-02-2020', Time: "8:53"},
  {Price: "4,666,361.00", Date: '01-02-2020', Time: "8:53"},
  {Price: "9,000,926.00", Date: '01-02-2020', Time: "8:53"},
  {Price: "5,396,719.00", Date: '01-02-2020', Time: "8:53"},
  {Price: "2,217,692.00", Date: '01-02-2020', Time: "8:53"},
  {Price: "7,695,694.00", Date: '01-02-2020', Time: "8:53"},
];

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class StockDetailsComponent implements OnInit {
  selectedValue: any = [];
  Stocks: any = [];

  symbol = 'MCD' 
  date1 = '2017-01-05'
  date2 = '2017-01-10'
 
  public date01 = new Date();
  public date02 = new Date();
 
  loading = false;
  errorMessage = '';
  StockPrices: any = [];

  displayedColumns: string[] = ['Price', 'Date', 'Time'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: CompanyData[] = ELEMENT_DATA;

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

  list(){
    this.router.navigate(['stocks']);
  }

  public getStockPrices() {
    this.loading = true;
    this.errorMessage = '';
    this.stockService.getStock(this.symbol)
     .subscribe((response) => {this.StockPrices = response; console.log("stockPrice respones = " + response)},
     (error) => {
       this.errorMessage = error.message; this.loading = false;
       console.log(this.date01);
       console.log(this.date02);
     },
     () => {this.loading = false;})
  }
 
}