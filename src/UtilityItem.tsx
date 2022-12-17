import { getPrefix } from './lib/utils'
import findCategory from './lib/findCategory'
import { UtilityItemProps } from './types'
import { Action, ActionPanel, CopyToClipboardAction, Icon, List } from '@raycast/api'
import UtilityList from './UtilityList'

type Params = {
  id: number
  item: UtilityItemProps
  query: string
}

export default function UtilityItem({ id, item, query }: Params) {
  const { name, replacedValues, tokensUsed } = item
  const cat = findCategory(replacedValues)
  const prefix = getPrefix(name)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const icon = Icon[cat.icon]

  return (
    <List.Item
      id={id + name}
      key={id + name}
      icon={icon}
      title={name}
      subtitle={replacedValues}
      accessoryTitle={cat.name}
      keywords={[tokensUsed, replacedValues, cat.name]}
      actions={
        <ActionPanel>
          <CopyToClipboardAction icon={Icon.CopyClipboard} title={`Copy utility: ${name}`} content={name} />
          <CopyToClipboardAction icon={Icon.CopyClipboard} title='Copy CSS' content={replacedValues} />
          {!query && (
            <Action.Push
              icon={Icon.MagnifyingGlass}
              title={`Filter by ${prefix}`}
              target={<UtilityList query={prefix} />}
            />
          )}
        </ActionPanel>
      }
    />
  )
}
