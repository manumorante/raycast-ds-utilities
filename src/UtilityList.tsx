import { List } from '@raycast/api'
import { useState, useEffect } from 'react'
import { UtilityItemProps } from './types'
import fetchUtilities from './lib/fetchUtilities'
import UtilityItem from './UtilityItem'

export default function UtilityList({ query }: { query: string }) {
  const [state, setState] = useState<{ data: UtilityItemProps[] }>({ data: [] })

  useEffect(() => {
    async function fetch() {
      const data = await fetchUtilities({ query })
      setState((old) => ({ ...old, data }))
    }
    fetch()
  }, [])

  return (
    <List isLoading={state.data.length === 0} searchBarPlaceholder='Name or token ...'>
      {query && <List.Item id='query' key='query' title='' subtitle={`${query}`} />}
      {state.data.map((item, index) => (
        <UtilityItem key={index} id={index} item={item} />
      ))}
    </List>
  )
}
