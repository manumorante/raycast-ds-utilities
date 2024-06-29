import { List } from '@raycast/api'
import { useCachedPromise } from '@raycast/utils'
import getData from './lib/getData'
import UtilityItem from './components/UtilityItem'
import TokenItem from './components/TokenItem'
import { Data } from './types'

export default function Main() {
  const fetchData = async (): Promise<Data> => {
    const rsp = await getData()
    return rsp
  }

  const { isLoading, data } = useCachedPromise(fetchData, [], {
    initialData: { utilities: [], tokens: [] },
  })

  return (
    <List isLoading={isLoading} searchBarPlaceholder='Utility name or token ...'>
      <List.Section title='Utilities'>
        {data.utilities.map((item, index) => (
          <UtilityItem key={index} rule={item} />
        ))}
      </List.Section>

      <List.Section title='Tokens'>
        {data.tokens.map((token, index) => (
          <TokenItem key={index} token={token} />
        ))}
      </List.Section>
    </List>
  )
}
