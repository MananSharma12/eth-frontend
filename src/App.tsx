import './App.css'
import { config } from "./config.ts";
import { useAccount, useConnect, useDisconnect, useReadContract, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { USDT, USDT_Address } from './ABIs'
import {AllowUSDT} from "./AllowUSDT.tsx";

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet />
        <AllowUSDT />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function TotalBalance() {
  const { data: totalSupply, isLoading: isLoading1 } = useReadContract({
    address: USDT_Address,
    abi: USDT,
    functionName: 'totalSupply',
  })

  const { address } = useAccount()

  const { data: balance, isLoading: isLoading2 } = useReadContract({
    address: USDT_Address,
    abi: USDT,
    functionName: 'balanceOf',
    args: [address?.toString()],
  })

  if (isLoading1 || isLoading2) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>Your Balance: {balance?.toString()}</div>
      <div>Total Supply: {totalSupply?.toString()}</div>
    </>
  )
}

function ConnectWallet() {
  const { connect, connectors } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <>
        <div>Connected: {address}</div>
        <button onClick={() => disconnect()}>Disconnect</button>
        <TotalBalance />
      </>
    )
  }

  return (
    connectors.map(
      connector =>
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
        >
          Connect via {connector.name}
        </button>
    )
  )
}

export default App
