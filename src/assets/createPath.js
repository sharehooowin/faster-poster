const fs = require('fs')
const path = require('path')
let dirList = ['img']
let imgList = []
dirList.map(item=>{
    let files = fs.readdirSync(__dirname+'/'+item).map(i=>{
        return './'+item+'/'+i
    })
    imgList = imgList.concat(files)
})
let str1 = ''
let str2 = '\nexport default [\n'
imgList.map((item,index)=>{
    str1 += `import img${index} from \'${item}\'\n`
    str2 += `img${index},\n`
})
str2 += ']'
fs.writeFileSync(__dirname + '/index.js', str1+str2)