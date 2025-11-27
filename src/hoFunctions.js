export const stackBasedOnTypeObject = (name, matchers, composer, res = {}) => args => {
  main: for (const arg of args) {
    for (const key in matchers) {
      const val = matchers[key](arg);
      if (val) {
        res[key].push(val);
        continue main;
      }
    }
    throw new SyntaxError(`Bad argument: ${name}(${arg.text ?? arg})`);
  }
  return composer(res);
};

export const onesBasedOnTypeObject = (name, matchers) => args => {
  const res = {};
  main: for (const arg of args) {
    for (const { check, action } of matchers) {
      const val = check(arg);
      if (val) {
        if (typeof action === "string") {
          res[action] = val.text ?? val;
        } else {
          Object.assign(res, action(val));
        }
        continue main;
      }
    }
    throw new SyntaxError(`Bad argument: ${name}(${arg.text ?? arg})`);
  }
  return res;
};

export const onesBasedOnTypeString = (name, matchers, joiner = " ") => args => {
  const parts = [];
  main: for (const arg of args) {
    for (const { check, action } of matchers) {
      const val = check(arg);
      if (val) {
        // If action is provided, use it to transform the value, otherwise use the value directly
        // If action is a string, it's likely not applicable here as we are building a string return, 
        // but for consistency with the object version, we could assume action might be a transform function.
        // However, based on the description "action usually implies 'use this value'", we'll assume 
        // if action is a function it transforms, if it's missing we use val.
        if (typeof action === 'function') {
          parts.push(action(val));
        } else {
          parts.push(val.text ?? val);
        }
        continue main;
      }
    }
    throw new SyntaxError(`Bad argument: ${name}(${arg.text ?? arg})`);
  }
  return typeof joiner === 'function' ? joiner(parts) : parts.join(joiner);
};

export const sequentialObject = (name, validators, keysOrComposer) => args => {
  if (args.length !== validators.length)
    // Some sequential functions might allow optional arguments, but strict sequential usually implies fixed length or we'd need more complex logic.
    // Assuming strict length for now based on "argument sequence is fixed".
    // If flexible length is needed, validators could be an array of arrays or similar.
    // But let's stick to the requested simple sequential.
    // Actually, many CSS functions have optional trailing arguments. 
    // Let's assume validators length is the *max* or *expected* length, but we check what we have.
    // Or better, let's enforce length if it's strict.
    // The prompt said "argument sequence is fixed", which usually implies strictness or at least strict order.
    // Let's allow fewer arguments if the validator handles undefined, or just check up to args.length.
    // But usually for "sequential", you want to validate arg[0] against validator[0].
    if (args.length > validators.length)
      throw new SyntaxError(`${name} accepts max ${validators.length} arguments, got ${args.length}.`);

  const validatedArgs = [];
  for (let i = 0; i < args.length; i++) {
    const val = validators[i](args[i], i); // Pass index just in case
    if (!val)
      throw new SyntaxError(`Bad argument ${i + 1}: ${name}(${args[i].text ?? args[i]})`);
    validatedArgs.push(val);
  }

  if (typeof keysOrComposer === "function") {
    return keysOrComposer(validatedArgs);
  } else {
    const res = {};
    for (let i = 0; i < validatedArgs.length; i++) {
      if (keysOrComposer[i] !== undefined) {
        // If the validator returns an object (like {num, unit}), we might want just the text or the whole thing.
        // Usually we want the text representation for the CSS value.
        res[keysOrComposer[i]] = validatedArgs[i].text ?? validatedArgs[i];
      }
    }
    return res;
  }
};

export const sequentialString = (name, validators, template) => args => {
  if (args.length > validators.length)
    throw new SyntaxError(`${name} accepts max ${validators.length} arguments, got ${args.length}.`);

  const validatedArgs = [];
  for (let i = 0; i < args.length; i++) {
    const val = validators[i](args[i], i);
    if (!val)
      throw new SyntaxError(`Bad argument ${i + 1}: ${name}(${args[i].text ?? args[i]})`);
    validatedArgs.push(val.text ?? val);
  }

  if (typeof template === "function") {
    return template(validatedArgs);
  } else {
    // Simple template replacement: "rgba($, $, $, $)"
    // This assumes the template has placeholders. 
    // If template is just a string like "rgba", we might want to join args.
    // Let's assume the user meant a joiner or a format string.
    // If it contains "$", we replace sequentially.
    if (template.includes("$")) {
      let res = template;
      for (const arg of validatedArgs) {
        res = res.replace("$", arg);
      }
      return res;
    }
    // Fallback: functionName(args joined)
    return `${template}(${validatedArgs.join(", ")})`;
  }
};
