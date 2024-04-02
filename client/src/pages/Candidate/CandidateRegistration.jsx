// import { Web3Context } from "../../context/web3Context";
// import { useContext } from "react";
import { useRef, useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import axios from "axios"

import "./CandidateRegistration.css"
const CandidateRegistration = () => {
    //const {contractInstance} = useContext(Web3Context)
    const {web3State} = useWeb3Context();
    const {contractInstance}=web3State;
    const [file,setFile]=useState("")
    const nameRef = useRef();
    const genderRef = useRef();
    const ageRef = useRef();
    const partyRef = useRef();

    const handleCandidateRegistration = async(e)=>{
        try {
            e.preventDefault()
            const formData = new FormData()
            formData.append("file",file)

            const token = localStorage.getItem("token")
            const config ={
                headers:{
                    'x-access-token':token
                } 
            }
            await axios.post(`http://localhost:3000/api/postCandidateImage`,formData,config)
            
            const name = nameRef.current.value;
            const gender = genderRef.current.value;
            const age = ageRef.current.value;
            const party = partyRef.current.value;

            if(name==="" || gender==="" || age==="" || party===""){
                throw new Error("Input fields cannot be empty!!!")
            }
            const tx = await contractInstance.candidateRegister(name, party,age,gender);
            const receipt = await tx.wait();
            console.log(receipt)
            nameRef.current.value="";
            ageRef.current.value="";
            genderRef.current.value=""; 
            partyRef.current.value=""     
        } catch (error) {
            console.error(error.message)
        }
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
    </div>);
}
 
export default CandidateRegistration;