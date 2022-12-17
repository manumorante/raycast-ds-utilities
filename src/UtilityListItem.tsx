import { paths } from '../config'
import findCategory from './lib/findCategory'
import { UtilityItemProps } from './types'
import { ActionPanel, PasteAction, Icon, List, OpenInBrowserAction } from '@raycast/api'

export default function UtilityListItem({ id, item }: { id: number; item: UtilityItemProps }) {
  const { name, replacedValues, tokensUsed } = item
  const cat = findCategory(replacedValues)
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
          <PasteAction icon={Icon.Hammer} title={`Paste utility: ${name}`} content={name} />
          <PasteAction icon={Icon.Gear} title='Paste CSS' content={replacedValues} />
          <PasteAction icon={Icon.Gear} title={`Paste token: ${tokensUsed}`} content={tokensUsed} />
          <OpenInBrowserAction title='Open utilities file' url={paths.utilities} />
        </ActionPanel>
      }
    />
  )
}
