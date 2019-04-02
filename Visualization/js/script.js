
let gapPlot=new GapPlot();
let infoBox = new InfoBox();
loadData().then(data => {
    
    gapPlot.set(data,updateInfo);
    infoBox.set('ctg7180000073073_Component#_1');

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
    let dataFile = document.getElementById('dataset').value;
    let dim=document.getElementById('dimension').value;
    let dir=document.getElementById('distance').value;
    let fileDir='';
    if(dir=='bottleneck')
        fileDir='../Data/bottleneck/';
    else if(dir=='wasserstein')
        fileDir='../Data/wasserstein/';
    try{
        const data = await d3.csv(fileDir+dataFile+dim+'.csv',function(d){
            return{
                NAME:d.Name,
                X:+d.X,
                Y:+d.Y
            };
        });
        gapPlot.updateData(data);
        
    } catch (error) {
        console.log(error);
        alert('Could not load the dataset!');
    }
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
    let data = d3.csv('../Data/bottleneck/MDS_coordinates_0.csv',function(d){
        return{
            NAME:d.Name,
            X:+d.X,
            Y:+d.Y
        };
    });
    return data;
}
