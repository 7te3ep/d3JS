import {pathClicked} from "./game.js"
const width = window.innerWidth
const height = 800

const projection = d3.geoOrthographic()
.scale(350)
.translate([width / 2, height / 2])
.clipAngle(90) // sans cette option les pays de l'autre côté du globle sont visibles
.precision(.1)
.rotate([0,0,0]);

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


d3.select("svg").attr('id',"map").on("dblclick.zoom", null).on('mousedown.zoom',null).on('touchstart.zoom',null);// Désactive le zoom avec un double click

function zoomed() {
    g
    .selectAll('path') // Pour éviter que la largeur du trait ne soit mise à l'échelle
    .attr('transform', d3.event.transform);
}


//svg.call(d3.drag()
//.on("drag", function() {
//  var xy = d3.mouse(this);
//  projection.rotate(xy)
//  svg.selectAll("path")
//   .attr("d",path);
//}))

const λ = d3.scaleLinear()
    .domain([0, width])
    .range([-180, 180]);

const φ = d3.scaleLinear()
    .domain([0, height])
    .range([90, -90]);

let  drag = d3.drag().subject(function() {
    var r = projection.rotate();
    return {
        x: λ.invert(r[0]),
        y: φ.invert(r[1])
    };
}).on("drag", function(event) {
    projection.rotate([λ(d3.event.x), φ(d3.event.y)]);
    
    svg.selectAll(".country")
        .attr("d", path);
});

svg.call(drag);