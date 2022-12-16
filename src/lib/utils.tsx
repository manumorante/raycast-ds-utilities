import { categories } from '../categories'
import fs from 'fs'

// readFile
export function readFile(path: string): string {
  return fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })
}

// hasSelector
function hasSelector(line: string) {
  const match = line.match(/(\.[\w-\s.:>[\]*=']+)(?=[{|,])/g)

  return !!match
}

// getBetween
function getBetween(str: string, strStart: string, srtEnd: string) {
  const out = str.slice(str.indexOf(strStart) + strStart.length, str.indexOf(srtEnd))
  return out.toString()
}

// getSelectors
export function getSelectors(css: string): { name: string; value: string }[] {
  if (!css) return []

  const selectors: { name: string; value: string }[] = []

  const lines = css.split('\n').filter((item) => hasSelector(item))
  lines.map((item) => {
    const name = item.split('{')[0].trim()
    const value = getBetween(item, '{', '}').trim()

    selectors.push({ name, value })
  })

  return selectors
}

// getProps
export function getProps(css: string): { name: string; value: string }[] {
  if (!css) return []

  // Use a regular expression to match CSS property-value pairs
  const matches = css.match(/[^\s:;]+:[^;]+/g)
  if (!matches) return []

  // Iterate over the matches and split each one into a property and value
  const props: { name: string; value: string }[] = []
  for (const match of matches) {
    const [name, value] = match.split(':')
    props.push({ name, value })
  }

  return props
}

export const sana = (value: string) => {
  value = value.replaceAll('"', "'")
  return value.trim()
}

// getPropCategory
export function getPropCategory(prop: string) {
  const filterCat = categories.propsCategories.filter((category) => {
    return category.props.includes(prop)
  })
  return filterCat.length > 0 ? filterCat[0] : categories.noCategory
}
