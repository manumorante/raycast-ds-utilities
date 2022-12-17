import fs from 'fs'

// readFile
export function readFile(path: string): string {
  const out = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })
  return out.replaceAll('\\', '')
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
type NameValue = {
  name: string
  value: string
}

export function getSelectors(css: string): NameValue[] {
  if (!css) return []

  const selectors: { name: string; value: string }[] = []
  let lines = css.split('\n')

  // Nos quedamos las lineas que contengan un selector válido
  lines = lines.filter((item) => hasSelector(item))

  lines.map((item) => {
    const name = item.split('{')[0].trim()
    const value = getBetween(item, '{', '}').trim()

    if (name?.length > 0) {
      selectors.push({ name, value })
    }
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

// Reemplaza `height: var(--size-m)` por su valor -> `height: 16px`
// Devuelve un objeto con el reemplazo y los tokens reemplazados
type Token = { name: string; value: string }
export function replaceTokensValue(value: string, tokens: Token[]): { replacedValues: string; tokensUsed: string } {
  const tokensUsed: string[] = []
  for (const token of tokens) {
    const regex = new RegExp(`var\\(${token.name}\\)`, 'g')
    if (value.match(regex)) {
      value = value.replace(regex, token.value)
      tokensUsed.push(token.name)
    }
  }
  return { replacedValues: value, tokensUsed: tokensUsed.join(', ') }
}
