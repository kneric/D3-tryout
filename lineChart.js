let performanceData = [
  {
    time: 1,
    value: 100,
  },
  {
    time: 2,
    value: 120,
  },
  {
    time: 3,
    value: 90,
  },
  {
    time: 4,
    value: 200,
  },
  {
    time: 5,
    value: 180,
  },
]

function drawChart (arr) {
  let svgWidth = 500
  let svgHeight = 400
  let margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
  }
  let width = svgWidth - margin.left - margin.right
  let height = svgHeight - margin.top - margin.bottom

  let lineSvg = d3.select('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)

  let g = lineSvg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  let x = d3.scaleTime()
    .rangeRound([0, width])

  let y = d3.scaleLinear()
    .rangeRound([height, 0])
    
  let line = d3.line()
    .x((d) => {
      return x(d.time)
    })
    .y((d) => {
      return y(d.value)
    })
    x.domain(d3.extent(arr, (d) => {
      return d.time
    }))
    y.domain(d3.extent(arr, (d) => {
      return d.value
    }))

}