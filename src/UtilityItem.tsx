import { getPrefix } from './lib/utils'
import findCategory from './lib/findCategory'
import { UtilityItemProps } from './types'
import { Action, ActionPanel, PasteAction, Icon, List } from '@raycast/api'
import UtilityList from './UtilityList'

export default function UtilityItem({ id, item }: { id: number; item: UtilityItemProps }) {
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
      // icon={cat.icon}
      title={name}
      subtitle={replacedValues}
      accessoryIcon={icon}
      accessoryTitle={cat.name}
      keywords={[tokensUsed, replacedValues, cat.name]}
      actions={
        <ActionPanel>
          <Action.Push title='Show MyList' target={<UtilityList query={prefix} />} />
          <PasteAction icon={Icon.Hammer} title={`Paste utility: ${name}`} content={name} />
          <PasteAction icon={Icon.Gear} title='Paste CSS' content={replacedValues} />
          <PasteAction icon={Icon.Gear} title={`Paste token: ${tokensUsed}`} content={tokensUsed} />
        </ActionPanel>
      }
    />
  )
}
