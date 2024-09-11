import type { Web3ReactHooks } from '@web3-react/core'

import { CHAINS } from '../../utils/chains'

export function Chain({ chainId }: { chainId: ReturnType<Web3ReactHooks['useChainId']> }) {
  if (chainId === undefined) return null

  const name = chainId ? CHAINS[chainId]?.name : undefined

  if (name) {
    return (
        <>
          {name} ({chainId})
        </>
    )
  }

  return (
    <>
      {chainId}
    </>
  )
}
