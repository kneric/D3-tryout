const fs = require('fs');

let appList = fs.readFileSync('AppleStore.csv').toString().split('\n')

let appsArr = []

let dataSet = {
  name: 'Apps',
  children: [
    {
      category: 'Games',
      children: []
    },
    {
      category: 'Productivity',
      children: []
    },
    {
      category: 'Music',
      children: []
    },
    {
      category: 'Social Networking',
      children: []
    },
    {
      category: 'Utilities',
      children: []
    }
  ]
}

// for(let i = 1; i < 101; i++){
//   appsArr.push(appList[i].split(','))
// }


console.log(appList[4].split(','));

for(let i in appsArr){
  for(let j in dataSet.children){
    if(appsArr[i][12] == dataSet.children[j].category){
      dataSet.children[j].children.push({
        name: appsArr[i][2],
        popularity: appsArr[i][6]
      })
    } 
  }
}

console.log(dataSet);