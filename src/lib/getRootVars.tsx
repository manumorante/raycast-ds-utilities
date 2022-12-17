import { DeclarationType } from '../types'

/**
 * getRootVars
 * Parse css plan text. Return a array list of properties
 *
 * :root {
 *   --color-red: red;
 *   --size-m: 16px;
 * }
 *
 * [
 *   { name: "--color-red", value: "red" },
 *   { name: "--size-m", value: "16px" },
 * ]
 */

export default function getRootVars(css: string) {
  // Use a regular expression to match CSS property-value pairs
  const matches = css?.match(/[^\s:;]+:[^;]+/g)
  if (!matches) return []

  // Iterate over the matches and split each one into a property and value
  const declarations: DeclarationType[] = []

  for (const match of matches) {
    const [property, value] = match.split(':')
    declarations.push({ property, value })
  }

  return declarations
}
