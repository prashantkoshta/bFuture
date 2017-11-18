import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { CommonService } from "../../shared/services/common.service";
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.scss'],
    animations: [routerTransition()]
})
export class OffersComponent implements OnInit {
    public dataSource;
    public listOfMerchant;

    // Pie
    public pieChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales'
    ];
    public pieChartData: number[] = [300, 500, 100];
    public pieChartType: string = 'pie';


    constructor(private _commonService:CommonService) {
        
    }

    ngOnInit() {
        var ref= this;
        this._commonService.fetchData("/Merchant",{},"get").subscribe(data => {
            ref.listOfMerchant = data;
        });
    }
    
    private getPieChartData(p_id:string):void{
        var ref = this;
        // this._commonService.fetchData("/getCustomers",{},"get").subscribe(data => {
        //     this.listCustomer = data["data"];
        //     ref.dataSource = new ExampleDataSource(this.listCustomer);
        // });
    }

    public onGroupSelect(item:any){
        this.getPieChartData((item == -1)?null:item);
    }

     // events
     public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

}


export class ExampleDataSource extends DataSource<any> {
    constructor(private data:any){
        super();
    }
    connect(): Observable<Element[]> {
      return Observable.of(this.data);
    }
  
    disconnect() {}
  }