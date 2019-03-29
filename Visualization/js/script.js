loadData().then(data => {
    
    let that = this;
    function updateInfo(file){
        infoBox.updatePlot(file);
    }
    const gapPlot = new GapPlot(data,updateInfo);
    const infoBox = new InfoBox('ctg7180000073073_Component#_1');
    // Initialize the plots; pick reasonable default values
    gapPlot.drawPlot();
    gapPlot.updatePlot();
    infoBox.drawPlot();
    
});

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
    let data = d3.csv('../Data/bottleneckDim/MDS_coordinates_0.csv',function(d){
        return{
            NAME:d.Name,
            X:+d.X,
            Y:+d.Y
        };
    });
    return data;
}
