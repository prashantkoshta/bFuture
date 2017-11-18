import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { CommonService } from "../../shared/services/common.service";
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
    animations: [routerTransition()]
})
export class CustomerComponent implements OnInit {
    public dataSource;
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public listProduct:any;
    public listCustomer:any;
    public columns:Array<any> = [];
    public displayedColumns:any;

    constructor(private _commonService:CommonService) {
        this.listProduct = [];
        this.listCustomer = [];
        this.displayedColumns = [
            "Cluster",
            "id",
            "Name",
            "Age",
            "AvgBal",
            "Score",
            "Status",
            "Hashouse",
            "Sex",
            "Dependents",
            "AvgPayin",
            "AvgExp",
            "Fashion",
            "Travel",
            "Health",
            "Entertainment",
            "Food",
            "Electronic",
            "Sports",
            "Grossary"
            ];
      
       
    }

    ngOnInit() {
        var ref= this;
        this._commonService.fetchData("/Group",{},"get","GROUPS").subscribe(data => {
            ref.listProduct = data;
            ref.getCutomers(null);
        });
    }
    
    private getCutomers(groupId:string):void{
        var ref = this;
        if(groupId){
            this._commonService.fetchData("/Group/"+groupId,{},"get").subscribe(data => {
                this.listCustomer = data;
                ref.dataSource = new ExampleDataSource(this.listCustomer);
            });
            
        }else{
            this._commonService.fetchData("/Customer",{},"get").subscribe(data => {
                this.listCustomer = data;
                ref.dataSource = new ExampleDataSource(this.listCustomer);
            });
           
        }
        
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    public onGroupSelect(item:any){
        this.getCutomers((item == -1)?null:item);
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