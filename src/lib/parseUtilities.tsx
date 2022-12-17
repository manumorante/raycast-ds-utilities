import hydrateCSS from './hydrateCSS'
import { DeclarationType, UtilityItemProps } from '../types'

// type Obj = {
//   name: string
//   value: string
// }

// type Params = {
//   utilities: Obj[]
//   tokens: DeclarationType[]
// }

export default function parseUtilities({ utilities, tokens }) {
  const items: UtilityItemProps[] = []

  utilities.map((prop) => {
    const { name } = prop
    const { rule, used } = hydrateCSS({ rule: prop.value, tokens })

    if (name?.length > 0) {
      items.push({ name, replacedValues, tokensUsed })
    }
  })

  return { items }
}
