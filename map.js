const width = window.innerWidth;
const height = window.innerHeight;

const projection = d3.geoMercator()
  .translate([width / 2, height / 2])
  .scale((width - 1) / 2 / Math.PI);

const path = d3.geoPath()
  .projection(projection);

const zoom = d3.zoom()
  .scaleExtent([1, 14])
  .on('zoom', zoomed);

const svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

const g = svg.append('g');

svg.call(zoom);

d3.json('//unpkg.com/world-atlas@1/world/110m.json')
.then(world => {
  d3.json('./countries.json')
      .then(isoCodes => {
          const countries = topojson.feature(world, world.objects.countries).features;
          console.log(countries)
          countries.forEach(country => {
              const isoCode = isoCodes.find(c => c["country-code"] === country.id);
              if (isoCode) {
                  country.properties.isoCode = isoCode['name'];
              }
          });

          g.selectAll('.country')
            .data(countries)
            .enter()
            .append('path')
            .attr("id", d => d.properties.isoCode)
            .attr('class', 'country')
            .attr('d', path);
      });
});

d3.select("svg").on("dblclick.zoom", null);

function zoomed() {
    g
    .selectAll('path') // To prevent stroke width from scaling
    .attr('transform', d3.event.transform);
}