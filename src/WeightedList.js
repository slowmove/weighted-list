require("./WeightedListItem");

/**
 * A superset of the Set Object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 * That has method for setting weight on a saved key as well as get a random saved value selected by its weight
 */
class WeightedList extends Set {
  constructor(...args) {
    super(...args);
  }

  /**
   * Adding data
   * If the key already exists, it will update the weight
   *
   * @param {string} key the value to have a weight
   * @param {string} [weight] the weight to reflect its importance
   */
  add(key, weight = 1) {
    const existing = this.toArray().find((item) => item.key === key);
    if (existing) {
      super.delete(existing);
    }
    super.add({ key, weight });
  }

  /**
   * Insert your array data into the weighted list
   *
   * @param {WeightedListItem[]} source The array from which to create the set
   */
  fromArray(source) {
    source.forEach((item) => {
      if (typeof item === "string") this.add(item);
      if (typeof item === "object") {
        try {
          this.add(item.key, item.weight);
        } catch (error) {
          throw new Error(
            "Each item in the array must have the properties key and weight"
          );
        }
      }
    });
  }

  /**
   * Sort the set by weight, descending (default) or ascending
   *
   * @param {string} [order] DESC or ASC
   * @returns {IterableIterator<WeightedListItem>} a set of items, ordered by request
   */
  sort(order = "DESC") {
    const list = this.toArray();
    super.clear();
    order = order.toLowerCase();
    switch (order) {
      case "asc":
        list.sort((a, b) => a.weight - b.weight);
        break;
      case "desc":
        list.sort((a, b) => b.weight - a.weight);
        break;
      default:
        break;
    }
    list.forEach((item) => {
      this.add(item.key, item.weight);
    });
    return this.values();
  }

  /**
   * Receive a weigthed random item out of the list
   * @returns {WeightedListItem} a single randomly, by weight, selected item data
   */
  random() {
    const list = this.toArray();
    const keys = list.map((item) => item.key);
    const weights = list.map((item) => item.weight);

    const totalWeights = eval(weights.join("+"));

    const listByWeights = new Array();
    let currentIteration = 0;

    while (currentIteration < keys.length) {
      for (let i = 0; i < weights[currentIteration]; i++) {
        listByWeights[listByWeights.length] = keys[currentIteration];
      }
      currentIteration++;
    }
    const randomNumber = Math.floor(Math.random() * totalWeights);
    return listByWeights[randomNumber];
  }

  /**
   * Get the entire set as an Array
   * @returns {WeightedListItem[]} an array of the entire set
   */
  toArray() {
    return Array.from(this.values());
  }
}

module.exports = WeightedList;
