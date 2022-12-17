import { hasSelector, getBetween } from './utils'
import { RuleType } from '../types'

// getSelectors
export default function getSelectors(css: string) {
  const utility: RuleType[] = []
  let lines = css?.split('\n')

  // Nos quedamos las lineas que contengan un selector válido
  lines = lines.filter((item) => hasSelector(item)).sort()

  lines.map((item) => {
    const selector = item.split('{')[0].trim()
    const declaration = getBetween(item, '{', '}').trim()

    if (selector?.length > 0) {
      utility.push({ selector, declaration })
    }
  })

  return utility
}
