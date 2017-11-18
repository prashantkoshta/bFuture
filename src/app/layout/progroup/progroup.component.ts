import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { CommonService } from "../../shared/services/common.service";
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-progroup',
    templateUrl: './progroup.component.html',
    styleUrls: ['./progroup.component.scss'],
    animations: [routerTransition()]
})
export class ProGroupComponent implements OnInit {
    public dataSource;
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public listProduct:Array<any> = [];
    public listCustomer:Array<any> = [];
    public columns:Array<any> = [];
    public displayedColumns:Array<string> = [];

    constructor(private _commonService:CommonService) {
        this.listProduct = [];
        this.listCustomer = [];
        this.displayedColumns = ['customer_id' ,'customer_name','zipcode','avg_proability'];
      
        this.sliders.push({
            imagePath: 'assets/images/slider1.jpg',
            label: 'First slide label',
            text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
        }, {
            imagePath: 'assets/images/slider2.jpg',
            label: 'Second slide label',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }, {
            imagePath: 'assets/images/slider3.jpg',
            label: 'Third slide label',
            text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
        });

        this.alerts.push({
            id: 1,
            type: 'success',
            message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
        }, {
            id: 2,
            type: 'warning',
            message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
        });
    }

    ngOnInit() {
        var ref= this;
        this._commonService.fetchData("/getProducts",{},"get").subscribe(data => {
            ref.listProduct = data["data"];
            ref.getCutomers(ref.listProduct[0].id);
        });
    }
    
    private getCutomers(p_id:string):void{
        var ref = this;
        this._commonService.fetchData("/getCustomers",{},"get").subscribe(data => {
            this.listCustomer = data["data"];
            ref.dataSource = new ExampleDataSource(this.listCustomer);
        });
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    public onProductSelect(id:string){
        this.getCutomers(id);
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