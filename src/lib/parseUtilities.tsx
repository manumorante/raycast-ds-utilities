import { sana } from './utils'

export default function parseUtilities({ utilitiesJSON, tokensJSON }: { utilitiesJSON: Array; tokensJSON: Array }) {
  const items: {
    id: string
    title: string
    subtitle: string
    accessory: string
  }[] = []

  type Prop = {
    name: string
    value: string
  }

  utilitiesJSON.map((prop: Prop) => {
    items.push({
      id: prop.name,
      title: prop.name,
      subtitle: sana(prop.value),
      accessory: '',
    })
  })

  return { items }
}
