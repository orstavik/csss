const nonLogical = {
  'horizontal-tb': { top: "BlockStart", left: "InlineStart", right: "InlineEnd", bottom: "BlockEnd", },
  'vertical-rl': { top: "InlineStart", left: "BlockEnd", right: "BlockStart", bottom: "InlineEnd", },
  'vertical-lr': { top: "InlineStart", left: "BlockStart", right: "BlockEnd", bottom: "InlineEnd", },
  'sideways-lr': { top: "InlineEnd", left: "BlockStart", right: "BlockEnd", bottom: "InlineStart", },
  'rtl|horizontal-tb': { top: "BlockStart", left: "InlineEnd", right: "InlineStart", bottom: "BlockEnd" },
  'rtl|vertical-rl': { top: "InlineEnd", left: "BlockEnd", right: "BlockStart", bottom: "InlineStart" },
  'rtl|vertical-lr': { top: "InlineEnd", left: "BlockStart", right: "BlockEnd", bottom: "InlineStart" },
  'rtl|sideways-lr': { top: "InlineStart", left: "BlockStart", right: "BlockEnd", bottom: "InlineEnd" },
};
nonLogical['sideways-rl'] = nonLogical['vertical-rl'];
nonLogical['rtl|sideways-rl'] = nonLogical['rtl|vertical-rl'];

const nonLogicalRadius = {
  'horizontal-tb': { "TopLeft": "StartStart", "TopRight": "StartEnd", "BottomLeft": "EndStart", "BottomRight": "EndEnd", },
  'vertical-rl': { "TopLeft": "EndStart", "TopRight": "StartStart", "BottomLeft": "EndEnd", "BottomRight": "StartEnd", },
  'vertical-lr': { "TopLeft": "StartStart", "TopRight": "EndStart", "BottomLeft": "StartEnd", "BottomRight": "EndEnd", },
  'sideways-lr': { "TopLeft": "StartEnd", "TopRight": "EndEnd", "BottomLeft": "StartStart", "BottomRight": "EndStart", },
  'rtl|horizontal-tb': { "TopLeft": "StartEnd", "TopRight": "StartStart", "BottomLeft": "EndEnd", "BottomRight": "EndStart", },
  'rtl|vertical-rl': { "TopLeft": "EndEnd", "TopRight": "StartEnd", "BottomLeft": "EndStart", "BottomRight": "StartStart", },
  'rtl|vertical-lr': { "TopLeft": "StartEnd", "TopRight": "EndEnd", "BottomLeft": "StartStart", "BottomRight": "EndStart", },
  'rtl|sideways-lr': { "TopLeft": "StartStart", "TopRight": "EndStart", "BottomLeft": "StartEnd", "BottomRight": "EndEnd", },
};
nonLogicalRadius['sideways-rl'] = nonLogicalRadius['vertical-rl'];
nonLogicalRadius['rtl|sideways-rl'] = nonLogicalRadius['rtl|vertical-rl'];

const nonLogicalDirections = {
  'sideways-lr': { x: "block", y: "inline", },
  'horizontal-tb': { x: "inline", y: "block", },
  'vertical-rl': { x: "block", y: "inline", },
  'vertical-lr': { x: "block", y: "inline", },
  'rtl|horizontal-tb': { x: "inline", y: "block", },
  'rtl|vertical-rl': { x: "block", y: "inline", },
  'rtl|vertical-lr': { x: "block", y: "inline", },
  'rtl|sideways-lr': { x: "block", y: "inline", },
};
nonLogicalDirections['sideways-rl'] = nonLogicalDirections['vertical-rl'];
nonLogicalDirections['rtl|sideways-rl'] = nonLogicalDirections['rtl|vertical-rl'];

const PhysicalToLogical = {};
for (const [wm, table] of Object.entries(nonLogical)) {
  const res = PhysicalToLogical[wm] = {};
  for (const [physical, logical] of Object.entries(table)) {
    res[physical] = "inset" + logical;
    for (const prefix of ["border", "margin", "padding", "scrollMargin", "scrollPadding"])
      res[prefix + physical[0].toUpperCase() + physical.slice(1)] = prefix + logical;
    for (const suffix of ["Color", "Style", "Width"])
      res["border" + physical[0].toUpperCase() + physical.slice(1) + suffix] = "border" + logical + suffix;
  }
  for (const [physical, logical] of Object.entries(nonLogicalRadius[wm]))
    res["border" + physical + "Radius"] = "border" + logical + "Radius";

  const t = nonLogicalDirections[wm];
  res.x = t.x;
  res.y = t.y;
  res.width = t.x + "Size";
  res.height = t.y + "Size";
  res.minWidth = "min" + t.x.charAt(0).toUpperCase() + t.x.slice(1) + "Size";
  res.maxWidth = "max" + t.x.charAt(0).toUpperCase() + t.x.slice(1) + "Size";
  res.minHeight = "min" + t.y.charAt(0).toUpperCase() + t.y.slice(1) + "Size";
  res.maxHeight = "max" + t.y.charAt(0).toUpperCase() + t.y.slice(1) + "Size";
}

const PhysicalToLogicalValues = {};
for (let [n, t] of Object.entries(nonLogicalDirections)) {
  const table = nonLogical[n];
  const valueMap = PhysicalToLogicalValues[n] = { ...t, horizontal: t.x, vertical: t.y };
  for (let [p, l] of Object.entries(table))
    valueMap[p] = l.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function makeLogicalValue(k, v, map) {
  if (typeof v !== "string") return v;
  // List of properties whose values might contain directional keywords
  if (!["float", "clear", "captionSide", "scrollSnapType", "resize", "textAlign", "objectPosition"].includes(k)) return v;
  v = v.replace(/\b(left|right|top|bottom|x|y|horizontal|vertical)\b/g, m => map[m] ?? m);
  if (k === "textAlign")
    v = v.split("-").pop();
  return v;
}

export function cssPhysicalToLogical(style) {
  const writingMode = (style.direction === "rtl" ? "rtl|" : "") + (style.writingMode ?? "horizontal-tb");
  const map = PhysicalToLogical[writingMode] || PhysicalToLogical['horizontal-tb'];
  const valueMap = PhysicalToLogicalValues[writingMode] || PhysicalToLogicalValues['horizontal-tb'];
  const res = { ...style };
  for (let [k, v] of Object.entries(style)) {
    const logical = map[k];
    if (logical && (res[logical] === undefined || res[logical] === "unset"))
      res[logical] = v;
  }
  for (let k in res) {
    res[k] = makeLogicalValue(k, res[k], valueMap);
  }
  return res;
}
