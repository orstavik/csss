import { parse$Expression, Expression, DictMap } from "./Parser.js";

const toCamel = s => s.replace(/[A-Z]/g, "-$&").toLowerCase();

export class Interpreter {

  constructor(shortFuncs, stackables) {
    this.shortFuncs = DictMap(shortFuncs, toCamel);
    this.stackables = stackables;
  }

  interpretExp(exp, scope = {}) {
    const cb = scope[exp.name] ?? this.shortFuncs[exp.name];
    if (!cb)
      throw new SyntaxError(`Unknown short function: ${exp.name}`);
    const innerScope = Object.assign(scope, cb.scope);
    const args = exp.args.map(x => x instanceof Expression ? this.interpretExp(x, innerScope) : x);
    return cb.call(exp, ...args);
  }

  mergeOrStack(shorts) {
    const res = {};
    for (const short of shorts) {
      const obj = this.interpretExp(short);
      for (let [k, v] of Object.entries(obj)) {
        if (v == null) continue;
        k = k.replace(/[A-Z]/g, "-$&").toLowerCase();
        if (CSS.supports(k, "inherit"))
          if (!CSS.supports(k, v))
            throw new SyntaxError(`Invalid CSS$ value: ${k} = ${v}`);
        //else, the browser doesn't support the property, because the property is too modern.
        if (!(k in res))
          res[k] = v;
        else if (k in this.stackables)
          res[k] += (this.stackables[k] + v);
        else
          throw new SyntaxError(`CSS$ clash: ${k} = ${res[k]}  AND = ${v}.`);
      }
    }
    return res;
  }

  interpretClass(txt) {
    return DictMap(parse$Expression(txt), null, shs => this.mergeOrStack(shs));
  }
}