# module

## npm package manager

To use the moment().startOf() function, moment.min.js is stored in the local filesystem.

The following javascript file is executed.
```javascript
console.log("Hello from JavaScript!");  
console.log(moment().startOf('day').fromNow());
```

Before using npm

Download the moment.min.js file to local, and then load the javascript file at html.
```html
    <script src="moment.min.js"></script>
    <script src="index.js"></script>  
```

After using npm

**npm init**
- create package.json

**npm install moment --save**
- download moment and keep track of the moment.js by package.json

```html
    <script src="node_modules/moment/min/moment.min.js"></script>
    <script src="index.js"></script>  
```

## webpack
all the "require" statement are collected, then replace those with actual contents of each required files

To use the moment function in certain javascript, we have to use the "require('moment') function.

```javascript
var moment = require('moment');

console.log("Hello from JavaScript!");  
console.log(moment().startOf('day').fromNow());
```

However, this is not working in the browser because the browser dosen't have access to the your local filesystem.
(detail: which means loading modules in this way is very tricky - loading files has to be done dynamically, either synchronously (which slows down execution) or asynchronously (which can have timing issues).)

### this is webpack
**npm install webpack webpack-cli --save-dev**
- install webpack and webpack-cli, and keep tracking this as development dependency in package.json.

**./node_modules/.bin/webpack index.js --mode=development**
- run the webpack tool, and start with index.js, find any require statements, and replace them with proper code to create a single code. "--mode=development" is to keep the Javascript readable for developers.(otherwise --mode=production)

After using webpack,
```html
<script src="dist/main.js"></script>
```

### this is config.js
However, you have to execute "./node_modules/.bin/webpack index.js --mode=development" each time the index.js is changed. This is cumbersome.
Therefore, we create webpack.config.js to designate the file name and location.

**webpack.config.js**
```javascript
module.exports = {  
  mode: 'development',  
  entry: './index.js',  
  output: {  
    filename: 'main.js',  
    publicPath: 'dist'  
  }  
};
```

After creating the webpack.config.js
**./node_modules/.bin/webpack**
- this is simple version of using webpack with the config.js

## babel - transpiling code
Transpiling code means converting the code in one language to code in another similar language.

**npm install @babel/core @babel/preset-env babel-loader --save-dev**
- the babel/core is the main part, and babell/preset-env is a preset defining which new javascript features to transpile, the babel-loader is a a package to enable babel to work with webpack.

**adding**
```javascript
module.exports = {  
    mode: 'development',  
    entry: './index.js',  
    output: {  
      filename: 'main.js',  
      publicPath: 'dist'  
    },
    module: {  
        rules: [  
          {  
            test: /\.js$/,  
            exclude: /node_modules/,  
            use: {  
              loader: 'babel-loader',  
              options: {  
                presets: ['@babel/preset-env']  
              }  
            }  
          }  
        ]  
    } 
  };
```

You can use the ES2015 format because babel transpilied the code.
```javascript
//this is ES2015 import statment
import moment from 'moment';

console.log("Hello from JavaScript!");  
console.log(moment().startOf('day').fromNow());

//This is ES2015 template string 
var name = "Bob", time = "today";  
console.log(`Hello ${name}, how are you ${time}?`);

console.log('Hello ' + name + ', how are you ' + time + '?');  
```

## task runner(npm scripts)
minifying the bundle file and easy to run


adding build and watch statements at the scripts part of package.json
**package.json**
```
  "scripts": {  
    "test": "echo \"Error: no test specified\" && exit 1",  
    "build": "webpack --progress --mode=production",  
    "watch": "webpack --progress --watch" 
  },  
```

"build" run webpack with the --progress opthion(to show the percent progress) and --mode=production option (to minimizse code for production)
npm run build

"watch" option instead to automatically re-run webpack each time javascript changes.(good for development)
**npm run watch**

Note that the scripts in package.json can run webpack without having to specify the full path ./node_modules/.bin/webpack, since node.js knows the location of each npm module path.

**npm install webpack-dev-server --save-dev**
**npm run serve**
This will automatically open the index.html website in your browser with an address of localhost:8080 (by default). Any time you change your JavaScript in index.js, webpack-dev-server will rebuild its own bundled JavaScript and refresh the browser automatically. 