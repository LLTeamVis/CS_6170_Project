class InfoBox {

    constructor() {
        this.margin = { top: 20, right: 20, bottom: 60, left: 80 };
        this.width = 800 - this.margin.left - this.margin.right;
        this.height = 580 - this.margin.top - this.margin.bottom;
        this.name=null;
    }

    set(name) {
        this.name=name;
    }

    drawPlot(){
        let that=this;
        let radius=15;
        let svgGroup=d3.select('#info_box')
        .append('svg')
        .attr('class','svg1')
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom);
        d3.select('#info_box').append('svg').attr('class','svg2')
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height-200);
        d3.select('.svg2').append('g');
        let svgPlot=svgGroup.append('g');

        let i=0;
        d3.csv('../Data/graph/ENZYMES_'+this.name+'.edges',function(d){
            return {
                source:d.Source-1,
                target:d.Target-1,
                index:i++
            };
        }).then(edges=>{
            let max=d3.max(edges,function(d){
                return d.source>d.target?d.source:d.target;
            });
            let n=new Array();
            for(let i=0;i<max+1;i++)
            n.push(i);
            let nodes=n.map(function(value,index){
                return {Name:index};
            })
            let force = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody().strength(-80))
            .force('center', d3.forceCenter((this.width + this.margin.left + this.margin.right) / 2, (this.height + this.margin.top + this.margin.bottom) / 2))
            .force('collision', d3.forceCollide().radius(radius+15))
            .force('link', d3.forceLink().links(edges))
            .on('tick', ticked);

            function ticked() {
                updateEdges();
                updateNodes();
            }
            function updateNodes(){
                var u = svgPlot
                  .selectAll('circle')
                  .data(nodes);
              
                u.enter()
                  .append('circle')
                  .attr('r', radius)
                  .merge(u)
                  .attr('cx', function(d) {
                    return d.x = Math.max(radius, Math.min(that.width + that.margin.left + that.margin.right - radius, d.x));
                  })
                  .attr('cy', function(d) {
                    return d.y  = Math.max(radius, Math.min(that.height + that.margin.top + that.margin.bottom - radius, d.y));
                  })
                  .style('fill','bbb')
                  .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));
              
                u.exit().remove();
    
                var t = svgPlot
                .selectAll('text')
                .data(nodes);
            
                t.enter()
                    .append('text')
                    .text(d=>d.Name)
                    .merge(t)
                    .attr('x', function(d) {
                        let n=+d.Name;
                        if(n>=10)
                        return d.x-9;
                        else return d.x-5;
                    })
                    .attr('y', function(d) {
                    return d.y+5
                    })
                    .attr('font-size', 15)
                    .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));
            
              t.exit().remove();
            }
            function updateEdges(){
                var u = svgPlot
                    .selectAll('line')
                    .data(edges)
    
                u.enter()
                .append('line')
                .merge(u)
                .attr('x1', function(d) {
                  return d.source.x
                })
                .attr('y1', function(d) {
                  return d.source.y
                })
                .attr('x2', function(d) {
                  return d.target.x
                })
                .attr('y2', function(d) {
                  return d.target.y
                })
                .style('stroke','ccc');
    
                u.exit().remove()
            }
    
            function dragstarted(d) {
                if (!d3.event.active) force.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }
              
            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }
              
            function dragended(d) {
                if (!d3.event.active) force.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }
        })
        svgGroup.append('text')
        .attr('class','graphName')
        .attr('x',0)
        .attr('y',17)
        .text(this.name);   
        d3.select('.svg2').append('text')
        .attr('class','graphName')
        .attr('x',0)
        .attr('y',17)
        .text('');
    }

    updatePlot(name='g13'){
        let that=this;
        let radius=15;
        let subgraph=name;
        if(name.indexOf('#')>=0){
          this.name=name.substring(0,name.indexOf('#')-1);
        }
        else{
          this.name=name;
        }
        let svgGroup=d3.select('#info_box')
        .select('.svg1');
        let svgPlot=svgGroup.select('g');
        svgGroup.select('.graphName')
        .text(this.name); 


        let i=0;
        d3.csv('../Data/graph/ENZYMES_'+this.name+'.edges',function(d){
            return {
                source:d.Source-1,
                target:d.Target-1,
                index:i++
            };
        }).then(edges=>{
            let max=d3.max(edges,function(d){
                return d.source>d.target?d.source:d.target;
            });
            let n=new Array();
            for(let i=0;i<max+1;i++)
            n.push(i);
            let nodes=n.map(function(value,index){
                return {Name:index};
            })
            let force = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody().strength(-80))
            .force('center', d3.forceCenter((this.width + this.margin.left + this.margin.right) / 2, (this.height + this.margin.top + this.margin.bottom) / 2))
            .force('collision', d3.forceCollide().radius(radius+15))
            .force('link', d3.forceLink().links(edges))
            .on('tick', ticked);

            function ticked() {
                updateEdges();
                updateNodes();
            }
            function updateNodes(){
                var u = svgPlot
                  .selectAll('circle')
                  .data(nodes);
              
                u.enter()
                  .append('circle')
                  .attr('r', radius)
                  .merge(u)
                  .attr('cx', function(d) {
                    return d.x = Math.max(radius, Math.min(that.width + that.margin.left + that.margin.right - radius, d.x));
                  })
                  .attr('cy', function(d) {
                    return d.y = Math.max(radius, Math.min(that.height + that.margin.top + that.margin.bottom - radius, d.y));
                  })
                  .style('fill','bbb')
                  .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));
              
                u.exit().remove();
    
                var t = svgPlot
                .selectAll('text')
                .data(nodes);
            
                t.enter()
                    .append('text')
                    .text(d=>d.Name)
                    .merge(t)
                    .attr('x', function(d) {
                        let n=+d.Name;
                        if(n>=10)
                        return d.x-9;
                        else return d.x-5;
                    })
                    .attr('y', function(d) {
                    return d.y+5
                    })
                    .attr('font-size', 15)
                    .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));
            
              t.exit().remove();
            }
            function updateEdges(){
                var u = svgPlot
                    .selectAll('line')
                    .data(edges)
    
                u.enter()
                .append('line')
                .merge(u)
                .attr('x1', function(d) {
                  return d.source.x
                })
                .attr('y1', function(d) {
                  return d.source.y
                })
                .attr('x2', function(d) {
                  return d.target.x
                })
                .attr('y2', function(d) {
                  return d.target.y
                })
                .style('stroke','aaa');
    
                u.exit().remove()
            }
    
            function dragstarted(d) {
                if (!d3.event.active) force.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }
              
            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }
              
            function dragended(d) {
                if (!d3.event.active) force.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }
        })
        ///////////////////////////////////////
        if(name.indexOf('#')>=0){
          d3.select('.svg2').style('opacity',1);
          d3.select('.svg2').select('.graphName')
            .text(name);
          i=0;
          subgraph=subgraph.replace(/#/g,'%23');
          d3.csv('../Data/graph/ENZYMES_'+subgraph+'.csv',function(d){
              return {
                  source:d.Source-1,
                  target:d.Target-1,
                  index:i++
              };
        }).then(edges=>{
            let max=d3.max(edges,function(d){
                return d.source>d.target?d.source:d.target;
            });
            let n=new Array();
            for(let i=0;i<max+1;i++)
            n.push(i);
            let nodes=n.map(function(value,index){
                return {Name:index};
            })
            let force = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody().strength(-10))
            .force('center', d3.forceCenter((this.width + this.margin.left + this.margin.right) / 2, (that.height-200) / 2))
            .force('collision', d3.forceCollide().radius(radius+15))
            .force('link', d3.forceLink().links(edges))
            .on('tick', ticked);
            let svgPlot=d3.select('#info_box').select('.svg2').select('g');
            function ticked() {
                updateEdges();
                updateNodes();
            }
            
            function updateNodes(){
                var u = svgPlot
                  .selectAll('circle')
                  .data(nodes);
              
                u.enter()
                  .append('circle')
                  .attr('r', radius)
                  .merge(u)
                  .attr('cx', function(d) {
                    return d.x = Math.max(radius, Math.min(that.width + that.margin.left + that.margin.right - radius, d.x));
                  })
                  .attr('cy', function(d) {
                    return d.y = Math.max(radius, Math.min(that.height-200 - radius, d.y));
                  })
                  .style('opacity',d=>{
                    if(that.IsSub(edges,d.Name))
                    return 1;
                    else return 0;
                  })
                  .style('fill','bbb')
                  .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));
              
                u.exit().remove();
    
                var t = svgPlot
                .selectAll('text')
                .data(nodes);
            
                t.enter()
                    .append('text')
                    .text(d=>d.Name)
                    .merge(t)
                    .attr('x', function(d) {
                        let n=+d.Name;
                        if(n>=10)
                        return d.x-9;
                        else return d.x-5;
                    })
                    .attr('y', function(d) {
                    return d.y+5
                    })
                    .attr('font-size', 15)
                    .style('opacity',d=>{
                      if(that.IsSub(edges,d.Name))
                      return 1;
                      else return 0;
                    })
                    .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));
            
              t.exit().remove();
            }
            function updateEdges(){
                var u = svgPlot
                    .selectAll('line')
                    .data(edges)
    
                u.enter()
                .append('line')
                .merge(u)
                .attr('x1', function(d) {
                  return d.source.x
                })
                .attr('y1', function(d) {
                  return d.source.y
                })
                .attr('x2', function(d) {
                  return d.target.x
                })
                .attr('y2', function(d) {
                  return d.target.y
                })
                .style('stroke','aaa');
    
                u.exit().remove()
            }
    
            function dragstarted(d) {
                if (!d3.event.active) force.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }
              
            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }
              
            function dragended(d) {
                if (!d3.event.active) force.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }
        })
        }
        else{
          d3.select('.svg2').style('opacity',0);
        }
        
    }

    IsSub(edges,name){
      let sub=false;
      edges.forEach(d => {
        if(d.source.Name==name||d.target.Name==name)
          sub=true;
      });
      return sub;
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
