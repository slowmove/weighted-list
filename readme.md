weighted-list
===

A small package with the concept of weighted list, where you can get items sorted by weight but also get a weighted random item

[![NPM](https://nodei.co/npm/weighted-list.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/weighted-list/)

## Installation
``` npm install --save weighted-list ```

## Usage

WeigtedList is a super set of the JavaScript [Set Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) which enables you to reach all of its method.
Upon that the `add` method now takes both the value to store, but also an optional weight.
There's also methods to `sort` by the weight (either descending or ascending) as well as receiving a weighted `random` object out of the set.

### Add

```js
const WeightedList = require("weighted-list");

const weightedList = new WeightedList();

weightedList.add("Beef", 8);
weightedList.add("Vegetables", 2);
weightedList.add("Wine", 10);
```

### fromArray

You can also batch insert data from an array.
Either as objects with `key` and `weight` or as single strings which will get the default weight (1).

```js
const WeightedList = require("weighted-list");
const fruits = [
  { key: "orange", weight: 10 },
  { key: "banana", weight: 2 },
  { key: "apple", weight: 5 }
];

const weightedList = new WeightedList();
weightedList.fromArray(fruits);
```

### Sort

```js
const descendingSet = weightedList.sort(); // Descending is default, can also be set by DESC
const listDesc = Array.from(descendingSet);
listDesc.forEach(item => {
  console.log(`${item.key} has the weight ${item.weight}`);
});
```

Results in

```
Wine has the weight 10
Beef has the weight 8
Vegetables has the weight 2
```

```js
const ascendingSet = weightedList.sort("ASC");
const listAsc = Array.from(ascendingSet);
listAsc.forEach(item => {
  console.log(`${item.key} has the weight ${item.weight}`);
});
```

Results in

```
Vegetables has the weight 2
Beef has the weight 8
Wine has the weight 10
```

### Random

```js
weightedList.random();
```

Which will most often give you _Wine_ as it is the one with highest weight and so on.
