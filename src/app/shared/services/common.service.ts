import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommonService {
    // private urlEndPoint:string = "http://localhost:5000/api";
    private urlEndPoint:string = "https://sparklersapi.herokuapp.com/api";

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
            }
            
        }else{
            return data;
        }
    }

    private appendSelectOption(data:any){
        var obj = [{"name":"All Groups","value":-1}]
        for(let i=0;i<data.length;i++){
            obj.push({"name":data[i],"value":data[i]});
        }
        return obj;
    }
    
}