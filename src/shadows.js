//todo we could beneficially use the clock 10:30 etc. as directions for both shadows and gradients!!
import { extractLength, extractColor, extractName, extractRadian, isLength, } from "./func.js";

// Shadows are handled similarly to transitions. Or even more sematically regulated.
// There are say 10 different types of SHADES. They specify a lengthFactor, blurFactor, spreadFactor. 
// Then in the $shadow(shade,angle,length,color?) to use it.
// If the length is passed in as 
// 
// var(--shadowColor, #0003) is the default color for the shadow.
// To change the default shadow color to for example white in @dark mode, do for example:
//   @dark$--shadowColor(#fff3)
// 
// By design, we flip @light/@dark on the elements with the shadow. Lob.
// This is likely better than trying to cluster such changes, as the shadows is unlikely to follow the same thematic logic in light and dark mode.
// Ie. elements that have the same shadow in lightmode, might have different/no shadows in darkmode, and vice versa.

const SHADES = {
  ambient: { l: 0.04, b: 0.3, s: 0.24 },
  soft: { l: 0.1, b: 0.2, s: 0.2 },
  crisp: { l: 0.2, b: 0.06, s: 0.1 },
};

function round(num, places = 2) {
  const m = 10 ** places;
  return Math.round(num * m) / m;
}

function parseAbsoluteShadowArgs3(args) {
  const x = extractLength(args);
  if (!x)
    return;
  const y = extractLength(args);
  const blur = extractLength(args);
  const color = extractColor(args) ?? `var(--shadowColor, #0003)`;
  if (args.length)
    throw new TypeError("Unknown absolute $shadow() argument: " + args[0].text);
  return { x, y, blur, color };
}

function parseAbsoluteShadowArgs4(args) {
  const x = extractLength(args);
  if (!x)
    return;
  const y = extractLength(args);
  const blur = extractLength(args);
  const spread = extractLength(args);
  const color = extractColor(args) ?? `var(--shadowColor, #0003)`;
  if (args.length)
    throw new TypeError("Unknown absolute $shadow() argument: " + args[0].text);
  return { x, y, blur, spread, color };
}

function parseNamedShadowArgs(args) {
  const name = extractName(args);
  if (!name)
    throw `Unknown $shadow() argument: ${args[0].text}`;;
  if (!(name in SHADES))
    throw `Unknown shadow type: ${name}. Use one of: ${Object.keys(SHADES).join(", ")}`;
  const length = isLength(args[0]);
  if (length) args.shift();
  const angle = extractRadian(args);
  const color = extractColor(args) ?? `var(--shadowColor, #0003)`;
  if (args.length)
    throw new TypeError("Unknown named $shadow() argument: " + args[0].text);
  let { num, unit } = length ?? { num: 5 };
  if (!unit) {    // default length is plain number? 5 is "normal" => 0.25rem. 1 is very small => 0.05rem. 10 is large => 0.5rem.
    num /= 20;
    unit = "rem";
  }
  const type = SHADES[name];

  const rad = angle ?? (Math.PI * .75); //default angle 135deg
  const x = round(Math.cos(rad) * type.l * num) + unit;
  const y = round(Math.sin(rad) * type.l * num) + unit;
  const blur = round(type.b * num) + unit;
  const spread = round(type.s * num) + unit;

  return { x, y, blur, spread, color };
}

function boxShadow(args) {
  const { x, y, blur, spread, color } = parseAbsoluteShadowArgs4(args) ?? parseNamedShadowArgs(args);
  return [x, y, blur, spread, color].filter(Boolean).join(" ");
}
function textDropShadow(args) {
  const { x, y, blur, color } = parseAbsoluteShadowArgs3(args) ?? parseNamedShadowArgs(args);
  return [x, y, blur, color].filter(Boolean).join(" ");
}

export default {
  boxShadowInset: args => ({ boxShadow: "inset " + boxShadow(args) }),
  boxShadow: args => ({ boxShadow: boxShadow(args) }),
  textShadow: args => ({ textShadow: textDropShadow(args) }),
  dropShadow: textDropShadow,
};
// function $textShadow(args) {
//   const { x, y, blur, color = `var(--shadowColor, #0003)` } =
//     parseNamedShadowArgs(args) ?? parseAbsoluteShadowArgs(args);
//   return { textShadow: `${x} ${y} ${blur} ${color}` };
// }

// function _shadow(nickName = "", type = "soft", deg = .66 * Math.pi, color = "#0003", length = { num: 1 }) {
//   debugger;
//   type = TYPES[type];
//   if (!type)
//     throw `Unknown shadow type: ${type}`;
//   const { l, b, s } = type;
//   let x = length * Math.cos(deg) * l;
//   let y = length * Math.sin(deg) * l;
//   let blur = b * length;
//   let spread = s * length;
//   const res = {
//     [`--shadow${nickName}0`]: x,
//     [`--shadow${nickName}1`]: y,
//     [`--shadow${nickName}2`]: blur,
//     [`--shadow${nickName}3`]: spread,
//   };
//   if (!l.unit) {
//     x = x * .25 + "rem";
//     y = y * .25 + "rem";
//     blur = blur * .25 + "rem";
//     spread = spread * .25 + "rem";
//   }
//   res[`--shadow${nickName}Color`] = color;
//   res[`--shadow${nickName}`] = `${x} ${y} ${blur} ${color.text}`;
//   res[`--boxShadow${nickName}`] = `${x} ${y} ${blur} ${spread} ${color.text}`;
//   return res;
// }

