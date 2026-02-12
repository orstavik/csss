/**
 * Pre-baked easing curves for CSSS animations / transitions.
 *
 * Concepts:
 * - \"ease\" is defined in native CSS as accelerating then decelerating.
 * - \"crisp\" starts or ends quickly (but not both).
 * - \"harsh\" starts or ends very quickly (but not both).
 * - \"playful\" overshoots a bit when coming in/out.
 * - \"bounce\" overshoots more than playful, with visible bounces.
 * - \"hesitate\" moves forward, pauses, then continues.
 * - \"wiggle\" moves forward, backtracks a little, then forward again.
 * - \"wobble\" moves forward, backtracks fully, forward again, then backtracks
 *   a little before settling.
 *
 * Exported names (backInEaseOut, easeInBackOut, etc.) are strings suitable
 * for use as CSS timing functions in `animation-timing-function` or
 * `transition-timing-function`.
 */

/**
 * Samples a cubic-bezier curve into a discrete lookup table.
 *
 * @param {[number, number, number, number]} controlPoints [x1, y1, x2, y2]
 * @param {number} [sampleSize=240]   Number of x-samples to generate in [0,1]
 * @param {number} [precision=5]      Subdivision precision along the curve
 * @returns {number[]}                Array of y-values for x in [0,1]
 */
function cubicBezier([x1, y1, x2, y2], sampleSize = 240, precision = 5) {
  if (![x1, y1, x2, y2].every(Number.isFinite))
    throw new TypeError("Control points must be finite numbers.");
  if (precision < 3)
    throw new RangeError("precision must be ≥ 2 (recommend ≥ 3).");

  const xInc = 1 / (sampleSize - 1);
  const tInc = xInc / precision;
  const res = new Array(sampleSize);
  res[0] = 0;
  res[sampleSize - 1] = 1; //x=1, y=1
  for (let xStep = xInc, prevX = 0, prevY = 0, t = tInc, n = 1; xStep < 1; t += tInc) {
    const u = 1 - t;
    const tt = t * t;
    const ttt = tt * t;
    const uut3 = 3 * u * u * t, utt3 = 3 * u * tt;
    const x = uut3 * x1 + utt3 * x2 + ttt;
    const y = uut3 * y1 + utt3 * y2 + ttt;
    if (x >= xStep) {
      const ratio = (xStep - prevX) / (x - prevX);
      res[n++] = prevY + (y - prevY) * ratio;
      xStep += xInc;
    }
    prevX = x, prevY = y;
  }
  if (res[sampleSize - 2] == undefined) {
    debugger
    return cubicBezier([x1, y1, x2, y2], sampleSize, precision * 2);
  }
  return res;
}

/** Computes a geometric decay sequence of heights / durations for bounces. */
function computeDecay(count, height, hDecay) {
  const timeDecay = Math.sqrt(hDecay);
  let time = 1 / ((1 - Math.pow(timeDecay, count)) / (1 - timeDecay));
  const res = [];
  for (let i = 0; i < count; i++, height *= hDecay, time *= timeDecay)
    res.push({ height, time });
  return res;
}

/** Builds a bouncing waveform used for bounce-style easing curves. */
function bounce(count, firstHeight, decay = 0.7, width = 120) {
  if (count % .5 != 0)
    throw new RangeError("count must be whole or half numbers.");
  const overshoot = count % 1;
  const steps = computeDecay(Math.ceil(count), firstHeight, decay);
  const overshootScale = 1 + (steps[0].time / 2);

  const pointSet = steps.flatMap(({ time, height }) => {
    const halfSize = Math.round(time * .5 * width * overshootScale);
    const half = cubicBezier([0, 0, .58, 1], halfSize).map(y => y * height);
    return [half, half.slice().reverse().slice(1)];
  });
  overshoot && pointSet.shift();
  return pointSet.flat();
}

/** Pure sine wave used as a base for wiggle/wobble-style easings. */
function sineWave(count, height, width = 120) {
  const res = Array(width);
  res[0] = res[width - 1] = 0;
  for (let x = 1; x < (width - 1); x++) {
    const t = x / (width - 1);
    res[x] = -Math.sin(t * Math.PI * 2 * count) * height;// * ease(t);
  }
  return res;
}

/** Sine wave tapered with a cosine envelope (ease in/out). */
function sineWaveEase(count, height, width = 120) {
  return sineWave(count, height, width).map((y, i) => y * Math.cos((Math.PI / 2) * (i / width)));
}

/** Linear ramp from 0 to 1 over `width` samples. */
function line(width) {
  return Array.from({ length: width }, (_, i) => i / (width - 1));
}

/** Converts an array of y-values into a CSS `linear()` easing function string. */
function cssLinear(ys) {
  return `linear(${ys.map(n => (Math.round(n * 1000) / 1000).toString().replace("0.", ".")).join(",")})`;
}
/** Joins multiple sampled curves, dropping duplicate endpoints. */
function join(...numSets) {
  return numSets.map((s, i) => !i ? s : s.slice(1)).flat();
}
/** Inverts a curve vertically and reverses it in time. */
function inverse(ar) {
  return ar.map(y => 1 - y).reverse();
}

const BEZIER = {
  slowIn: [.3, 0, 1, 1],   // gentle "ease-in"
  easeIn: [.42, 0, 1, 1],
  quickIn: [.55, 0, 1, 1], // stronger "ease-in"
};
for (let [k, v] of Object.entries(BEZIER))
  BEZIER[k.replace("In", "Out")] = v.map(n => 1 - n);


const _easeBack = join(cubicBezier(BEZIER.easeIn, 28), sineWaveEase(1, .075, 10).map(y => 1 - y));
const backInEaseOut = cssLinear(inverse(_easeBack));
const easeInBackOut = cssLinear(_easeBack);
const backInOut = cssLinear(join(
  sineWaveEase(1, .14, 20).reverse(),
  line(20),
  sineWaveEase(1, .14, 20).map(y => 1 - y)
));

const _easeInBounceOut = join(cubicBezier(BEZIER.easeIn, 70), bounce(3, .18, 0.33, 40).map(y => 1 - y));
const easeInBounceOut = cssLinear(_easeInBounceOut);
const bounceInEaseOut = cssLinear(inverse(_easeInBounceOut));
const _bounceInOut = join(
  bounce(3.5, .5, 0.6, 60).reverse(),
  bounce(3.5, .5, 0.6, 60).map(y => 1 - y)
);
const bounceInOut = cssLinear(_bounceInOut);
const _easeInSpringOut = join(
  cubicBezier(BEZIER.easeIn, 70),
  sineWaveEase(2, .1, 40).map(y => 1 - y)
);
const easeInSpringOut = cssLinear(_easeInSpringOut);
const springInEaseOut = cssLinear(inverse(_easeInSpringOut));
const springInOut = cssLinear(join(
  sineWaveEase(2, .1, 40).reverse(),
  line(40),
  sineWaveEase(2, .1, 40).map(y => 1 - y)
));
const wobble = cssLinear(join(
  sineWave(2, .1, 60).reverse().map((y, i) => y + i / 120),
  sineWave(2, .1, 60).map((y, i) => 1 - y - (60 - i) / 120)
));

export {
  backInEaseOut, 
  easeInBackOut,
  backInOut,
  easeInBounceOut,
  bounceInEaseOut,
  bounceInOut,
  easeInSpringOut,
  springInEaseOut,
  springInOut,
  wobble,
};