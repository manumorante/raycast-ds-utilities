import { paths } from '../../config'
import getSelectors from './getSelectors'
import { readFile } from './utils'
import getRootVars from './getRootVars'
import hydrateCSS from './hydrateCSS'

export default async function fetchUtilities({ query }: { query: string | '' }) {
  const tokensCSS = readFile(paths.tokens)
  const utilitiesCSS = readFile(paths.utilities)

  const tokens = getRootVars(tokensCSS)
  let utilities = getSelectors(utilitiesCSS)

  // Filtramos por query
  if (query?.length > 0) {
    utilities = utilities.filter((item) => item.selector.includes(query))
  }

  // Vamos a llenar un array ya con las reglas (selector + propiedad y valor)
  utilities = utilities.map((rule) => {
    const { selector, declaration } = rule
    const { css } = hydrateCSS({ css: declaration, tokens })

    return { selector, declaration: css }
  })

  return utilities
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
