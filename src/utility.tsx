import { paths } from '../config'
import { readFile, getProps, getSelectors, parseUtilities } from './lib'
import { List } from '@raycast/api'
import UtilityListItem from './UtilityListItem'
import { useState, useEffect } from 'react'

type List = {
  id: string
  title: string
  subtitle: string
  accessory: string
}

export default function UtilityList() {
  const [state, setState] = useState<{ data: List[] }>({ data: [] })

  useEffect(() => {
    async function fetch() {
      const data = await fetchUtilities()
      setState((old) => ({ ...old, data }))
    }
    fetch()
  }, [])

  return (
    <List isLoading={state.data.length === 0} searchBarPlaceholder='Search by name or prop ...'>
      {state.data.map((utility) => (
        <UtilityListItem key={utility.id} utility={utility} />
      ))}
    </List>
  )
}

async function fetchUtilities(): Promise<List[]> {
  // Leemos cada file css
  const tokensCSS = readFile(paths.tokens)
  const utilitiesCSS = readFile(paths.utilities)

  // obtenemos un json
  const tokensJSON = getProps(tokensCSS)
  const utilitiesJSON = getSelectors(utilitiesCSS)

  const out = parseUtilities({ utilitiesJSON, tokensJSON })

  return (out as Record<string, unknown>).items as List[]
}
