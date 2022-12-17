import { sana } from './utils'
import getRootVars from './getRootVars'

// parseTokens
export default function parseTokens(css: string) {
  const props = getRootVars(css)

  const items: {
    id: string
    title: string
    subtitle: string
    accessory: string
  }[] = []

  props.map((prop, id) => {
    const name = prop.name
    const value = sana(prop.value)

    items.push({
      id: '#' + id,
      title: name,
      subtitle: value,
      accessory: '',
    })
  })

  return { items }
}
