import { useWeb3Context } from "../../context/useWeb3Context";
import { useRef, useState } from "react";
import "./VoterProfile.css"; // Import your CSS file

const VoterProfile = () => {
  const [voterProfile, setVoterProfile] = useState([]);
  const voterIdRef = useRef();
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;

  const fetchVoterProfile = async (e) => {
    try {
        e.preventDefault();
        const voterId = voterIdRef.current.value;
        const voterProfile = await contractInstance.getVoterProfile(voterId);
        setVoterProfile(voterProfile);   
    } catch (error) {
        console.error("Error fetching the voter profiel",error.message)
    }
  };

  return (
    <>
      <br></br>
      {voterProfile.length !== 0 && 
        (<table className="voter-table"> {/* Add className for table */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Voter Address</th>
            <th>Voter Image</th>
            {/* Add more headings as needed */}
          </tr>
        </thead>
       
          <tbody>
            <tr>
              <td>{voterProfile[0]}</td>
              {/* Assuming voterProfile[0] represents the name */}
              <td>{String(voterProfile[1])}</td>
              {/* Assuming voterProfile[1] represents the age */}
              <td>{String(voterProfile[2])}</td>
              {/* Assuming voterProfile[2] represents the gender */}
              <td>{String(voterProfile[5])}</td>
              {/* Assuming voterProfile[3] represents the voter address */}
              <td className="voter-list-table-data">
                <img
                  width={"70px"}
                  height={"70px"}
                  src={`http://localhost:3000/images/VoterImages/${String(
                    voterProfile[5]
                  )}.png`}
                  alt="Voter Image"
                  className="voter-image" // Add className for image
                ></img>
              </td>
            </tr>
          </tbody>
      </table>)}


      <form onSubmit={fetchVoterProfile}>
        <label>Voter Id:</label>
        <input
          type="text"
          placeholder="voter Id"
          ref={voterIdRef}
          className="form-input" // Add className for input
        ></input>
        <button type="submit" className="form-button">Get Profile</button> {/* Add className for button */}
      </form>
      
    </>
  );
};

export default VoterProfile;
