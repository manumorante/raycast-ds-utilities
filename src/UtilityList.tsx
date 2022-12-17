import { List } from '@raycast/api'
import { useState, useEffect } from 'react'
import { RuleType } from './types'
import fetchUtilities from './lib/fetchUtilities'
import UtilityItem from './UtilityItem'

export default function UtilityList({ query }: { query: string }) {
  const [state, setState] = useState<{ data: RuleType[] }>({ data: [] })

  useEffect(() => {
    async function fetch() {
      const data = await fetchUtilities({ query })
      setState((old) => ({ ...old, data }))
    }
    fetch()
  }, [])

  return (
    <List isLoading={state.data.length === 0} searchBarPlaceholder={query || 'Name or token ...'}>
      {state.data.map((item, index) => (
        <UtilityItem key={index} rule={item} query={query} />
      ))}
    </List>
  )
}
