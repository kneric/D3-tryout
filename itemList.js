let arr = [10, 20, 30, 40, 50, 1, 2, 3, 4]  

// d3.selectAll(".numbers")
//   .data(arr)
//   .text((d) => {
//     return "Number: " + d
//   })

let li = d3.select('ul')
  .selectAll("li")
  .data(arr)
  .enter()
  .append("li")
  .text((d) => {
      return "Number: " + d
    })

// li.exit.remove()