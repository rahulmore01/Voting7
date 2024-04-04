import { ethers } from "ethers";
import { useRef } from "react";

const SellToken = ({contractInstance,erc20ContractInstance}) => {
    const sellTokenAmountRef = useRef()
    const approveTokenAmountRef = useRef()
    const sellToken = async(e)=>{
       e.preventDefault()
       const tokenValueEth = sellTokenAmountRef.current.value;
       const tokenValueWei = ethers.parseEther(tokenValueEth,18);
       const tx = await contractInstance.sellGLDToken(tokenValueWei)
       const reciept = tx.wait()
       console.log("Transaction Successful")
    }
    const approveToken = async(e)=>{
        e.preventDefault()
        const tokenValueEth = approveTokenAmountRef.current.value;
        const tokenValueWei = ethers.parseEther(tokenValueEth,18);
        const tokenMarketPlace = "0x3e492dd46004fba4f8f8a69fa25154a2bcaf787f"
        const tx = await erc20ContractInstance.approve(tokenMarketPlace,tokenValueWei)
        const reciept = tx.wait()
        console.log("Transaction Successful")
     }
    return ( <>
    <form onSubmit={sellToken}>
      <label>Token Amount To Sell(In Eth):</label>
      <input type="text" ref={sellTokenAmountRef}></input>
      <button type="submit">Sell Token</button>
    </form>
    <form onSubmit={approveToken}>
      <label>Token Amount To Approve(In Eth):</label>
      <input type="text" ref={approveTokenAmountRef}></input>
      <button type="submit">Approve Token</button>
    </form>
    </>);
}
 
export default SellToken;