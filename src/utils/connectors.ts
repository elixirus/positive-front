import type { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { Web3ReactHooks } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import type { Network } from '@web3-react/network'
import type { WalletConnect } from '@web3-react/walletconnect'
import type { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

import { coinbaseWallet, hooks as coinbaseWalletHooks } from './connectors/coinbaseWallet'
import { hooks as metaMaskHooks, metaMask } from './connectors/metaMask'
import { hooks as networkHooks, network } from './connectors/network'
import { hooks as walletConnectHooks, walletConnect } from './connectors/walletConnect'
import { hooks as walletConnectV2Hooks, walletConnectV2 } from './connectors/walletConnectV2'

export const connectors: [MetaMask | WalletConnect | WalletConnectV2 | CoinbaseWallet | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [walletConnectV2, walletConnectV2Hooks],
  [coinbaseWallet, coinbaseWalletHooks],
  [network, networkHooks],
]