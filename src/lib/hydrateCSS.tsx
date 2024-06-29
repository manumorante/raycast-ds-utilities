import { DeclarationType } from '../types'
/**
 * hydrateCSS
 * Comprueba si algun token existe en la linea que le pasamos
 * y lo reemplaza con su valor.
 *
 * Example: `height: var(--size-m)` -> `height: 16px`
 */

type Props = {
  declaration: string
  tokens: DeclarationType[]
}

const hydrateCSS = ({ declaration, tokens }: Props) => {
  let props: string[] = []

  // Recoremos los tokens
  for (const token of tokens) {
    // Regular expression to match `var(--my-token)`
    const tokenExp = new RegExp(`var\\(${token.property}\\)`, 'g')

    // Jump next token when it's not match
    if (!declaration.match(tokenExp)) continue

    declaration = declaration.replace(tokenExp, token.value.trim())
    props.push(token.property)
  }

  // return { declaration, props: props.join(', ') }
  return { hydrated: declaration, props: props.join(', ') }
}

export default hydrateCSS
