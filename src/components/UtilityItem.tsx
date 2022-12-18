import findCategory from '../lib/findCategory'
import { Action, ActionPanel, Icon, List } from '@raycast/api'
import { RuleType } from '../types'

export default function UtilityItem({ rule }: { rule: RuleType }) {
  const { selector, declaration } = rule
  const cat = findCategory(declaration)

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
