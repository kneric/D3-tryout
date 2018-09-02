let pieWidth = 500
let pieHeight = 500
let radius = Math.min(pieWidth, pieHeight) / 2

let pieSvg = d3.select(".pie-chart")
  .attr("width", pieWidth)
  .attr("height", pieHeight)

let pieData = [
  {
    'name': 'choco',
    'percentage': 20
  },
  {
    'name': 'milk',
    'percentage': 30
  },
  {
    'name': 'sb',
    'percentage': 40
  },
  {
    'name': 'vanilla',
    'percentage': 40
  },
]

let g = pieSvg.append('g')
  .attr(`transform`, `translate(${radius}, ${radius})`)

let color = d3.scaleOrdinal(["red", "green", "blue", "teal"])

// let color = d3.scaleOrdinal(d3.schemeCategory10)

// let color = d3.scaleLinear()
//   .domain ([0, d3.max(arr)])
//   .range(['red', 'teal'])

let pie = d3.pie()
  .value((d) => {
    return d.percentage
})

let path = d3.arc()
  .outerRadius(radius)
  .innerRadius(0)

let label = d3.arc()
  .outerRadius(radius - 60)
  .innerRadius(radius - 60)

let arc = g.selectAll('arc')
  .data(pie(pieData))
  .enter()
  .append('g')
  .attr('class', 'arc')

arc.append('path')
  .attr('d', path)
  .attr('fill', (d) => {
    return color(d.data.name)
  })

arc.append('text')
  .attr(`transform`, (d) => {
    return `translate (${label.centroid(d)})`
  })
  .text((d) => {
    return `${d.data.name} (${d.data.percentage})`
  })