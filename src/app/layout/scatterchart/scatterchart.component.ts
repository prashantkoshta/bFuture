import { Component, OnInit,ViewChild,AfterViewInit,ElementRef,HostListener } from '@angular/core';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { CommonService } from "../../shared/services/common.service";
import * as d3 from "d3";
//import * as d3 from "d3-scale";

@Component({
    selector: 'app-scatterchart',
    templateUrl: './scatterchart.component.html',
    styleUrls: ['./scatterchart.component.scss'],
    animations: [routerTransition()]
})
export class ScatterChartComponent implements OnInit, AfterViewInit{
    @ViewChild('chartarea')
    chartareaIdentifier: ElementRef;

    private chartAreaWidth:number;
    private chartData:any;
    
    constructor(private route:ActivatedRoute,private router:Router,private _commonService:CommonService) {
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
     // event.target.innerWidth;
     this.chartAreaWidth = this.chartareaIdentifier.nativeElement.offsetWidth;
    //   console.log(this.chartareaIdentifier.nativeElement.offsetWidth);
      this.drawChart(this.chartData);
    }

    ngAfterViewInit() {
        this.chartAreaWidth = this.chartareaIdentifier.nativeElement.offsetWidth;
        // console.log(this.chartareaIdentifier.nativeElement.offsetWidth);
        this.getChartData();
    }

    ngOnInit() {
        var ref = this;
        this.route.params.subscribe(params =>{
            if(params.hasOwnProperty("id") && params.id != ""){
                // ref.inVal = params.id;
                // ref.getCustomerData(ref.inVal);
            }
        });
        
    }

    public getChartData():void{
        var ref = this;
        this._commonService.fetchData("/getScatterChartData",{},"get").subscribe(data => {
           let value = data["data"];
           ref.drawChart(value);
        //    ref.barChartLabels = value["xLabels"];
        //    ref.barChartType = 'bar';
        //    ref.barChartLegend = true;
        //    ref.barChartData = value["data"];
        //    ref.boolShow = true;
        });
    }

   
    private drawChart(data:any):void{
        var ref = this;
        this.chartData = data;
        d3.select("#scatter-plot").selectAll("svg > *").remove();
        d3.selectAll(".tooltip").remove();


        var margin = {
            top:30,
            right:30,
            bottom:30,
            left:30
        };
        var width = this.chartAreaWidth -margin.left-margin.right;
        var height = 700 -margin.top - margin.bottom;

        var x = d3.scaleLinear().range([0,width]);
        var y = d3.scaleLinear().range([height,0]);

        var color = d3.scaleOrdinal(d3.schemeCategory20);//range();
        //var color = d3.scaleOrdinal().domain(d3.extent(data, function (d) { return d.answer; })).range();

        x.domain([0,d3.max(data,function(d){return d.value;})]);
        y.domain([0,d3.max(data,function(d){return d.consequence;})]);

        // x.domain(d3.extent(data, function (d) { return d.value; })).nice();
        // y.domain(d3.extent(data, function (d) { return d.consequence; })).nice();

        

        var tooltip = d3.select("body").append("div")
            .attr("class","tooltip data-tip")
            .style("opacity",0);

       
        var svg = d3.select("#scatter-plot").selectAll("svg")
                .attr("width",width+margin.left+margin.right)
                .attr("height",height+margin.top+margin.bottom)
                .append("g")
                .attr("transform","translate("+margin.left+","+margin.top+")");

        //x-axis
        svg.append("g")
            .attr("class","x axis")
            .attr("transform","translate(0,"+height+")")
            .call(d3.axisBottom(x).tickFormat(function(d,i){
                console.log(">>",data[i])
                return (data[i])?data[i].value_name:"";
            }))
            .style("stroke","#b2b2b2")
            .style("stroke-width","1px")
            .append("text")
            .attr("class","label")
            .attr("x",width)
            .attr("y",-20)
            .attr("text-anchor","end")
            .text("value");
        
        //y-axis
        svg.append("g")
            .attr("class","y axis")
            .call(d3.axisLeft(y).tickFormat(function(d,i){
                return (data[i])?data[i].consequence_name:"";
            }))
            .style("stroke","#b2b2b2")
            .style("stroke-width","1px")
            .append("text")
            .attr("class","label")
            .attr("transform","rotate(-90)")
            .attr("x",0)
            .attr("y",20)
            .attr("dy","0.35em")
            .attr("text-anchor","end")
            .text("consequence");

        //draw dots
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class","dot")
            .attr("r",8)
            .attr("cx",function(d){return x(d.value);})
            .attr("cy",function(d){return x(d.consequence);})
            .style("fill",function(d) {return color(d.answer);})
            .style("stroke",function(d) { return color(d.answer);})
            .style('opacity', .5)
            .style("stroke-width","1px")
            .on("mouseover",function(d){
                d3.select(this).attr("r", 10).style('opacity', 1);
                tooltip.transition()
                .duration(100)		
                .style('opacity', 1)
                .style('background-color', "#b2b2b2")
                .style('border-radius', "5px")
                .style('padding', "5px")
                tooltip.text(`x-v:${d.value},y-c:${d.consequence},${d.answer}`)
                .style('left', `${d3.event.pageX + 15}px`)	
                .style('top', `${d3.event.pageY - 18}px`);
            })
            .on("mouseout",function(d){
                d3.select(this).attr("r",8).style('opacity', 0.5);;
                tooltip.transition()		
                .duration(400)		
                .style('opacity', 0);	
            })
            //.attr("transform","translate(0,"+height+")");
            // .call(d3.axisLeft(y).ticks(null,"$"))
            // .append("text")
            // .attr("class","label")
            // .attr("transform","rotate(-90)")
            // //.attr("y",-6)
            // .attr("dy",".71em")
            // .attr("text-anchor","end")
            // .text("value");   

            //
            svg.selectAll("path")
            .style("stroke","#b2b2b2")
            .style("stroke-width","1px");

            svg.selectAll(".tick")
            .style("stroke","#b2b2b2")
            .style("stroke-width","1px");

            svg.selectAll("text")
            .style("font-size","0.9rem");

            svg.selectAll("text")
            .style("font-size","0.9rem");
    }
}
