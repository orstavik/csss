/**
 * Whitespace shorts:
 * - Provide simple presets for the CSS `white-space` property.
 *
 * Export map:
 * - `nowrap`, `preWrap`, `preLine`, `pre`, `breakSpaces`, `normal`:
 *   each returns a `{ whiteSpace: "..." }` object.
 */

const WHITESPACE = {
  nowrap: { whiteSpace: "nowrap" },
  preWrap: { whiteSpace: "pre-wrap" },
  preLine: { whiteSpace: "pre-line" },
  pre: { whiteSpace: "pre" },
  breakSpaces: { whiteSpace: "break-spaces" },
  normal: { whiteSpace: "normal" },
};

export default {
  ...WHITESPACE,
};
