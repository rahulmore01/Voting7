// import { Web3Context } from "../../context/web3Context";
// import { useContext } from "react";
import { useRef, useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import axios from "axios"

import "./CandidateRegistration.css"
const CandidateRegistration = () => {
    //const {contractInstance} = useContext(Web3Context)
    const {web3State} = useWeb3Context();
    const {contractInstance,selectedAccount}=web3State;
    const [file,setFile]=useState("")
    const nameRef = useRef();
    const genderRef = useRef();
    const ageRef = useRef();
    const partyRef = useRef();

    const handleCandidateRegistration = async(e)=>{
        e.preventDefault()
        const name = nameRef.current.value;
        const gender = genderRef.current.value;
        const age = ageRef.current.value;
        const party = partyRef.current.value;
        await contractInstance.candidateRegister(name, party,age,gender);
        console.log("Transaction Successful!")
    }
    const handleUploadImage = async()=>{
       const formData = new FormData()
       formData.append("file",file)
       const response = await axios.post(`http://localhost:3000/api/postCandidateImage?accountAddress=${selectedAccount}`,formData)
       console.log(response)
    }
    return ( <div>
        <form onSubmit={handleCandidateRegistration}>
            <label>Candidate Name:</label>
            <input type="text" placeholder="Candidate Name" ref={nameRef}></input>
            <label>Candidate Age:</label>
            <input type="text" placeholder="Candidate Age" ref={ageRef}></input>
            <label>Candidate Gender:</label>
            <input type="text" placeholder="Candidate Gender" ref={genderRef}></input>
            <label>Candidate Party:</label>
            <input type="text" placeholder="Candidate Party" ref={partyRef}></input>
             <br></br>
            <button type="submit">Register</button>
        </form>
        <br></br>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])}></input>
        <button onClick={handleUploadImage}>Upload Image</button>
    </div>);
}
 
export default CandidateRegistration;