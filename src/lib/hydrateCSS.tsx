import { DeclarationType } from '../types'
/**
 * hydrateCSS
 * Comprueba si algun token existe en la linea que le pasamos
 * y lo reemplaza con su valor.
 *
 * Example: `height: var(--size-m)` -> `height: 16px`
 */

type Props = {
  css: string
  tokens: DeclarationType[]
}

export default function hydrateCSS({ css, tokens }: Props) {
  // const matches: string[] = []

  // Recoremos los tokens
  for (const token of tokens) {
    // Regular expression to match `var(--my-token)`
    const tokenExp = new RegExp(`var\\(${token.property}\\)`, 'g')

    // Jump next token when it's not match
    if (!css.match(tokenExp)) continue

    css = css.replace(tokenExp, token.value.trim())
    // matches.push(token.name)
  }

  // return { css, matches: matches.join(', ') }
  return { css }
}
