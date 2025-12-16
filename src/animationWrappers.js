import { LengthPercent, Angle, Color, NumberPercent, SIN, SEQopt, SINmax } from "./func.js";
import { animationHo } from "./animations.js";

// Basic transform functions wrapped with animation support
const translateX = animationHo(SIN(LengthPercent, (name, v) => ({ transform: `translateX(${v})` })));
const translateY = animationHo(SIN(LengthPercent, (name, v) => ({ transform: `translateY(${v})` })));
const translateZ = animationHo(SIN(LengthPercent, (name, v) => ({ transform: `translateZ(${v})` })));

const translate = animationHo(SEQopt([LengthPercent, LengthPercent],
  (ar) => ({ transform: `translate(${ar[0]}, ${ar[1] || '0'})` })));

const scale = animationHo(SINmax(2, NumberPercent, (name, ar) => ({ transform: `${name}(${ar.join(", ")})` })));
const scaleX = animationHo(SIN(NumberPercent, (name, v) => ({ transform: `${name}(${v})` })));
const scaleY = animationHo(SIN(NumberPercent, (name, v) => ({ transform: `${name}(${v})` })));

const rotate = animationHo(SIN(Angle, (name, v) => ({ transform: `${name}(${v})` })));
const rotateX = animationHo(SIN(Angle, (name, v) => ({ transform: `${name}(${v})` })));
const rotateY = animationHo(SIN(Angle, (name, v) => ({ transform: `${name}(${v})` })));
const rotateZ = animationHo(SIN(Angle, (name, v) => ({ transform: `${name}(${v})` })));

const skewX = animationHo(SIN(Angle, (name, v) => ({ transform: `${name}(${v})` })));
const skewY = animationHo(SIN(Angle, (name, v) => ({ transform: `${name}(${v})` })));

// Opacity with animation support
const opacity = animationHo(SIN(NumberPercent, (name, v) => ({ opacity: v })));

// Background color with animation support  
const bgColor = animationHo(SIN(Color, (name, v) => ({ backgroundColor: v })));

export default {
  // Transform properties (native CSS)
  transform: undefined,

  // Animation wrapper functions
  translateX,
  translateY,
  translateZ,
  translate,
  scale,
  scaleX,
  scaleY,
  rotate,
  rotateX,
  rotateY,
  rotateZ,
  skewX,
  skewY,
  opacity,
  bgColor,
};
