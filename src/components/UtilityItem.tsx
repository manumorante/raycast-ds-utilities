import { Action, ActionPanel, List } from '@raycast/api'
import { RuleType } from '../types'

export default function UtilityItem({ rule }: { rule: RuleType }) {
  const { selector, declaration, props = '' } = rule
  const selectorName = selector.replace('.', '')

  const keywords = [...declaration.replaceAll(':', '').split(' '), props]

  return (
    <List.Item
      id={selector}
      key={selector}
      title={selectorName}
      subtitle={declaration}
      accessories={[{ text: props }]}
      keywords={keywords}
      actions={
        <ActionPanel title={selector}>
          <Action.CopyToClipboard title='Copy Utility' content={selectorName} />
          <Action.CopyToClipboard title='Copy CSS' content={declaration} />
        </ActionPanel>
      }
    />
  )
}
