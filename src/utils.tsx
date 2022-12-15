import fs from 'fs'

// readFile
export function readFile(path: string): string {
  return fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })
}

// parseCSS
export default function parseCSS(css: string): { name: string; value: string }[] {
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

//
export function parseTokens(css: string) {
  const sana = (value: string) => {
    value = value.replaceAll('"', "'")
    return value.trim()
  }

  const props = parseCSS(css)

  const items: {
    id: number
    title: string
    subtitle: string
    accessory: string
  }[] = []

  props.map((prop, id) => {
    const name = prop.name
    const value = sana(prop.value)

    items.push({
      id,
      title: name,
      subtitle: value,
      accessory: '',
    })
  })

  return { items }
}
