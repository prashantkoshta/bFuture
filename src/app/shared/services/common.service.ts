import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { forEach } from '@angular/router/src/utils/collection';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class CommonService {
    // private urlEndPoint:string = "http://localhost:5000/api";
    // private urlEndPoint:string = "https://sparklersapi.herokuapp.com/api";
    private urlEndPoint: string = "http://ec2-13-126-33-137.ap-south-1.compute.amazonaws.com:2023";
    private _customerList:any;

    constructor(private http: Http) { }


    private parseResponse(res: Response) {
        let _json = res.json();
        return _json;
    }

    public fetchData(apiName: string, param: object, methodType: string, mapperid: string = null): Observable<object> {
        // let url:string="http://ec2-13-126-33-137.ap-south-1.compute.amazonaws.com:2023/Customer";
        let service = this.http
            .get(this.urlEndPoint + apiName)
            // .get(url)
            .map(data => this.doMapperAction(data, mapperid))
            .do((res) => {
                // console.log(">>>>>>>");
                // debugger;

            })
            .catch((error: any) => {
                // debugger;
                return Observable.throw(error);
            });
        return service;
    }

    private doMapperAction(res: Response, mapperid: string): any {
        let data = this.parseResponse(res);
        if (mapperid) {
            if (mapperid == 'GROUPS') {
                return this.appendSelectOption(data);
            } else if (mapperid == "CONVERINTO_NUMBER") {
                return this.convertIntoNumber(data);
            } else if (mapperid == 'CONVERT_INTO_BARCHART_DATA') {
                return this.convertIntoChart(data, "FOR_COLLABORATION");
            } else if (mapperid == 'SCATTER_CHART_DATA') {
                return this.dataForCustomerGroup(data);
            } else if (mapperid == "CONVERT_INTO_BARCHART_CONTENT_DATA") {
                return this.convertIntoChart(data, 'FOR_CONTENT');
            }

        } else {
            return data;
        }
    }
    private dataForCustomerGroup(data: any) {
        let excludedItem = ["Cluster", "id", "Name", "Age", "Score", "Status", "Sex"];
        let yAxisExclusion = ["Cluster", "id", "Name", "Age", "Score", "Status", "Sex"];
        let yAxisGroups = [];
        for (let i = 0; i < data.length; i++) {
            let item: any = data[i];
            for (let key in item) {
                if (excludedItem.indexOf(key) < 0) {
                    item[key] = this.getNumber(item[key]);
                }
                if (yAxisExclusion.indexOf(key) < 0 && (i == 0)) {
                    yAxisGroups.push(key);
                }
            }
        }
        let obj = {
            data: data,
            yaxisgroup: yAxisGroups
        }
        return obj;
    }
    private convertIntoNumber(data: any) {
        for (let i = 0; i < data.length; i++) {
            data[i].Age = parseInt(data[i].Age);
            data[i].Entertainment = parseInt(data[i].Entertainment);
            // data[i].Cluster = parseInt(data[i].Cluster);
            data[i].Cluster = data[i].Cluster + "_I";

        }
        return data;
    }

    private appendSelectOption(data: any) {
        var obj = [{ "name": "All Groups", "value": -1 }]
        for (let i = 0; i < data.length; i++) {
            obj.push({ "name": data[i], "value": data[i] });
        }
        return obj;
    }

    private convertIntoChart(data: any, forScreen: string) {
        let bar1DataIndex: number = 0;
        let bar2DataIndex: number = 1;
        if (data['Data'].length > 2) {
            bar1DataIndex = (forScreen == 'FOR_COLLABORATION') ? 0 : 2;
            bar2DataIndex = (forScreen == 'FOR_COLLABORATION') ? 1 : 3;
        } else {
            bar1DataIndex = (forScreen == 'FOR_COLLABORATION') ? 0 : 0;
            bar2DataIndex = (forScreen == 'FOR_COLLABORATION') ? 1 : 1;
        }
        let obj = {
            "xLabels": data["XAxis"],
            "data": [{
                "data": Array.from(data['Data'][bar1DataIndex].Values).map(val => this.getNumber(val)),
                "label": data['Data'][bar1DataIndex].Label
            }, {
                "data": Array.from(data['Data'][bar2DataIndex].Values).map(val => this.getNumber(val)),
                "label": data['Data'][bar2DataIndex].Label
            }]
        };
        let value = obj;
        return obj
    }

    private getNumber(val) {
        return parseFloat(val);
    }

    public exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

    public setCusomersList(list:any){
        this._customerList = list;
    }

    public getCustomer(id:string):any{
        let len = this._customerList.length;
        for(let i=0;i<len;i++){
            let c:any = this._customerList[i];
            if(c.id == id) {
                return c;
            }
        }
        return null;
    }
   

}