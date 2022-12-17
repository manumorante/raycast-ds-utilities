import { paths } from '../../config'
import { readFile, getProps, getSelectors } from './utils'
import parseUtilities from './parseUtilities'
import { UtilityItemProps } from '../types'

export default async function fetchUtilities({ query }: { query: string | '' }): Promise<UtilityItemProps[]> {
  // Leemos cada file css
  const tokensCSS = readFile(paths.tokens)
  const utilitiesCSS = readFile(paths.utilities)

  // obtenemos un json
  const tokens = getProps(tokensCSS)
  let utilities = getSelectors(utilitiesCSS)

  if (query?.length > 0) {
    utilities = utilities.filter((item) => {
      return item.name.includes(query)
    })
  }

  const out = parseUtilities({ utilities, tokens })

  return (out as Record<string, unknown>).items as UtilityItemProps[]
}
