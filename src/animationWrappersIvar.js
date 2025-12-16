import { animationHo } from "./animations.js";
import nativeAndMore from "./func.js";
import filterTransform from "./filterTransform.js";
// import background from "./bg.js";

// Basic transform functions wrapped with animation support
const translateY = animationHo(filterTransform.translateY);
const translate = animationHo(filterTransform.translate);
const translateX = animationHo(filterTransform.translateX);
const translateZ = animationHo(filterTransform.translateZ);

const scale = animationHo(filterTransform.scale);
const scaleX = animationHo(filterTransform.scaleX);
const scaleY = animationHo(filterTransform.scaleY);
const scaleZ = animationHo(filterTransform.scaleZ);

const rotate = animationHo(filterTransform.rotate);
const rotateX = animationHo(filterTransform.rotateX);
const rotateY = animationHo(filterTransform.rotateY);
const rotateZ = animationHo(filterTransform.rotateZ);

const skewX = animationHo(filterTransform.skewX);
const skewY = animationHo(filterTransform.skewY);

// Opacity with animation support
const opacity = animationHo(nativeAndMore.opacity);

// Background color with animation support  
// const bg = animationHo(background.bg);

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
  // bg,
};
