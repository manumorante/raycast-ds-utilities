import { settings } from './settings'
import { readFile, parseTokens } from './utils'
import { ActionPanel, CopyToClipboardAction, List, OpenInBrowserAction, showToast, ToastStyle } from '@raycast/api'
import { useState, useEffect } from 'react'

export default function TokenList() {
  const [state, setState] = useState<{ data: List[] }>({ data: [] })

  useEffect(() => {
    async function fetch() {
      const data = await fetchData()
      setState((oldState) => ({ ...oldState, data }))
    }
    fetch()
  }, [])

  return (
    <List isLoading={state.data.length === 0} searchBarPlaceholder='Name or prop ...'>
      {state.data.map((token) => (
        <ListItem key={token.id} token={token} />
      ))}
    </List>
  )
}

function ListItem(props: { token: List }) {
  const token = props.token

  return (
    <List.Item
      id={token.id}
      key={token.id}
      title={token.title}
      subtitle={token.subtitle}
      icon='🔹'
      accessoryTitle={token.accessory}
      keywords={[token.accessory, token.subtitle]}
      actions={
        <ActionPanel>
          <CopyToClipboardAction title='Copy token' content={token.title} />
          <CopyToClipboardAction title='Copy CSS' content={token.subtitle} />
          <OpenInBrowserAction title='Open tokens file' url={settings.tokens} />
        </ActionPanel>
      }
    />
  )
}

async function fetchData(): Promise<List[]> {
  try {
    const css = readFile(settings.tokens)
    const json = parseTokens(css)
    return (json as Record<string, unknown>).items as List[]
  } catch (error) {
    console.error(error)
    showToast(ToastStyle.Failure, `Error loading settings.tokens(${settings.tokens})`)
    return Promise.resolve([])
  }
}

type List = {
  id: string
  title: string
  subtitle: string
  accessory: string
}
