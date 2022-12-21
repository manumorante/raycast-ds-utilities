import { List } from '@raycast/api'
import { useState, useEffect } from 'react'
import { RuleType, DeclarationType } from './types'
import getData from './lib/getData'
import OptionsDropdown from './components/OptionsDropdown'
import Utilities from './components/Utilities'
import Tokens from './components/Tokens'

function Main() {
  const [state, setState] = useState<{ data: { utilities: RuleType[]; tokens: DeclarationType[] } }>({
    data: { utilities: [], tokens: [] },
  })
  const [option, setOption] = useState<string>()

  useEffect(() => {
    async function fetch() {
      const data = await getData()
      setState((old) => ({ ...old, data }))
    }
    fetch()
  }, [])

  return (
    <List
      searchBarPlaceholder='Name or token ...'
      searchBarAccessory={<OptionsDropdown onChange={(value: string) => setOption(value)} />}>
      {option !== 'tokens' ? <Utilities data={state.data.utilities} /> : <Tokens data={state.data.tokens} />}
    </List>
  )
}

export default Main
