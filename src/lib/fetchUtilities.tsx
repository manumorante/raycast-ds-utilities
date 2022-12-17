import { paths } from '../../config'
import { readFile, getProps, getSelectors } from './utils'
import parseUtilities from './parseUtilities'
import { UtilityItemProps } from '../types'



export default async function fetchUtilities({ query }: { query: string | '' }): Promise<UtilityItemProps[]> {
  const tokensCSS = readFile(paths.tokens)
  const utilitiesCSS = readFile(paths.utilities)

  const tokens = getProps(tokensCSS)
  let utilities = getSelectors(utilitiesCSS)

  // Filtramos por query
  if (query?.length > 0) {
    utilities = utilities.filter((item) => {
      return item.name.includes(query)
    })
  }

  const out = parseUtilities({ utilities, tokens })

  return (out as Record<string, unknown>).items as UtilityItemProps[]
}

// if (query === '') {
//   // Ignora items con igual prefijo al anterior
//   let oldPrefix = ''
//   utilities = utilities.filter((item) => {
//     const prefix = getPrefix(item.name)
//     const check = prefix !== oldPrefix
//     oldPrefix = prefix

//     return check
//   })
// }
