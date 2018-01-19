"use strict";
const margin = { top: 20, right: 20, buttom: 50, left: 70 };
const width = 320 - margin.left - margin.right;
const height = 600 - margin.top - margin.buttom;
 d3.csv('./../data.csv', (error, data: Array<any>) => {
  console.log(JSON.stringify(data));

  const svg = d3.select('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.buttom)
    .append('g')
    .attr('transform', "translate(" + margin.left + ',' + margin.top + ")");

  const y = d3.scaleLinear()
    .domain([0, 200])
    .range([height, 0]);

  const x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .domain(data.map((d) => { return d.id }));

  const g = svg.selectAll('g')
    .data(data)
    .enter().append('g')
    .attr('transform', (d, i) => { return 'translate(' + x(d.id) + ',0)' })

  g.append('rect')
    .attr('y', (d: CsvData) => { return y(Number(d.value)) })
    .attr('height', (d: CsvData) => { return height - y(Number(d.value)) })
    .attr('width', x.bandwidth());

  svg.append('g')
    .attr('class', 'y axis')
    .call(<any>d3.axisLeft(y));

  svg.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(<any>d3.axisBottom(x));
})


class CsvData {
  id: string
  value: string;
}