import { paths } from '../../config'
import getSelectors from './getSelectors'
import { readFile } from './utils'
import getRootVars from './getRootVars'
import hydrateCSS from './hydrateCSS'

export default async function getData() {
  const tokensCSS = readFile(paths.tokens)
  const utilitiesCSS = readFile(paths.utilities)

  const tokens = getRootVars(tokensCSS)
  let utilities = getSelectors(utilitiesCSS)

  // Vamos a llenar un array ya con las reglas (selector + propiedad y valor)
  utilities = utilities.map((rule) => {
    const { selector, declaration } = rule
    const { css } = hydrateCSS({ css: declaration, tokens })

    return { selector, declaration: css }
  })

  return { utilities, tokens }
}
