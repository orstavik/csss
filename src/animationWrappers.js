import { animationHo } from "./animations.js";
import nativeAndMore from "./func.js";
import filterTransform from "./filterTransform.js";
import backgrounds from "./bg.js";
import borderModule from "./border.js";

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

const opacity = animationHo(nativeAndMore.opacity);
const bg = animationHo(backgrounds.bg);
const color = animationHo(nativeAndMore.color);
const border = animationHo(borderModule.border);

export default {
  transform: undefined,

  translateX,
  translateY,
  translateZ,
  translate,
  scale,
  scaleX,
  scaleY,
  scaleZ,
  rotate,
  rotateX,
  rotateY,
  rotateZ,
  skewX,
  skewY,
  opacity,
  bg,
  color,
  border,
};

