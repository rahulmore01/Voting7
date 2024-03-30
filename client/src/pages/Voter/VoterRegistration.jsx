import { useRef,useState} from "react";
import axios from "axios";
import { useWeb3Context } from "../../context/useWeb3Context";

const VoterRegistration = () => {
  const {web3State} = useWeb3Context();
  const {contractInstance,selectedAccount}=web3State; //const { contractInstance } = useContext(Web3Context);
  const [file,setFile]=useState("")
  const nameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();
  const handleVoterRegistration = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const age = ageRef.current.value;
    const gender = genderRef.current.value;
    await contractInstance.voterRegister(name, age, gender);
    console.log("Voter Registration Successful!");
  };
  
  const handleUploadImage = async()=>{
    const formData = new FormData()
    formData.append("file",file)
    const response = await axios.post(`http://localhost:3000/api/postVoterImage?accountAddress=${selectedAccount}`,formData)
    console.log(response)
 }
  return (
    <>
      <form onSubmit={handleVoterRegistration}>
        <label>Voter Name:</label>
        <input type="text" placeholder="Candidate Name" ref={nameRef} />

        <label>Voter Age:</label>
        <input type="text" placeholder="Candidate Age" ref={ageRef} />

        <label>Voter Gender:</label>
        <input type="text" placeholder="Candidate Gender" ref={genderRef} />
        <br />
        <button type="submit">Voter Register</button>
      </form>
      <br></br>
      <input type="file" onChange={(e)=>setFile(e.target.files[0])}></input>
      <button onClick={handleUploadImage}>Upload Image</button>
    </>
  );
};

export default VoterRegistration;
