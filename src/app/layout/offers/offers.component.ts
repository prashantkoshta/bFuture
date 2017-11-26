import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';
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
    public boolShow:boolean = false;
    public dataSource;
    public gridData:any;
    public displayedColumns:any;
    public inVal:string = "";
    public listProduct:any;
    public selItem:any;

    constructor(private route:ActivatedRoute,private router:Router,private _commonService:CommonService) {
        this.gridData = [];
        this.displayedColumns = [
            // "Cluster",
            // "name",
            "CustId",
            "ContAvgPred",
            "ContPred",
            "CollabAvgPred",
            "CollabPred"
            ];
    }

    ngOnInit() {
        var ref = this;
        // this.route.params.subscribe(params =>{
        //     if(params.hasOwnProperty("id") && params.id != ""){
        //         ref.inVal = params.id;
        //         ref.getCustomerData(ref.inVal);
        //     }
        // });
        this.getMerchantData();
    }
    
    public onGroupSelect(id:any){
        this.getCustomerData(id);
    }

    public onSubmitCustomerId(custtomerId:string):void{
        this.router.navigate(["/offers",custtomerId]);
    }

    private getMerchantData(){
        var ref = this;
        this._commonService.fetchData("/Merchant",{},"get").subscribe(data => {
            ref.listProduct = data;
            ref.getCustomerData(ref.listProduct[0].id)
        });
    }

    private getCustomerData(custtomerId:string):void{
        var ref = this;
        this._commonService.fetchData("/Offers/"+custtomerId,{},"get",null).subscribe(data => {
            ref.gridData = data;
            ref.selItem = ref.gridData[0];
            ref.dataSource = new ExampleDataSource(ref.gridData);
            ref.boolShow = true;
         });
    }

    public exportFile():void{
        this._commonService.exportAsExcelFile(this.gridData,"Offers_");
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