import { hasSelector, getBetween } from './utils'
import { RuleType } from '../types'

const getSelectors = (css: string) => {
  const utility: RuleType[] = []
  let lines = css?.split('\n')

  // Nos quedamos las lineas que contengan un selector válido
  lines = lines.filter((item) => hasSelector(item)).sort()

  lines.map((item) => {
    const selector = item.split('{')[0].trim()
    const declaration = getBetween(item, '{', '}').trim().replace(/;/g, '')

    if (selector?.length > 0) {
      utility.push({ selector, declaration })
    }
  })

  return utility
}

export default getSelectors
