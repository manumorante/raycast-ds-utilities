import { DeclarationType } from '../types'
import TokenItem from './TokenItem'

export default function Token({ data }: { data: DeclarationType[] }) {
  return (
    <>
      {data.map((token, index) => (
        <TokenItem key={index} token={token} />
      ))}
    </>
  )
}
