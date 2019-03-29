class GapPlot {

    constructor(data,updateInfo) {


        this.margin = { top: 20, right: 20, bottom: 60, left: 80 };
        this.width = 1310 - this.margin.left - this.margin.right;
        this.height = 700 - this.margin.top - this.margin.bottom;
        
        this.updateInfo=updateInfo;
        this.data = data;



    }


    drawPlot() {
        

        d3.select('#scatter-plot')
            .append('div').attr('id', 'chart-view');

        d3.select('#chart-view')
            .append('div')
            .attr("class", "tooltip")
            .style("opacity", 0);

        d3.select('#chart-view')
            .append('svg').classed('plot-svg', true)
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom);

        let svgGroup = d3.select('#chart-view').select('.plot-svg').append('g').classed('wrapper-group', true);

        
        let xScale = d3.scaleLinear()
                    .range([0,this.width])
                    .domain([Math.floor(this.xmin(this.data)),Math.ceil(this.xmax(this.data))])
                    .nice();
        let yScale = d3.scaleLinear()
                    .range([0,this.height])
                    .domain([Math.ceil(this.ymax(this.data)),Math.floor(this.ymin(this.data))])
                    .nice();
        
        
        svgGroup.append('g')
        .attr('class','x-axis')
        .attr('transform','translate('+this.margin.left+','+(this.height+this.margin.top)+')')
        .call(d3.axisBottom(xScale));

        svgGroup.append('g')
        .attr('class','y-axis')
        .attr('transform','translate('+this.margin.left+','+this.margin.top+')')
        .call(d3.axisLeft(yScale));


        svgGroup.append('text')
        .text('x-axis')
        .attr('x',400)
        .attr('y',this.height+this.margin.top+35)
        .attr('class','x-axis-label');

        svgGroup.append('text')
        .text('y-axis')
        .attr('transform','translate(30,300) rotate(270)')
        .attr('class','y-axis-label');


        svgGroup.append('title').attr('class','title');


    }

    updatePlot() {

        /**
         *  Function to determine the circle radius by circle size
         *  This is the function to size your circles, you don't need to do anything to this
         *  but you will call it and pass the circle data as the parameter.
         * 
         * @param d the data value to encode
         * @returns {number} the radius
         */
        ///////////////////////////////////////////////////////////////////

        //YOUR CODE HERE  
        let that = this;


        let xScale = d3.scaleLinear()
                    .range([0,this.width])
                    .domain([Math.floor(this.xmin(this.data)),Math.ceil(this.xmax(this.data))])
                    .nice();
        let yScale = d3.scaleLinear()
                    .range([0,this.height])
                    .domain([Math.ceil(this.ymax(this.data)),Math.floor(this.ymin(this.data))])
                    .nice();
        //let cScale = d3.scaleLinear
        
        d3.select('.x-axis').call(d3.axisBottom(xScale));
        d3.select('.y-axis').call(d3.axisLeft(yScale));

        
        
        d3.select('.wrapper-group')
        .selectAll('circle')
        .data(that.data)
        .exit().remove();

        d3.select('.wrapper-group')
        .selectAll('circle')
        .data(that.data)
        .enter()
        .append('circle');


        d3.select('.wrapper-group')
        .selectAll('circle').attr('cx',d=>xScale(d.X)+that.margin.left)
        .attr('cy',d=>yScale(d.Y))
        .attr('r',5)
        .on('mouseover',function(d){
            d3.select('.title').text(d.NAME);
        })
        .on('click',function(d){
            that.updateInfo(d.NAME);
            d3.event.stopPropagation();
        });
        

    
    }

    /**
     * Setting up the drop-downs
     * @param xIndicator identifies the values to use for the x axis
     * @param yIndicator identifies the values to use for the y axis
     * @param circleSizeIndicator identifies the values to use for the circle size
     */
    drawDropDown(xIndicator, yIndicator, circleSizeIndicator) {

        let that = this;
        let dropDownWrapper = d3.select('.dropdown-wrapper');
        let dropData = [];

        for (let key in this.data) {
            dropData.push({
                indicator: key,
                indicator_name: this.data[key][0].indicator_name
            });
        }

        /* CIRCLE DROPDOWN */
        let dropC = dropDownWrapper.select('#dropdown_c').select('.dropdown-content').select('select');

        let optionsC = dropC.selectAll('option')
            .data(dropData);


        optionsC.exit().remove();

        let optionsCEnter = optionsC.enter()
            .append('option')
            .attr('value', (d, i) => d.indicator);

        optionsCEnter.append('text')
            .text((d, i) => d.indicator_name);

        optionsC = optionsCEnter.merge(optionsC);

        let selectedC = optionsC.filter(d => d.indicator === circleSizeIndicator)
            .attr('selected', true);

        dropC.on('change', function(d, i) {
            let cValue = this.options[this.selectedIndex].value;
            let xValue = dropX.node().value;
            let yValue = dropY.node().value;
            that.updatePlot(that.activeYear, xValue, yValue, cValue);
        });

        /* X DROPDOWN */
        let dropX = dropDownWrapper.select('#dropdown_x').select('.dropdown-content').select('select');

        let optionsX = dropX.selectAll('option')
            .data(dropData);

        optionsX.exit().remove();

        let optionsXEnter = optionsX.enter()
            .append('option')
            .attr('value', (d, i) => d.indicator);

        optionsXEnter.append('text')
            .text((d, i) => d.indicator_name);

        optionsX = optionsXEnter.merge(optionsX);

        let selectedX = optionsX.filter(d => d.indicator === xIndicator)
            .attr('selected', true);

        dropX.on('change', function(d, i) {
            let xValue = this.options[this.selectedIndex].value;
            let yValue = dropY.node().value;
            let cValue = dropC.node().value;
            that.updatePlot(that.activeYear, xValue, yValue, cValue);
        });

        /* Y DROPDOWN */
        let dropY = dropDownWrapper.select('#dropdown_y').select('.dropdown-content').select('select');

        let optionsY = dropY.selectAll('option')
            .data(dropData);

        optionsY.exit().remove();

        let optionsYEnter = optionsY.enter()
            .append('option')
            .attr('value', (d, i) => d.indicator);

        optionsY = optionsYEnter.merge(optionsY);

        optionsYEnter.append('text')
            .text((d, i) => d.indicator_name);

        let selectedY = optionsY.filter(d => d.indicator === yIndicator)
            .attr('selected', true);

        dropY.on('change', function(d, i) {
            let yValue = this.options[this.selectedIndex].value;
            let xValue = dropX.node().value;
            let cValue = dropC.node().value;
            that.updatePlot(that.activeYear, xValue, yValue, cValue);
        });

    }

    /**
     * Draws the year bar and hooks up the events of a year change
     */
    drawYearBar() {

        // ******* TODO: PART 2 *******
        //The drop-down boxes are set up for you, but you have to set the slider to updatePlot() on activeYear change

        // Create the x scale for the activeYear;
        // hint: the domain should be max and min of the years (1800 - 2020); it's OK to set it as numbers
        // the plot needs to update on move of the slider

        /* ******* TODO: PART 3 *******
        You will need to call the updateYear() function passed from script.js in your activeYear slider
        */
        let that = this;

        //Slider to change the activeYear of the data
        let yearScale = d3.scaleLinear().domain([1800, 2020]).range([30, 730]);

        let yearSlider = d3.select('#activeYear-bar')
            .append('div').classed('slider-wrap', true)
            .append('input').classed('slider', true)
            .attr('type', 'range')
            .attr('min', 1800)
            .attr('max', 2020)
            .attr('value', this.activeYear);

        let sliderLabel = d3.select('.slider-wrap')
            .append('div').classed('slider-label', true)
            .append('svg');

        let sliderText = sliderLabel.append('text').text(this.activeYear);

        sliderText.attr('x', yearScale(this.activeYear));
        sliderText.attr('y', 25);

        yearSlider.on('input', function() {
            //YOUR CODE HERE  
            sliderText.text(this.value);
            sliderText.attr('x', yearScale(this.value));
            let x=d3.select('#dropdown_x').select('.dropdown-content').select('select').node().value;
            let y=d3.select('#dropdown_y').select('.dropdown-content').select('select').node().value;
            let c=d3.select('#dropdown_c').select('.dropdown-content').select('select').node().value;
            that.updatePlot(this.value.toString(),x,y,c);
            d3.select('.activeYear-background').text(this.value);
            that.updateYear(this.value);
        })
        .on('click',function(){
            d3.event.stopPropagation();
        });
    }

    /**
     * Draws the legend for the circle sizes
     *
     * @param min minimum value for the sizeData
     * @param max maximum value for the sizeData
     */
    drawLegend(min, max) {
        // ******* TODO: PART 2*******
        //This has been done for you but you need to call it in updatePlot()!
        //Draws the circle legend to show size based on health data
        let scale = d3.scaleSqrt().range([3, 20]).domain([min, max]);

        let circleData = [min, max];

        let svg = d3.select('.circle-legend').select('svg').select('g');

        let circleGroup = svg.selectAll('g').data(circleData);
        circleGroup.exit().remove();

        let circleEnter = circleGroup.enter().append('g');
        circleEnter.append('circle').classed('neutral', true);
        circleEnter.append('text').classed('circle-size-text', true);

        circleGroup = circleEnter.merge(circleGroup);

        circleGroup.attr('transform', (d, i) => 'translate(' + ((i * (5 * scale(d))) + 20) + ', 25)');

        circleGroup.select('circle').attr('r', (d) => scale(d));
        circleGroup.select('circle').attr('cx', '0');
        circleGroup.select('circle').attr('cy', '0');
        let numText = circleGroup.select('text').text(d => new Intl.NumberFormat().format(d));

        numText.attr('transform', (d) => 'translate(' + ((scale(d)) + 10) + ', 0)');
    }

    /**
     * Reacts to a highlight/click event for a country; draws that country darker
     * and fades countries on other continents out
     * @param activeCountry
     */
    updateHighlightClick(activeCountry) {
        /* ******* TODO: PART 3*******
        //You need to assign selected class to the target country and corresponding region
        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for countries/regions, you can use
        // d3 selection and .classed to set these classes on here.
        // You will not be calling this directly in the gapPlot class,
        // you will need to call it from the updateHighlight function in script.js
        */
        //YOUR CODE HERE  
        let region=d3.select('.wrapper-group').select('#'+activeCountry).attr('class');
        d3.select('.wrapper-group').select('#'+activeCountry).attr('class',''+region+' selected-country');
        d3.select('.wrapper-group').selectAll('circle').filter(function(d){return d.region!=region}).style('opacity','0.2');
    }

    /**
     * Clears any highlights
     */
    clearHighlight() {
        // ******* TODO: PART 3*******
        // Clear the map of any colors/markers; You can do this with inline styling or by
        // defining a class style in styles.css

        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for hosts/teams/winners, you can use
        // d3 selection and .classed to set these classes off here.

        //YOUR CODE HERE  
        d3.select('.wrapper-group')
        .selectAll('circle')
        .attr('class',d=>d.region)
        .attr('style','opacity: 1');
    }

    /**
     * Returns html that can be used to render the tooltip.
     * @param data 
     * @returns {string}
     */
    tooltipRender(data) {
        let text = "<h2>" + data['country'] + "</h2>";
        return text;
    }

    xmax(data){
        let m=0;
        for(let i=0;i<data.length;i++){
            if(m<data[i].X){
                m=data[i].X;
            }
        }
        return m;
    }
    ymax(data){
        let m=0;
        for(let i=0;i<data.length;i++){
            if(m<data[i].Y){
                m=data[i].Y;
            }
        }
        return m;
    }
    xmin(data){
        let m=99999999999999;
        for(let i=0;i<data.length;i++){
            if(m>data[i].X){
                m=data[i].X;
            }
        }
        return m;
    }
    ymin(data){
        let m=99999999999999;
        for(let i=0;i<data.length;i++){
            if(m>data[i].Y){
                m=data[i].Y;
            }
        }
        return m;
    }
}