import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class CommonService {
    // private urlEndPoint:string = "http://localhost:5000/api";
    // private urlEndPoint:string = "https://sparklersapi.herokuapp.com/api";
    private urlEndPoint:string = "http://ec2-13-126-33-137.ap-south-1.compute.amazonaws.com:2323"

    constructor(private http: Http) { }


    private parseResponse(res:Response){
        let _json = res.json();
        return _json;
    }

    public fetchData(apiName:string,param:object,methodType:string,mapperid:string=null) :Observable<object>{
        // let url:string="http://ec2-13-126-33-137.ap-south-1.compute.amazonaws.com:2323/Customer";
        let service = this.http
                .get(this.urlEndPoint+apiName)
                // .get(url)
                .map(data => this.doMapperAction(data,mapperid))
                .do((res) => {
                    // console.log(">>>>>>>");
                    // debugger;

                })
                .catch((error:any) =>
                {
                    // debugger;
                    return Observable.throw(error);
                });
        return service;        
    }

    private doMapperAction(res:Response,mapperid:string):any{
        let data = this.parseResponse(res);
        if(mapperid){
            if(mapperid == 'GROUPS'){
                return this.appendSelectOption(data);
            }else if(mapperid == "CONVERINTO_NUMBER"){
                return this.convertIntoNumber(data);
            }else if( mapperid == 'CONVERT_INTO_BARCHART_DATA'){
                return this.convertIntoChart(data);
            }else if(mapperid == 'SCATTER_CHART_DATA'){
                return this.dataForCustomerGroup(data);
            }
            
        }else{
            return data;
        }
    }
    private dataForCustomerGroup(data:any){
        let excludedItem = ["Cluster","id","Name","Age","Score","Status","Sex"];
        let yAxisExclusion =  ["Cluster","id","Name","Age","Score","Status","Sex"];
        let yAxisGroups = [];
        for(let i=0;i<data.length;i++){
            let item:any = data[i];
            for(let key in item){
                if(excludedItem.indexOf(key)<0){
                    item[key] = this.getNumber(item[key]);
                }
                if(yAxisExclusion.indexOf(key)<0 && (i ==0) ){
                    yAxisGroups.push(key);
                }
            }
        }
        let obj = {
            data:data,
            yaxisgroup:yAxisGroups
        }
        return obj;
    }
    private convertIntoNumber(data:any){
        for(let i=0;i<data.length;i++){
            data[i].Age = parseInt(data[i].Age);
            data[i].Entertainment = parseInt(data[i].Entertainment);
            // data[i].Cluster = parseInt(data[i].Cluster);
            data[i].Cluster = data[i].Cluster +"_I";
            
        }
        return data;
    }

    private appendSelectOption(data:any){
        var obj = [{"name":"All Groups","value":-1}]
        for(let i=0;i<data.length;i++){
            obj.push({"name":data[i],"value":data[i]});
        }
        return obj;
    }

    private convertIntoChart(data:any){
        let obj = {
            "xLabels": data["XAxis"],
            "data": [{
                "data": Array.from(data['Data'][0].Values).map(val => this.getNumber(val)),
                "label": data['Data'][0].Label
            }, {
                "data": Array.from(data['Data'][1].Values).map(val => this.getNumber(val)),
                "label": data['Data'][1].Label
            }]
        };
        let value = obj;
        return obj
    }

    private getNumber(val){
        return parseFloat(val);
    }
    
}