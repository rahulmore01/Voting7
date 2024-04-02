import {ethers}  from "ethers";
import abi from "../constants/abi.json"
import axios from "axios"
//0x37E12969960C760E9538b77c3e9D8693A92537a8
//0xe247F53E1201D5573a2dFA6600a6daE9753BB16e - erc20
export const getWeb3State = async()=>{
  let [contractInstance,selectedAccount,chainId] = [null,null,null,null];
  try {
    if(!window.ethereum){
        throw new Error("Metamask is not installed");
      }
      const accounts = await window.ethereum.request({
        method:'eth_requestAccounts'
      })
      let chainIdHex = await window.ethereum.request({
        method:'eth_chainId'
      })
      chainId=parseInt(chainIdHex,16);
      selectedAccount = accounts[0];
      //read operation
      const provider = new ethers.BrowserProvider(window.ethereum);
      //write operation
      const signer = await provider.getSigner();
      
      const message = "You accept the terms and conditions of voting dapp"
      const signature = await signer.signMessage(message)

      const dataSignature ={
        signature
      }
      const res = await axios.post(`http://localhost:3000/api/authentication?accountAddress=${selectedAccount}`,dataSignature)
      
      localStorage.setItem("token",res.data.token)

      const contractAddress = "0x37E12969960C760E9538b77c3e9D8693A92537a8";
      contractInstance = new ethers.Contract(contractAddress,abi,signer);
      return {contractInstance,chainId,selectedAccount};
  } catch (error) {
    console.error("Not able to get the web3states",error.message);
    throw error;
  }
  
}