# Show Notes

## What the browser wants

- That's what we do with web apps, write code for browsers
- With everything that exists for web devs, its easy to forget fundamentally what we are doing
- Going back to basics to refocus
- Fewer http requests === fast page loads (lets pretend HTTP2 will never be a thing)

### Fundamentally

- Script tags and style tags and etc.: http resources!
- Concurrency can only get you so far
- You can use window to share code between scripts (global state, ew)

## What developers want

- Modules: maintainability! Not going to write all code in one script tag.
- Explicit dependencies: better static analysis, less global state. Don't want to have to pull something off window to use it.
- ES6 is the biggest win for javascript developers in a long time, so naturally it just made everything more complicated to set up
- The only match between browsers and devs: we want performant websites
- JavaScript fatigue is real and dangerous to your health
- Quote from Jason Benterou:

> JS has to solve these problems: [it] runs on devices with hugely different standard libraries and even different basic language features and "deployment" occurs in 500ms or less. Imagine writing Python code for a machine that might or might not even have a for-each iterator. Plus you are usually using JS to manage a rich interactive UI which can lead to extremely complex code if not well-organized. To solve these problems today we can write powerful programs in ES6 and JSX code and use Babel to generate universally-compatible JS, then serialize and compress minimally-useful subsets of the codebase with Webpack.

## What developers do

- Cry then cry some more then call your mum
- Lots of tools to help us solve the problem of disparity between browser and developer
- Transpilation is literally just a compile step, except your compiling from one language to the same language, so we need a nice Web 2.0 term for it
    - Solves the problem of wanting to use new versions of JavaScript
- Concatenation
    - Solves the problem of http requests
    - Solves the problem of using window? Not really.
- Minification - serve less, faster loading
- Overall, tools tools tools tools and then add some tools
- Build tools aren't safe from JavaScript fatigue
- Lots of dependencies, who knows how many MB of Guy Fieri are hanging around in your dev deps
- BibleThump
- It works but it just seems like so much boilerplate before we can do useful things

## DEMO HYPE https://goo.gl/YVD4eP

webpack.config.js
```
const webpack = require('webpack');

module.exports = {
    context: __dirname + '/src',
    entry: {
        main: [
            './styles.css',
            './heyguys',
        ],
        other: './other'
    },
    output: {
        filename: '[name].bundle.js',
        path: 'public/build'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js')
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            }
        ]
    }
};
```

src/heyguys.js
```
import imageCreator from './image-tag-creator';
import _ from 'underscore';

const params = ['https://goo.gl/YVD4eP', 'hey Guy']

var img = imageCreator(...params);

var title = document.createElement('h1');
title.innerText = `The man, the meme, the legend ${_.random(10000)}`;

var body = document.getElementsByTagName('body')[0];
body.appendChild(img);
body.appendChild(title);
```

src/image-tag-creator.js
```
var imageTagCreator = function(url, alt) {
    var img = document.createElement('img');
    img.alt = alt;
    img.src = url;
    return img;
};

module.exports = imageTagCreator;
```

src/other.js
```
import _ from 'underscore';

document.write(_.random(10));
```

src/styles.css
```
h1 {
    text-align: center;
}

img {
    border: 10px solid gold;
}

body {
    margin-left: auto;
    margin-right: auto;
    width: 800px;
    background-color: lightblue;
}
```

public/index.html
```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>Webpack Demo</title>
    </head>
    <body>
        <script src="build/common.js"></script>
        <script src="build/main.bundle.js"></script>
    </body>
</html>
```

public/other.html
```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>Other</title>
    </head>
    <body>
        <script src="build/common.js"></script>
        <script src="build/other.bundle.js"></script>
    </body>
</html>
```

# Takeaways:

We get cocatenation by default! Solves module problem and window problem.
We get transpilation with very little config.
We get minification by default.
Source maps? Easy money.

## Sensible Assumptions

- Basically everything seen in the demo

## Replaces RequireJS

- Talk briefly about requirejs and what problem it solves (modules and explicit dependencies, but does not solve many http requests)

## A Better Browserify

- Briefly about browserify
- Webpack has multiple entry points, chunk sharing
- Browserify more likely baked into gulp config, doesn't know as much about the code base and it's not as pluggable

## Not Perfect

- Bad docs
- "There's more than one way to do it"
