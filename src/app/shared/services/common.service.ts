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

    public fetchData(apiName:string,param:object,methodType:string) :Observable<object>{
        let service = this.http
                .get(this.urlEndPoint+apiName)
                .map(this.parseResponse)
                .do((res) => {
                    // console.log(">>>>>>>");
                })
                .catch((error:any) =>
                {
                    return Observable.throw(error);
                });
        return service;        
    }
    
}