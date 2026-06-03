import SplitType from 'split-type'

// Splits an element's text and returns the targets + a revert cleanup.
export function splitText(el, types = 'chars') {
  const split = new SplitType(el, { types })
  let targets = split.lines
  if (types.includes('chars')) targets = split.chars
  else if (types.includes('words')) targets = split.words
  return { split, targets, revert: () => split.revert() }
}
