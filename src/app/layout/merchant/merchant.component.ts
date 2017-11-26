import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { CommonService } from "../../shared/services/common.service";
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-merchant',
    templateUrl: './merchant.component.html',
    styleUrls: ['./merchant.component.scss'],
    animations: [routerTransition()]
})
export class MerchantComponent implements OnInit {
    public dataSource;
    public gridData:any;
    public displayedColumns:any;

    constructor(private _commonService:CommonService) {
        this.gridData = [];
        this.displayedColumns = [
            "id",
            "Type",
            "SubType",
            "Name",
            ];
    }

    ngOnInit() {
        var ref= this;
        this._commonService.fetchData("/Merchant",{},"get").subscribe(data => {
            ref.gridData = data;
            ref.dataSource = new ExampleDataSource(ref.gridData);
        });
    }
    
    public exportFile():void{
        this._commonService.exportAsExcelFile(this.gridData,"Mercahnt_");
    }
  
}


export class ExampleDataSource extends DataSource<any> {
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    constructor(private data:any){
        super();
    }
    connect(): Observable<Element[]> {
      return Observable.of(this.data);
    }
  
    disconnect() {}
  }