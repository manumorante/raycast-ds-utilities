import { paths } from '../../config'
import getSelectors from './getSelectors'
import { readFile } from './utils'
import getRootVars from './getRootVars'
import hydrateCSS from './hydrateCSS'

export default async function getUtilities({ utilityPrefix }: { utilityPrefix: string | '' }) {
  const tokensCSS = readFile(paths.tokens)
  const utilitiesCSS = readFile(paths.utilities)

  const tokens = getRootVars(tokensCSS)
  let utilities = getSelectors(utilitiesCSS)

  // Filtramos por utilityPrefix
  if (utilityPrefix?.length > 0) {
    utilities = utilities.filter((item) => item.selector.includes(utilityPrefix))
  }

  // Vamos a llenar un array ya con las reglas (selector + propiedad y valor)
  utilities = utilities.map((rule) => {
    const { selector, declaration } = rule
    const { css } = hydrateCSS({ css: declaration, tokens })

    return { selector, declaration: css }
  })

  return utilities
}
