// Dimensions of sunburst.
let vWidth = 700;
let vHeight = 700;
let vRadius = Math.min(vWidth, vHeight) / 2;
let vColor = d3.scaleOrdinal(d3.schemeCategory10);

let vData = {
  name: "Mobile Apps",
  children: [
    {
      category: "Games",
      children: [
        {
          name: "Pacman",
          price: 50,
          rating: 4,
          popularity: 5000
        },
        {
          name: "FF 7",
          price: 10,
          rating: 5,
          popularity: 10000
        }
      ]
    },
    {
      category: "Apps",
      children: [
        {
          name: "Evernote",
          price: 5,
          rating: 4.5,
          popularity: 50000
        },
        {
          name: "Alarm",
          price: 0,
          rating: 5,
          popularity: 100000
        }
      ]
    }
  ]
};

let g = d3.select('svg')
  .attr('width', vWidth)
  .attr('height', vHeight)
  .append('g')
  .attr('transform', `translate(${vWidth / 2}, ${vHeight / 2})`)

let vLayout = d3.partition()
  .size([2 * Math.PI, vRadius])

let vArc = d3.arc()
  .startAngle((d) => {
    return d.x0
  })
  .endAngle((d) => {
    return d.x1
  })
  .innerRadius((d) => {
    return d.y0
  })
  .outerRadius((d) => {
    return d.y1
  })

let vRoot = d3.hierarchy(vData)
  .sum((d) => {
    return d.popularity
  })

let vNodes = vRoot.descendants()
vLayout(vRoot)

let vSlices = g.selectAll('path')
  .data(vNodes)
  .enter()
  .append ('path')

vSlices.filter((d) => {
  return d.parent
})
  .attr('d', vArc)
  .style('stroke', '#fff')
  .style('fill', (d) => {
    return vColor((d.children ? d : d.parent).data.name)
  })