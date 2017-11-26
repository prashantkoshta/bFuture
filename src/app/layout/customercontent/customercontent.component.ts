import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { CommonService } from "../../shared/services/common.service";

@Component({
    selector: 'app-customercontent',
    templateUrl: './customercontent.component.html',
    styleUrls: ['./customercontent.component.scss'],
    animations: [routerTransition()]
})
export class CustomerContentComponent implements OnInit {
    public boolShow:boolean = false;
    public visiblePopup:boolean = false;
    public customerObj:any;
    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public barChartData: any[];
    public titleName:string = "Content";
    constructor(private route:ActivatedRoute,private router:Router,private _commonService:CommonService) {
    }

    // events
    public chartClicked(e: any): void {
        // console.log(e.active[0]._index);
        // console.log(e);
        //this.router.navigate(['scatterchart']);
        this.triggerPopup(true);
    }

    // /ChartData/20

    public chartHovered(e: any): void {
        console.log(e);
    }

    public inVal:string = "";

   

    ngOnInit() {
        var ref = this;
        this.route.params.subscribe(params =>{
            if(params.hasOwnProperty("id") && params.id != ""){
                ref.inVal = params.id;
                ref.getCustomerData(ref.inVal);
            }
        });
    }

    public onSubmitCustomerId(custtomerId:string):void{
        this.router.navigate(["/customer-content",custtomerId]);
        // this.getCustomerData(custtomerId);
    }

    private getCustomerData(custtomerId:string):void{
        var ref = this;
    //  /ChartData/20
    //  /getCustomersChartData
    // this._commonService.fetchData("/getCustomersChartData",{},"get").subscribe(data => {
    //        let value = data["data"];
    //        ref.barChartLabels = value["xLabels"];
    //        ref.barChartType = 'bar';
    //        ref.barChartLegend = true;
    //        ref.barChartData = value["data"];
    //        ref.boolShow = true;
    //     });

        this._commonService.fetchData("/ChartData/"+custtomerId,{},"get",'CONVERT_INTO_BARCHART_DATA').subscribe(data => {
            let value = data;
            ref.barChartLabels = value["xLabels"];
            ref.barChartType = 'bar';
            ref.barChartLegend = true;
            ref.barChartData = value["data"];
            ref.boolShow = true;
         });

        this.customerObj = this._commonService.getCustomer(custtomerId);
    }
    
    public triggerPopup(bool):void{
       // this.visiblePopup =bool;
    }
}
