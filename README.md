## CSS units from string
Just like the name, gets all occurrences of css units from a string.
* absolute - px, mm, cm, in, pt, pc, mozmm
* relative - em, ex, ch, rem
* viewport - vh, vw, vmin, vmax
* percentage
* unitless
### Installation
```npm install css-units-from-string --save```
### Usage
```
var unitsFromString = require('css-units-from-string');
var results = unitsFromString('200px 100% 1.25 2.75em');
// results
// [
//   {
//     match: '200px',
//     unit: 'px',
//     type: 'absolute',
//     value: 200,
//     index: 0
//   },
//   {
//     match: '100%',
//     unit: '%',
//     type: 'percentage',
//     value: 100,
//     index: 6
//   },
//   {
//     match: '1.25',
//     unit: null,
//     type: 'unitless',
//     value: 1.25,
//     index: 11
//   },
//   {
//     match: '2.75em',
//     unit: 'em',
//     type: 'relative',
//     value: 2.75,
//     index: 16
//   },
// ]
```

## Building
#### Install
```npm install```

#### Dev
```npm run watch```

#### Test
```npm run test```

then go to: http://localhost:8080/webpack-dev-server

#### Build
```npm run build```
