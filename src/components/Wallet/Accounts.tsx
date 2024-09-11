import type { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import { type Web3ReactHooks } from '@web3-react/core'
import { useEffect, useState } from 'react'

function useBalances(
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
  accounts?: string[]
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>()

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false

      void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
        if (stale) return
        setBalances(balances)
      })

      return () => {
        stale = true
        setBalances(undefined)
      }
    }
  }, [provider, accounts])

  return balances
}

export function Accounts({
  accounts,
  provider,
  ENSNames,
}: {
  accounts: ReturnType<Web3ReactHooks['useAccounts']>
  provider: ReturnType<Web3ReactHooks['useProvider']>
  registed: boolean,
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>
}) {
  const balances = useBalances(provider, accounts)
  if (accounts === undefined) return null

  return (
    <>
      {/* {accounts.length === 0
          ? 'None'
          : accounts?.map((account, i) => (
              <ul key={account}>
                {ENSNames?.[i] ?? account.substr(0, 4) + '...'}
                {balances?.[i] ? ` (Ξ${formatEther(balances[i])})` : null}
              </ul>
            ))} */}
      {ENSNames?.[0] ?? accounts[0].substr(0, 8) + '...' + accounts[0].substr(36)}
      {/* {balances?.[0] ? ` (${formatEther(balances[0]).substr(0, 8)})` : null} */}
    </>
  )
}
