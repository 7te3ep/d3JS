import {pathClicked} from "./game.js"
const width = 800
const height = 500

const projection = d3.geoMercator()
  .translate([width / 2, height / 2])
  .scale((width - 1) / 2 / Math.PI);

const path = d3.geoPath()
  .projection(projection);

const zoom = d3.zoom()
  .scaleExtent([0.2, 18])
  .on('zoom', zoomed);

const svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

const g = svg.append('g');

svg.call(zoom);


d3.json('./world.geo.json-master/countries.geo.json')
.then(world => {
  g.selectAll('.country')
    .data(world.features)
    .enter().append('path')
    .attr("id", d => d.properties.name)
    .attr('class', 'country')
    .attr('d', path)
    .style("fill", function(){return "rgb("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")"})
    .on("click",(e)=>{
      pathClicked(e)
    });
});

d3.select("svg").attr('id',"map").on("dblclick.zoom", null); // Désactive le zoom avec un double click

function zoomed() {
    g
    .selectAll('path') // Pour éviter que la largeur du trait ne soit mise à l'échelle
    .attr('transform', d3.event.transform);
}

svg.call(d3.drag()
.on("drag", function() {
  var xy = d3.mouse(this);
  projection.rotate(xy)
  svg.selectAll("path")
   .attr("d",path);
}))