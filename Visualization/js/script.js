
let gapPlot=new GapPlot();
let infoBox = new InfoBox();
loadData().then(data => {
    let ordinalScale = d3.scaleOrdinal()
	                .domain(['g101','g117','g120','g128',
                    'g13','g137','g150','g161',
                    'g168','g171','g172','g173',
                    'g175','g185','g186','g215',
                    'g470','g503','g530','g546',
                    'g563','g570','g572','g583',
                    'g595','g596','g600','g74'])
                    .range(['pink','hotpink','deeppink','palevioletred',
                    'crimson','red','orangered','darkorange',
                    'yellow','papayawhip','peachpuff','darkkhaki',
                    'gold','rosybrown','chocolate','olive',
                    'yellowgreen','limegreen','lawngreen','springgreen',
                    'aqua','aquamarine','lightsteelblue','blue',
                    'plum','fuchsia','violet','mediumorchid']);
    gapPlot.set(data,updateInfo,ordinalScale);
    infoBox.set('g13',ordinalScale);

    let that = this;
    function updateInfo(file){
        infoBox.updatePlot(file);
    }
    
    // Initialize the plots; pick reasonable default values
    gapPlot.drawPlot();
    gapPlot.updatePlot();
    infoBox.drawPlot();
    
});

async function changeData(){
    let dataset = document.getElementById('dataset').value;
    let dim=document.getElementById('dimension').value;
    let dist=document.getElementById('distance').value;
    let method=document.getElementById('method').value
    
    //try{
        const data = await d3.csv(dataset+method+dist+dim,function(d){
            return{
                NAME:d.Name,
                X:+d.X,
                Y:+d.Y
            };
        });
        gapPlot.updateData(data);
        
    //} catch (error) {
    //    console.log(error);
    //    alert('Could not load the dataset!');
    //}
}
async function loadFile(file) {
    let data = await d3.csv(file).then(d => {
        let mapped = d.map(g => {
            for (let key in g) {
                let numKey = +key;
                if (numKey) {
                    g[key] = +g[key];
                }
            }
            return g;
        });
        return mapped;
    });
    return data;
}

async function loadData() {
    let data = d3.csv('../Data/original/mds_BottleNeck Distance Dim[0].txt',function(d){
        return{
            NAME:d.Name,
            X:+d.X,
            Y:+d.Y
        };
    });
    return data;
}
