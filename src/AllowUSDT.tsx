import type { FormEvent } from "react";
import { useWriteContract } from "wagmi";
import { USDT, USDT_Address } from "./ABIs";

export const AllowUSDT = () => {
  const { data, writeContract } = useWriteContract();

  function submit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    
    writeContract({
      address: USDT_Address,
      abi: USDT,
      functionName: 'approve',
      args: [USDT_Address, BigInt(10000000)],
    });
  }

  return (
    <form onSubmit={submit}>
      <input name="tokenId" placeholder="69420" required />
      <button type="submit">Allow USDT</button>
      {data && <div>Txn Hash: {data}</div>}
    </form>
  );
}
