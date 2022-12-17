import fs from 'fs'

// getPrefix
export function getPrefix(name: string) {
  const separator = name.includes(':') ? ':' : name.includes('-') ? '-' : ''
  return name.split(separator)[0]
}

// readFile
export function readFile(path: string): string {
  const out = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })
  return out.replaceAll('\\', '')
}

// hasSelector
export function hasSelector(line: string) {
  const match = line.match(/(\.[\w-\s.:>[\]*=']+)(?=[{|,])/g)

  return !!match
}

// getBetween
export function getBetween(str: string, strStart: string, srtEnd: string) {
  const out = str.slice(str.indexOf(strStart) + strStart.length, str.indexOf(srtEnd))
  return out.toString()
}

export const sana = (value: string) => {
  value = value.replaceAll('"', "'")
  return value.trim()
}
