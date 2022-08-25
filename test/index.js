import { compareObjects } from '../index.js';

window.onload = () => {
  printResult('#apples-and-oranges', applesAndOranges());
  printResult('#ab-squad', abSquad());
  printResult('#strings-and-integers', stringsAndIntegers());
  printResult('#nested-are-equal', nestedAreEqual());
  printResult('#nested-are-not-equal', nestedAreNotEqual());
  addCompareBtnEvent();
};

/**
 *
 * @param {object} a
 * @param {object} b
 * @returns {array} [comparison, performanceInmilliseconds]
 */
const measureCompare = (a, b) => {
  const t0 = performance.now();

  const compare = compareObjects(a, b);
  const t1 = performance.now();
  return [compare, t1 - t0];
};

const customComparison = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target.closest('form'));
  let a, b;
  try {
    a = JSON.parse(formData.get('objectA'));
    b = JSON.parse(formData.get('objectB'));
    if (!validateObjects([a, b])) {
      throw new Error('not objects');
    }
  } catch (err) {
    console.error(err);
    alert('Invalid JSON');
  }

  printResult('#try-your-own', measureCompare(a, b));
};

const validateObjects = ([...objects]) => {
  for (let obj of objects) {
    if (typeof obj !== 'object' || obj == null) {
      return false;
    }
  }
  return true;
};
const addCompareBtnEvent = () => {
  const btn = document.querySelector('form button');
  btn.addEventListener('click', customComparison);
};

const printResult = (selector, compareResult) => {
  const [compare, performance] = compareResult;
  const container = document.querySelector(selector);
  if (container) {
    const isEqual = compare.length == 0;
    const html = `
        are objects equal?  <span class="${
          isEqual ? 'text-success' : 'text-danger'
        }">${isEqual}</span><br/>
        <br/>
      ${
        !isEqual
          ? `Values that do not match: 
      ${compare} <br/>`
          : ''
      } 
      Time it took to compare: ${performance} milliseconds
    `;
    container.querySelector('.result').innerHTML = html;
  }
};

const applesAndOranges = () => {
  /**
   * Example 1:
   * Objects are not equal.
   * apples.b and oranges.b are not equal
   */
  const apples = {
    a: 'apple',
    b: 'orange',
  };
  const oranges = {
    a: 'apple',
    b: 'apple',
  };

  return measureCompare(apples, oranges);
};

const abSquad = () => {
  /**
   * Example 2:
   * Objects are equal
   */
  const aSquad = {
    a: 'bob',
    b: 'shaker',
  };
  const bSquad = {
    a: 'bob',
    b: 'shaker',
  };

  return measureCompare(aSquad, bSquad);
};

const stringsAndIntegers = () => {
  const integers = {
    a: 1,
    b: 2,
  };
  const strings = {
    a: '1',
    b: '2',
  };
  return measureCompare(integers, strings);
};

const nestedAreEqual = () => {
  const nestedA = {
    id: '0001',
    type: 'donut',
    name: 'Cake',
    ppu: 0.55,
    batters: {
      batter: [
        { id: '1001', type: 'Regular' },
        { id: '1002', type: 'Chocolate' },
        { id: '1003', type: 'Blueberry' },
        { id: '1004', type: "Devil's Food" },
      ],
    },
    topping: [
      { id: '5001', type: 'None' },
      { id: '5002', type: 'Glazed' },
      { id: '5005', type: 'Sugar' },
      { id: '5007', type: 'Powdered Sugar' },
      { id: '5006', type: 'Chocolate with Sprinkles' },
      { id: '5003', type: 'Chocolate' },
      { id: '5004', type: 'Maple' },
    ],
  };
  const nestedB = {
    id: '0001',
    type: 'donut',
    name: 'Cake',
    ppu: 0.55,
    batters: {
      batter: [
        { id: '1001', type: 'Regular' },
        { id: '1002', type: 'Chocolate' },
        { id: '1003', type: 'Blueberry' },
        { id: '1004', type: "Devil's Food" },
      ],
    },
    topping: [
      { id: '5001', type: 'None' },
      { id: '5002', type: 'Glazed' },
      { id: '5005', type: 'Sugar' },
      { id: '5007', type: 'Powdered Sugar' },
      { id: '5006', type: 'Chocolate with Sprinkles' },
      { id: '5003', type: 'Chocolate' },
      { id: '5004', type: 'Maple' },
    ],
  };
  return measureCompare(nestedA, nestedB);
};

const nestedAreNotEqual = () => {
  const nestedA = {
    id: ['0001', '02'],
    type: 'donut',
    name: 'Cake',
    image: {
      url: 'images/0001.jpg',
      width: 200,
      height: 200,
    },
    thumbnail: {
      url: 'images/thumbnails/0001.jpg',
      width: 32,
      height: 32,
    },
  };
  const nestedB = {
    id: ['0001', '02'],
    type: 'donut',
    name: 'Cake',
    image: {
      url: 'images/0001.jpg',
      width: 300,
      height: 200,
    },
    thumbnail: {
      url: 'images/thumbnails/0001.jpg',
      width: 32,
      height: 32,
    },
  };
  return measureCompare(nestedA, nestedB);
};
