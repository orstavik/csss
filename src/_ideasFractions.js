const fractions = [
  //"1/2", 0.5 is easier to read than 1/2  1/2 => 0.5
  //"1/4", "3/4",  0.25 and 0.75 is easier to read than 1/4 and 3/4
  "1/3", "2/3", //"4/3",               
  //1/5 and 1/10 follows the decimal system, and is not fractioned.
  "1/6", "5/6", //"7/6", 
  "1/7", "2/7", "3/7", "4/7", "5/7", "6/7", //"8/7",
  "1/8", "3/8", "5/8", "7/8", //"1/8" is easier to read than "0.125" => 3/8 than 0.375
  "1/9", "2/9", "4/9", "5/9", "7/9", "8/9",

  "1/11", "2/11", "3/11", "4/11", "5/11", "6/11", "7/11", "8/11", "9/11", "10/11",
  "1/12", "5/12", "7/12", "11/12",
  "1/13", "2/13", "3/13", "4/13", "5/13", "6/13", "7/13", "8/13", "9/13", "10/13", "11/13", "12/13"
];

// 1/3 vs 0.33
// 2/3 vs 0.66      
// 4/3 vs 1.33   
// 5/3 vs 1.66    
// 16/13 vs 1.23

const LookUp = (function () {
  const cache = {};
  function makeLookUpTable(decimals) {
    let a, b;
    return Object.fromEntries(fractions
      .map(str => str.split("/"))
      .map(([a, b]) => ([a / b, [a, b]]))
      .sort(([a], [b]) => a - b)
      .map(([k, v]) => [k.toFixed(4), v])
    );
  }

  return function (decimals) {
    return cache[decimals] ??= makeLookUpTable(decimals);
  }
})();

export function numberToFraction(num, decimals = 4) {
  if (num >= 3 || num <= 0)
    return num;
  const frac = LookUp(decimals)[(num % 1).toFixed(decimals)];
  return frac ? `${frac[0] + Math.floor(num) * frac[1]}/${frac[1]}` :
    num;
}