import { paths } from '../config'
import { readFile, getProps, getSelectors } from './lib/utils'
import parseUtilities from './lib/parseUtilities'
import { List } from '@raycast/api'
import { useState, useEffect } from 'react'
import { UtilityItemProps } from './types'
import UtilityListItem from './UtilityListItem'

export default function UtilityList() {
  const [state, setState] = useState<{ data: UtilityItemProps[] }>({ data: [] })

  useEffect(() => {
    async function fetch() {
      const data = await fetchUtilities()
      setState((old) => ({ ...old, data }))
    }
    fetch()
  }, [])

  return (
    <List isLoading={state.data.length === 0} searchBarPlaceholder='Name or token ...'>
      {state.data.map((item, index) => (
        <UtilityListItem key={index} id={index} item={item} />
      ))}
    </List>
  )
}

async function fetchUtilities(): Promise<UtilityItemProps[]> {
  // Leemos cada file css
  const tokensCSS = readFile(paths.tokens)
  const utilitiesCSS = readFile(paths.utilities)

  // obtenemos un json
  const tokens = getProps(tokensCSS)
  const utilities = getSelectors(utilitiesCSS)

  const out = parseUtilities({ utilities, tokens })

  return (out as Record<string, unknown>).items as UtilityItemProps[]
}
