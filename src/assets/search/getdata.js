import data from '../../data.json'

export const arr=[];


Object.keys(data).forEach(function(key, index) {

  arr.push(data[key])
});




