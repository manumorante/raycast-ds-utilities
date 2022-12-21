import UtilityItem from './UtilityItem'
import { RuleType } from '../types'

export default function Utilities({ data }: { data: RuleType[] }) {
  return (
    <>
      {data.map((item, index) => (
        <UtilityItem key={index} rule={item} />
      ))}
    </>
  )
}
