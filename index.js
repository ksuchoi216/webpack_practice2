// var moment = require('moment');

//this is ES2015 import statment
import moment from 'moment';

console.log("Hello from JavaScript!");  
console.log(moment().startOf('day').fromNow());

//This is ES2015 template string 
var name = "Bob", time = "today";  
console.log(`Hello ${name}, how are you ${time}?`);

console.log('Hello ' + name + ', how are you ' + time + '?');

console.log('what the')