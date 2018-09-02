let barData = [10, 20, 30, 40, 50, 1, 2, 3, 4]  

let svgWidth = 500
let svgHeight = 300
  
// THE CONTAINER
let svg = d3.select("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

// SCALE
let yScale = d3.scaleLinear()
  .domain([0, d3.max(barData)])
  .range([svgHeight, 0])

let xScale = d3.scaleLinear()
  .domain([0, d3.max(barData)])
  .range([0, svgWidth])

let xAxis = d3.axisBottom()
  .scale(xScale)

let yAxis = d3.axisLeft()
  .scale(yScale)

svg.append('g')
    .attr('transform', 'translate(30, 10)')
    .call(yAxis)

let xAxisTranslate = svgHeight - 20

svg.append('g')
    .attr('transform', `translate(30, ${xAxisTranslate})`)
    .call(xAxis)

// SVG LINE & CIRCLE

let line = svg.append('line')
  .attr('x1', 100)
  .attr('x2', 450)
  .attr('y1', 10)
  .attr('y2', 10)
  .attr('stroke', 'red')

let circle = svg.append('circle')
  .attr('cx', 250)   //centerX
  .attr('cy', 100)   //centerY
  .attr('r', 50)
  .attr('fill', 'blue')

let barPadding = 5
let barWidth = (svgWidth / barData.length)

// THE BAR
let bar = svg.selectAll("rect")
  .data(barData)
  .enter()
  .append("rect")
  .attr("y", function (d) {
    // return svgHeight - yScale(d)
    return svgHeight - (d) - 20
  })
  .attr("height", function (d) {
    // return yScale(d)
    return (d)
  })
  .attr("width", (barWidth - barPadding))
  .attr("transform", function (d, i) {
    let x = barWidth * i + 30
    return `translate (${x})`
  })
  .attr('fill', 'teal')

// LABEL FOR BAR
let text = svg.selectAll('text')
  .data(barData)
  .enter()
  .append('text')
  .text((d) => {
    return d
  })
  .attr('y', (d,i) => {
    return svgHeight - d - 5
  })
  .attr('x', (d,i) => {
    return barWidth * i + 10
  })
  .attr('fill', 'red')