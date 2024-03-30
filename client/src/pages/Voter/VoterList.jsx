import { useState,useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
const VoterList = () => {
  const {web3State} = useWeb3Context();
  const {contractInstance}=web3State; 
    const [voterList,setVoterList]=useState([])
    useEffect(()=>{
      const displayVoterList = async()=>{
        const voterArray = await contractInstance.voterList();
        setVoterList(voterArray)
      }
      contractInstance && displayVoterList()
    },[contractInstance])
    return ( <div>
      {voterList.length!==0?(
         voterList.map((voter)=>{
           return (
             <ul key={voter.voterId}>
               <li>{voter.name}</li>
               <li>{String(voter.age)}</li>
               <li>{voter.voterAddress}</li>
               <img src={`http://localhost:3000/images/VoterImages/${voter.voterAddress}.png`}></img>
             </ul>
           )
         })
      ):(
        <p>No Candidates Found</p>
      )}
  </div>);
}
 
export default VoterList;