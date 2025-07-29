import { Color } from "./Color.js";

function gradient(color, contrast = 100, hue = 0) {
  if(Math.abs(hue) > 30)
    console.warn(`Be careful with hue over 30deg, gradients can become "steppy": ${hue}deg`);
  const c = new Color(color);  //contrast light is 
  contrast *= c.L < .25 ? .67 : c.L > .66 ? -.47 :  .47;
  const c2 = new Color(color.hex);
  c2.H += hue;
  c2.L += contrast;

}

function gradientAbs(color, contrast = 100, hue = 0) {
  if(Math.abs(hue) > 30)
    console.warn(`Be careful with hue over 30deg, gradients can become "steppy": ${hue}deg`);
  const c = new Color(color);  //contrast light is 
  contrast *= c.L < .25 ? .67 : c.L > .66 ? -.47 :  .47;
  const c2 = new Color(color.hex);
  c2.H += hue;
  c2.L += contrast;

}

(function(){
  debugger
  gradient("red", 100, 15);

})();

export default {
  gradient,
};


function gradient(role, color, onColor) { 
  console.log("CSSS: Exported 'gradient' short called for: ${role}");
  if (!role || !color || !onColor) return {};
  
  const result = { "--color-palette": `"${role}-palette"` };
  const steps = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  
  for (const step of steps) {
    // Base color variants
    if (step === 0) result[`--${role}0`] = color;
    else if (step === 100) result[`--${role}100`] = onColor;
    else result[`--${role}${step}`] = `color-mix(in oklch, ${color} ${100-step}%, ${onColor} ${step}%)`;
    
    // Transparency variants (-a10 to -a100)
    for (let alpha = 10; alpha <= 100; alpha += 10) 
      result[`--${role}${step}-a${alpha}`] = `oklch(from var(--${role}${step}) l c h / ${alpha}%)`;
    
    // Chroma variants
    result[`--${role}${step}-blend`] = `oklch(from var(--${role}${step}) l var(--primary-chroma, c) h)`;
    result[`--${role}${step}-pop`] = `oklch(from var(--${role}${step}) l calc(c * 2) h)`;
  }
  
  return result;
}