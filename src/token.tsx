import { paths } from '../config'
import { readFile } from './lib/utils'
import parseTokens from './lib/parseTokens'
import { ActionPanel, CopyToClipboardAction, List, OpenInBrowserAction } from '@raycast/api'
import { useState, useEffect } from 'react'

type List = {
  id: string
  title: string
  subtitle: string
  accessory: string
}

export default function TokenList() {
  const [state, setState] = useState<{ data: List[] }>({ data: [] })

  useEffect(() => {
    async function fetch() {
      const data = await fetchData()
      setState((old) => ({ ...old, data }))
    }
    fetch()
  }, [])

  return (
    <List isLoading={state.data.length === 0} searchBarPlaceholder='Name or prop ...'>
      {state.data.map((token, index) => (
        <ListItem key={index} token={token} />
      ))}
    </List>
  )
}

function ListItem(props: { token: List }) {
  const { token } = props
  const { id, title, subtitle } = token

  return (
    <List.Item
      id={id}
      key={id}
      title={title}
      subtitle={subtitle}
      icon='🔹'
      accessoryTitle={token.accessory}
      keywords={[token.accessory, token.subtitle]}
      actions={
        <ActionPanel>
          <CopyToClipboardAction title='Copy token' content={token.title} />
          <CopyToClipboardAction title='Copy CSS' content={token.subtitle} />
          <OpenInBrowserAction title='Open tokens file' url={paths.tokens} />
        </ActionPanel>
      }
    />
  )
}

async function fetchData(): Promise<List[]> {
  const css = readFile(paths.tokens)
  const json = parseTokens(css)

  return (json as Record<string, unknown>).items as List[]
}
