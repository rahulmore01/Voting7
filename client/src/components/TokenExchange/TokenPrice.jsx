import { ethers } from "ethers";
import { useEffect, useState } from "react";

const TokenPrice = ({contractInstance}) => {
   const [tokenPrice,setTokenPrice]=useState(null)
    useEffect(()=>{
        const fetchTokenPrice = async()=>{
            const tokenPriceWei = await contractInstance.tokenPrice();
            const tokenPriceEth = ethers.formatEther(tokenPriceWei)
            setTokenPrice(tokenPriceEth)
            console.log(tokenPriceEth)
        }
        contractInstance && fetchTokenPrice()
    },[contractInstance])
    return ( <>Token Price: {tokenPrice} eth</> );
}
 
export default TokenPrice;