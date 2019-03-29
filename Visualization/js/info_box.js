class InfoBox {
    constructor(name) {


        this.margin = { top: 20, right: 20, bottom: 60, left: 80 };
        this.width = 350 - this.margin.left - this.margin.right;
        this.height = 700 - this.margin.top - this.margin.bottom;
        
        this.name=name;

    }

    drawPlot(){
        let svgPlot=d3.select('#info_box')
        .append('svg')
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", 500);

        d3.select('#info_box')
        .append('div')
        .attr('id','info');

        
        let str=this.name.replace(/#/g,'%23');
        let rect=svgPlot.append('image')
        .attr('x',0)
        .attr('y',20)
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.width + this.margin.left + this.margin.right)
        .attr('xlink:href','../Data/undirected_original_weighted_connected_component_subgraph_representatives/'+str+'.jpg');

        
        svgPlot.append('text')
        .attr('x',0)
        .attr('y',17)
        .text(this.name);

        let t=this.readFile(this.name);
        document.getElementById("info").innerHTML=t.replace(/\n/g,'<br/>');
        
        console.log(t);
    }

    updatePlot(name='ctg7180000073073_Component#_1'){
        let str=name.replace(/#/g,'%23');
        let fileName='';
        if(name=='ctg7180000073073_Component#_1')
        fileName='../Data/undirected_original_weighted_connected_component_subgraph_representatives/ctg7180000073073_Component%23_1.jpg';
        else 
        fileName='../Data/undirected_original_weighted_connected_component_subgraph_representatives/undirected_weighted_connected_component_subgraph_representatives_'+str+'.jpg';
        d3.select('image').attr('xlink:href',fileName);
        d3.select('#info_box').select('text').text(name);

        let t=this.readFile(name);
        document.getElementById("info").innerHTML=t.replace(/\n/g,'<br/>');
        this.name=name;
    }

    readFile(name){
        let str=name.replace(/#/g,'%23');
        let fileName='';
        if(name=='ctg7180000073073_Component#_1')
        fileName='../Data/undirected_original_weighted_connected_component_subgraph_representatives/ctg7180000073073_Component%23_1.txt';
        else 
        fileName='../Data/undirected_original_weighted_connected_component_subgraph_representatives/undirected_weighted_connected_component_subgraph_representatives_'+str+'.txt';
        
        let xhr = new XMLHttpRequest(),
        okStatus = document.location.protocol === "file:" ? 0 : 200;
        xhr.open('GET', fileName, false);
        xhr.overrideMimeType("text/html;charset=utf-8");//默认为utf-8
        xhr.send(null);
        return xhr.status === okStatus ? xhr.responseText : null;
        
    }

}