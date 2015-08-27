# valid-sift [![Build Status](https://travis-ci.org/stoeffel/valid-sift.svg?branch=master)](https://travis-ci.org/stoeffel/valid-sift) [![Coverage Status](https://coveralls.io/repos/stoeffel/valid-sift/badge.svg?branch=master&service=github)](https://coveralls.io/github/stoeffel/valid-sift?branch=master)

> Check if something is a valid [sift][s] filter.

[![NPM](https://nodei.co/npm/valid-sift.png?downloads=true&stars=true)](https://nodei.co/npm/valid-sift/)

## Install

```
$ npm install --save valid-sift
```


## Usage

### Importing

```js
import isValid from 'valid-sift';
```
or
```js
var isValid = require('valid-sift');
```

### Checking a sift filter

If the filter is valid the function returns `true`.
```js
const siftFilter = {
  name: {
    $or: [{$eq: 'Max'}, {$eq: 'Moritz', age: 13}]
  }
};

const allowedAttributes = ['name', 'age'];

valid(siftFilter, ...allowedAttributes); // => true
```

If you pass a filter with a not allowed attribute it returns `false`.
```js
const siftFilter = {
  id: { // <= `id` is not allowed
    $or: [{$eq: 12}, {$eq: 13}]
  }
};

const allowedAttributes = ['name', 'age'];

valid(siftFilter, ...allowedAttributes); // => false
```

If you pass a filter with an invalid operator it returns `false`.
```js
const siftFilter = {
  id: {
    $or: [{$eq: 12}, {$nope: 13}] // <= `$nope` isn't a valid operator
  }
};
valid(siftFilter); // => false
```

### API

`isValid(filter, [attribute, ...]) => boolean`

* `filter` - the filter to check.
* `attribute` - Allowed attributes in the filter.

or pass the attributes as an array.

`isValid(filter, attributes) => boolean`

* `attributes` - Allowed attributes in the filter as an array.


## License

MIT © [Stoeffel](http://stoeffel.github.io)



[s]: https://github.com/crcn/sift.js
