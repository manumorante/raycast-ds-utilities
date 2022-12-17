import { replaceTokensValue } from './utils'
import { UtilityItemProps } from '../types'

export default function parseUtilities({ utilities, tokens }: Params): { items: UtilityItemProps[] } {
  const items: UtilityItemProps[] = []

  utilities.map((prop: Obj) => {
    const { name, value } = prop
    const { replacedValues, tokensUsed } = replaceTokensValue(value, tokens)

    if (name?.length > 0) {
      items.push({ name, replacedValues, tokensUsed })
    }
  })

  return { items }
}

type Obj = {
  name: string
  value: string
}

type Params = {
  utilities: Obj[]
  tokens: Obj[]
}
