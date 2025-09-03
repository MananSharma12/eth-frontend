import './App.css'
import { config } from "./config.ts";
import { useAccount, useConnect, useDisconnect, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet />
      </QueryClientProvider>
    </WagmiProvider>
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
