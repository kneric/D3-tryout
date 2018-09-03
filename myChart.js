// Dimensions of sunburst.
let vWidth = 700;
let vHeight = 700;
let vRadius = Math.min(vWidth, vHeight) / 2;
let vColor = d3.scaleOrdinal(d3.schemeCategory10);

let vData = {
  name: "App Store",
  children: [
    {
      name: "Games",
      children: []
    },
    {
      name: "Book",
      children: []
    },
    {
      name: "Business",
      children: []
    },
    {
      name: "Education",
      children: []
    },
    {
      name: "Entertainment",
      children: []
    },
    {
      name: "Finance",
      children: []
    },
    {
      name: "Lifestyle",
      children: []
    },
    {
      name: "Music",
      children: []
    },
    {
      name: "Productivity",
      children: []
    },
    {
      name: "Social Networking",
      children: []
    },
    {
      name: "Utilities",
      children: []
    },
  ]
};

d3.csv('AppleStore.csv')
  .then((data) => {
    data.forEach(app => {
      let obj = {
        name: app.track_name,
        popularity: app.rating_count_tot
      }
      for(let i in vData.children){
        if(app.prime_genre == vData.children[i].name){
          vData.children[i].children.push(obj)
        }
      }
    });
    drawSunburst (vData)
  })

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

function drawSunburst (data) {
  var vRoot = d3.hierarchy(vData)
  .sum((d) => {
    return d.popularity
  })
  let vNodes = vRoot.descendants()
  vLayout(vRoot)
  
  let vSlices = g.selectAll('g')
    .data(vNodes)
    .enter()
    .append ('g')
  
  vSlices.append('path')
    .attr('display', (d)=> {
      return d.depth ? null : 'none'
    })
    .attr('d', vArc)
    .style('stroke', '#fff')
    .style('fill', (d) => {
      return vColor((d.children ? d : d.parent).data.name)
    })
  
  vSlices.append('text')
    .filter((d) => {
      return d.parent
    })
    .attr('transform', (d) => {
      return `translate(${vArc.centroid(d)})rotate(${textRotation(d)})`
    })
    .attr('dx', '-20')
    .attr('dy', '.5em')
    .text((d) => {
      return d.data.name
    })
}

function textRotation(d){
  let angle = (d.x0 + d.x1) / Math.PI * 90

  // prevent upside-down text
  return (angle < 90 || angle > 270) ? angle : angle + 180
}
