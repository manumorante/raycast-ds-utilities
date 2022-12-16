import { paths } from '../config'
import { getPropCategory } from './lib/utils'
import { ActionPanel, PasteAction, Icon, List, OpenInBrowserAction } from '@raycast/api'

type List = {
  id: string
  title: string
  subtitle: string
  accessory: string
}

export default function UtilityListItem(props: { utility: List }) {
  const { utility } = props
  const { id, title, subtitle, accessory } = utility
  const cat = getPropCategory(accessory)

  return (
    <List.Item
      id={id}
      key={id}
      title={title}
      subtitle={subtitle}
      // icon={cat.icon}
      // accessoryTitle={cat.name}
      // accessoryIcon={cat.icon}
      keywords={[accessory, subtitle, cat.name]}
      actions={
        <ActionPanel>
          <PasteAction icon={Icon.Hammer} title={`Paste utility '${title}'`} content={title} />
          <PasteAction icon={Icon.Gear} title='Paste CSS' content={subtitle} />
          <OpenInBrowserAction title='Open utilities file' url={paths.utilities} />
        </ActionPanel>
      }
    />
  )
}
