import { useState,useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
const CandidatesList = () => {
    const {web3State} = useWeb3Context();
    const {contractInstance}=web3State; 
    const [candidateList,setCandidateList]=useState([])

    useEffect(()=>{
      const displayCandidatesList = async()=>{
        const candidateArray = await contractInstance.candidateList();
        console.log(candidateArray)
        setCandidateList(candidateArray)
      }
      contractInstance && displayCandidatesList()
    },[contractInstance])
    return ( <div>
        {candidateList.length!==0?(
           candidateList.map((candidate)=>{
            console.log(candidate.candidateAddress)
             return (
               <ul key={candidate.candidateId}>
                 <li>{candidate.name}</li>
                 <li>{String(candidate.age)}</li>
                 <li>{candidate.party}</li>
                 <li>{candidate.candidateAddress}</li>
                
                 <img src={`http://localhost:3000/images/CandidateImages/${candidate.candidateAddress}.png`}></img>
               </ul>
             )
           })
        ):(
          <p>No Candidates Found</p>
        )}
    </div>);
}
 
export default CandidatesList;


{/* string name;
        string party;
        uint age;
        Gender gender;
        uint candidateId;
        address candidateAddress;
        uint votes; */}