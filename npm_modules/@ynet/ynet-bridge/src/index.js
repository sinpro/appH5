

let apiexports

if(process.env.PLATFORM){
    apiexports = require('./' + process.env.PLATFORM)
}else{
    apiexports = require('./bridge')
}

export default apiexports.default