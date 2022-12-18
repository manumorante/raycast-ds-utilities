import { List } from '@raycast/api'
import { useState, useEffect } from 'react'
import { RuleType } from '../types'
import getUtilities from '../lib/getUtilities'
import UtilityItem from './Item'

type SearchIn = { id: string; name: string }

function DrinkDropdown(props: { searchIn: SearchIn[]; onSearchInChange: (newValue: string) => void }) {
  const { searchIn, onSearchInChange } = props
  return (
    <List.Dropdown
      tooltip='Select...'
      storeValue={true}
      onChange={(newValue) => {
        onSearchInChange(newValue)
      }}>
      {searchIn.map((item) => (
        <List.Dropdown.Item key={item.id} title={item.name} value={item.id} />
      ))}
    </List.Dropdown>
  )
}

export default function UtilityList({ utilityPrefix }: { utilityPrefix: string }) {
  const [state, setState] = useState<{ data: RuleType[] }>({ data: [] })

  const searchIn: SearchIn[] = [
    { id: 'all', name: 'Utilities and Tokens' },
    { id: 'tokens', name: 'Only Tokens' },
  ]

  const onSearchInChange = (newValue: string) => {
    console.log(newValue)
  }

  useEffect(() => {
    async function fetch() {
      const data = await getUtilities({ utilityPrefix })
      setState((old) => ({ ...old, data }))
    }
    fetch()
  }, [])

  return (
    <List
      isLoading={state.data.length === 0}
      searchBarPlaceholder={'Name or token ...'}
      searchBarAccessory={<DrinkDropdown searchIn={searchIn} onSearchInChange={onSearchInChange} />}>
      <List.Section title={utilityPrefix || 'All'}>
        {state.data.map((item, index) => (
          <UtilityItem key={index} rule={item} utilityPrefix={utilityPrefix} />
        ))}
      </List.Section>
    </List>
  )
}
