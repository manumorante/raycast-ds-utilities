import { List } from '@raycast/api'

function OptionsDropdown(props: { onChange: (newValue: string) => void }) {
  const dropOptions = [
    {
      id: 'utilities',
      name: 'Utilities',
    },
    {
      id: 'tokens',
      name: 'Tokens',
    },
  ]

  return (
    <List.Dropdown tooltip='Select...' storeValue={true} onChange={(value) => props.onChange(value)}>
      {dropOptions.map((item) => (
        <List.Dropdown.Item key={item.id} title={item.name} value={item.id} />
      ))}
    </List.Dropdown>
  )
}

export default OptionsDropdown
