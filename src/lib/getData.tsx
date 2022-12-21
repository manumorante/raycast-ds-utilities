import { paths } from '../../config'
import getSelectors from './getSelectors'
import { readFile } from './utils'
import getRootVars from './getRootVars'
import hydrateCSS from './hydrateCSS'

/**
 *
 * Esta función es una función asincrónica que lee dos archivos CSS y
 * procesa su contenido para devolver dos objetos: "utilities" y "tokens".
 * La función primero lee los archivos CSS y luego procesa el contenido de
 * cada uno para extraer las variables y las reglas de selección.
 * 
 * A continuación, se aplican algunas transformaciones a las reglas
 * de selección y se devuelven los objetos procesados
 * junto con el contenido original de los archivos CSS.
 */

const getData = async () => {
  const tokensCSS = readFile(paths.tokens)
  const utilitiesCSS = readFile(paths.utilities)

  const tokens = getRootVars(tokensCSS)
  let utilities = getSelectors(utilitiesCSS)

  utilities = utilities.map((rule) => {
    const { selector, declaration } = rule
    const { css } = hydrateCSS({ css: declaration, tokens })

    return { selector, declaration: css }
  })

  return { utilities, tokens }
}

export default getData
