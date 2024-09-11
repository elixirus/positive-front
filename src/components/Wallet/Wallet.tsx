import type { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { useWeb3React, type Web3ReactHooks } from '@web3-react/core'
import type { GnosisSafe } from '@web3-react/gnosis-safe'
import type { MetaMask } from '@web3-react/metamask'
import type { Network } from '@web3-react/network'
import type { WalletConnect } from '@web3-react/walletconnect'
import type { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'
import { Accounts } from './Accounts'
import { ConnectWithSelect } from './ConnectWithSelect'
import { Status } from './Status'
// import { Registed } from './Registed'
import { useState } from 'react'
import { isRegisted } from '../../utils/ctf.utils';
// import { Chain } from './Chain'
import { getName } from '../../utils/utils'
import { Chain } from './Chain'

interface Props {
  connector: MetaMask | WalletConnect | WalletConnectV2 | CoinbaseWallet | Network | GnosisSafe
  activeChainId: ReturnType<Web3ReactHooks['useChainId']>
  chainIds?: ReturnType<Web3ReactHooks['useChainId']>[]
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
  error: Error | undefined
  setError: (error: Error | undefined) => void
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>
  provider?: ReturnType<Web3ReactHooks['useProvider']>
  accounts?: string[]
}

export function Wallet({
  connector,
  activeChainId,
  chainIds,
  isActivating,
  isActive,
  error,
  setError,
  ENSNames,
  accounts,
  provider,
}: Props) {

  const [registed, setRegisted] = useState<boolean>(false);
  const { account } = useWeb3React()

  if (!(isActive && account && provider)) { } else {
    isRegisted(account, provider).then((result: boolean) => {
      setRegisted(result)
    })
  }


  return (
    <>

      <ConnectWithSelect
        connector={connector}
        activeChainId={activeChainId}
        chainIds={chainIds}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
      />
      <b>{getName(connector)}</b>
      <Status isActivating={isActivating} isActive={isActive} error={error} />
      <Accounts accounts={accounts} provider={provider} registed={registed} ENSNames={ENSNames} />
      {/* <Chain chainId={activeChainId} /> */}
      {/* <div style={{ marginBottom: '1rem' }}></div> */}

    </>
  )
}
