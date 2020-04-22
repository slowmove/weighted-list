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
   * @param {string} key the value to have a weight
   * @param {string} [weight] the weight to reflect its importance
   */
  add(key, weight = 1) {
    super.add({ key, weight });
  }

  /**
   * Sort the set by weight, descending (default) or ascending
   *
   * @param {string} [order] DESC or ASC
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
   */
  toArray() {
    return Array.from(this.values());
  }
}

module.exports = WeightedList;
