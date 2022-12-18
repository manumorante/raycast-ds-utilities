import { List } from '@raycast/api'
import { useState, useEffect } from 'react'
import { RuleType, DeclarationType } from '../types'
import getData from '../lib/getData'
import UtilityItem from './UtilityItem'
import TokenItem from './TokenItem'

type SearchIn = { id: string; name: string }

function DrinkDropdown(props: { dropOptions: SearchIn[]; onSearchInChange: (newValue: string) => void }) {
  const { dropOptions, onSearchInChange } = props
  return (
    <List.Dropdown
      tooltip='Select...'
      storeValue={true}
      onChange={(newValue) => {
        onSearchInChange(newValue)
      }}>
      {dropOptions.map((item) => (
        <List.Dropdown.Item key={item.id} title={item.name} value={item.id} />
      ))}
    </List.Dropdown>
  )
}

export default function UtilityList() {
  const [state, setState] = useState<{ data: { utilities: RuleType[]; tokens: DeclarationType[] } }>({
    data: { utilities: [], tokens: [] },
  })
  const dropOptions: SearchIn[] = [
    { id: 'all', name: 'Utilities and Tokens' },
    { id: 'tokens', name: 'Only Tokens' },
  ]
  const [searchIn, setSearchIn] = useState<string>(dropOptions[0].id)

  const onSearchInChange = (newValue: string) => {
    setSearchIn(newValue)
  }

  useEffect(() => {
    async function fetch() {
      const data = await getData()
      setState((old) => ({ ...old, data }))
    }
    fetch()
  }, [])

  return (
    <List
      searchBarPlaceholder={'Name or token ...'}
      searchBarAccessory={<DrinkDropdown dropOptions={dropOptions} onSearchInChange={onSearchInChange} />}>
      {searchIn !== 'tokens' && <Utility data={state.data.utilities} />}
      <Token data={state.data.tokens} />
    </List>
  )
}

function Utility({ data }: { data: RuleType[] }) {
  return (
    <>
      {data.map((item, index) => (
        <UtilityItem key={index} rule={item} />
      ))}
    </>
  )
}

function Token({ data }: { data: DeclarationType[] }) {
  return (
    <>
      {data.map((token, index) => (
        <TokenItem key={index} token={token} />
      ))}
    </>
  )
}
