import { Action, ActionPanel, Icon, List } from '@raycast/api'
import { DeclarationType } from '../types'

export default function TokenItem({ token }: { token: DeclarationType }) {
  const { property, value } = token

  return (
    <List.Item
      id={property}
      key={property}
      title={property}
      subtitle={value}
      keywords={[property, value]}
      actions={
        <ActionPanel>
          <Action.CopyToClipboard icon={Icon.CopyClipboard} title={`Copy name: ${property}`} content={property} />
          <Action.CopyToClipboard icon={Icon.CopyClipboard} title={`Copy value: ${value}`} content={value} />
        </ActionPanel>
      }
    />
  )
}