// function boxShadow(inset, args) {
//   let { name, color, x, y, blur, spread } = parseArgs(args);
//   name = `var(--shadow${name})`;
//   inset = inset ? "inset " : "";
//   if (!color && !x)
//     return { boxShadow: inset + name };
//   if (color && !x)
//     return { boxShadow: inset + `${name} ${color}` };
// }

// function extractor(cbs, args) {
//   return cbs.map(cb => args.map(cb).filter(Boolean));
// }


// // case 1: $shadow(name?,x,y,blur,spread?,color?) / $boxShadow(2px,4px,6px,8px,#abc3)
// // case 2: $shadow(name?,type?,length?,angle?,color?) / $boxShadow(shade,1rem,soft,135deg,#abc3)

// // defaults: 
// // name: ""
// // type: name ?? "soft"
// // angle: deg or rad or grad
// // color: #0003
// function parseArgs(args) {
//   const [names, lengths, angles, colors] =
//     extractor([interpretName, isLengthPercent, interpretRadian, isColor], args);
//   //inputs boundary check
//   if (names.length > 2)
//     throw new TypeError("$light() and $shadow() can max have two names.");
//   if (colors.length > 1)
//     throw new TypeError("$light() and $shadow() can max have one color.");
//   if (!(!lengths.length || (lengths.length == 3 || lengths.length == 4) || (lengths == 1 && angles.length == 1)))
//     throw new TypeError("$light() and $shadow() must either specify all lengths (3 or 4) or a single length and angle.");

//   let [name = "", type = name || "soft"] = names;
//   if (name) name = name[0].toUpperCase() + name.slice(1);
//   const [color] = colors.map(c => c.text);
//   if (names.length > 1) {
//     const [x, y, blur, spread] = lengths;
//     return { name, color, x, y, blur, spread };
//   }

//   if (!(type in TYPES))
//     throw `Unknown shadow type: ${name}`;

//   const [{ num: length, unit }] = lengths;
//   const [rad] = angles;
//   const { l, b, s } = TYPES[type];
//   const x = { num: length * Math.cos(rad) * l, unit };
//   const y = { num: length * Math.sin(rad) * l, unit };
//   const blur = { num: b * length, unit };
//   const spread = { num: s * length, unit };
//   return { name, color, x, y, blur, spread };
// }

// function boxShadow(args) {
//   const { name, color, x, y, blur, spread } = parseArgs(args);

//   return {
//     [`--shadow${name}X`]: x,
//     [`--shadow${name}Y`]: y,
//     [`--shadow${name}B`]: blur,
//     [`--shadow${name}S`]: spread,
//     [`--shadow${name}C`]: color,
//     [`--boxShadow${name}`]: `${x} ${y} ${blur} ${spread} ${color}`,
//   };
// }

// function shadow(args) {
//   const nickName = extractName(args);
//   const length = extractLengthPercent(args);
//   const color = extractColor(args);
//   const deg = extractAngle(args);
//   debugger
//   if (args.length)
//     throw new TypeError("Unknown argument $shadow(): " + args[0].text);
//   // if (!length && !color && !deg)
//   //   return { [type]: `var(--shadow${nickName})` };
// }

// export default {
//   light,
//   shadow
// };

// //case 2: $light(name?,type?,length,rad?,color?) //$shadow(elevated,soft,.3rem,45deg,#abc3)
// //case 3: $shadow(name?,type?,length,rad?,color?) //$shadow(elevated,soft,.3rem,45deg,#abc3)
// //lengths == 1 + deg.  use type fully.
// //lengths == 2. no deg. Both lengths must be calculable. l = calc sqrt(x^2 + y^2) and use that as length. and then set up the blur and spread accordingly.
// //lengths == 3. no deg or type. And spread = blur *= x (as in soft).
// //lengths == 4. no deg or type. 
// //deg + x (and a "soft").
// //deg + x + type,
// //x + y (and soft) , and !y && !blur && !spread type + deg + length


// // function lightImpl(args) {
// //   const res = {
// //     softness: 0.6,
// //     length: { num: .25, unit: "rem" },
// //   };
// //   const name = extractWord(args[0]);
// //   for (const a of args) {
// //     let a2;
// //     if (a2 = interpretAngle(a))
// //       res.deg = a2;
// //     else if (a2 = SHADOW_FUNCTIONS[a.name]?.(a))
// //       Object.assign(res, a2);
// //     else if (a2 = interpretColor(a))
// //       res.color = a2;
// //     else if (a2 = interpretLengthPercent(a))
// //       res.length = a2;
// //     else if (a2 = interpretNumber(a)?.num) //this is softness?
// //       res.softness = a2;
// //     else
// //       throw `Unrecognized light() argument: ${a.text}`;
// //   }

// //   res.blur ??= res.softness * res.length.num * 0.5;
// //   res.spread ??= res.softness * res.length.num;
// //   return res;
// // }

// // function insetLight(args) {
// //   const res = lightImpl(args);
// //   return { ...res, inset: true };
// // }