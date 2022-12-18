import { getPrefix } from '../lib/utils'
import findCategory from '../lib/findCategory'
import { Action, ActionPanel, Icon, List } from '@raycast/api'
import UtilityList from './List'
import { RuleType } from '../types'

type Props = {
  rule: RuleType
  query: string
}

export default function UtilityItem({ rule, query }: Props) {
  const { selector, declaration } = rule
  const cat = findCategory(declaration)
  const prefix = getPrefix(selector)

  // Search by ...
  // ...props and real values: "color", "height: 40px", "100%"
  // ...props and real values: "color", "height: 40px", "100%"
  // ...category name: "box model", "visibility", "fx"
  const keywords = [declaration, declaration.replaceAll(':', ''), cat.name]

  return (
    <List.Item
      id={selector}
      key={selector}
      icon={cat.icon}
      title={selector}
      subtitle={declaration}
      accessories={[{ text: cat.name }]}
      keywords={keywords}
      actions={
        <ActionPanel title={selector}>
          {!query && (
            <Action.Push
              icon={Icon.MagnifyingGlass}
              title={`Filter by ${prefix}`}
              target={<UtilityList query={prefix} />}
            />
          )}
          <Action.CopyToClipboard icon={Icon.CopyClipboard} title={`Copy utility: ${selector}`} content={selector} />
          <Action.CopyToClipboard
            icon={Icon.CopyClipboard}
            title='Copy CSS'
            content={declaration}
            shortcut={{ modifiers: ['opt'], key: 'c' }}
          />
        </ActionPanel>
      }
    />
  )
}
