import { useWeb3Context } from "../../context/useWeb3Context";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "../../utils/motion.js";
const VoterProfile = () => {
  const [voterProfile, setVoterProfile] = useState([]);
  const [voterProfileId, setVoterProfileId] = useState("Not Registered");
  const voterIdRef = useRef();
  const castVoterIdRef = useRef();
  const candidateIdRef = useRef();
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;

  useEffect(() => {
    const fetchVoterProfile = async () => {
      try {
        const voterProfileId = await contractInstance.getVoterId();
        if (String(voterProfileId) !== "0") {
          const voterProfile = await contractInstance.getVoterProfile(
            voterProfileId
          );
          setVoterProfile(voterProfile);
          setVoterProfileId(voterProfileId);
        }
      } catch (error) {
        toast.error("Error fetching the voter profile id!");
        console.error("Error fetching the voter profile id", error.message);
      }
    };
    contractInstance && fetchVoterProfile();
  }, [contractInstance]);

  const castVote = async (e) => {
    try {
      e.preventDefault();
      const voterId = castVoterIdRef.current.value;
      const candidateId = candidateIdRef.current.value;
      console.log(voterId, candidateId);
      const tx = await contractInstance.vote(voterId, candidateId);
      const receipt = tx.wait();
      toast.success("Vote succesfull!!!");
    } catch (error) {
      if (error.message.includes("Not enough tokens")) {
        toast.error("You do not have enough token balance!");
      } else {
        console.error(error.message);
      }
    }
  };
  const voterDetails = [
    { label: "Name", value: voterProfile[0] },
    { label: "Age", value: String(voterProfile[1]) },
    {
      label: "Gender",
      value:
        String(voterProfile[3]) === "0"
          ? "Male"
          : String(voterProfile[2]) === "1"
          ? "Female"
          : "Others",
    },
    {
      label: "Voter Address",
      value: `${String(voterProfile[5]).substring(0, 10)}...`,
    },
  ];
  return (
    <motion.div className="container flex flex-col justify-start lg:justify-center items-center gap-20 px-4 pt-10  sm:w-full sm:max-w-[400px] lg:flex-row lg:gap-[200px] ">
      {voterProfile.length !== 0 && (
        <motion.div
          variants={slideInFromLeft(0.4)}
          initial="hidden"
          whileInView="visible"
          className="flexColCenter  w-full max-w-[400px] rounded-[12px] border-2 border-primaryColor lg:min-w-[420px] lg:min-h-[500px] lg:px-4"
        >
          <h3 className="text-[16px] sm:text-[22px] font-bold px-4 pt-4 pb-2 lg:text-[28px]  ">
            Decentralised Voter Profile
          </h3>
          <div className="bg-white w-full max-w-[220px] h-[2px] rounded-full lg:max-w-[400px] lg:mb-6"></div>
          <div className=" flex justify-between my-4 font-medium lg:text-[20px]">
            VoterProfileId
            <span className=" min-w-20 flex font-light opacity-80">
              <div className="px-4">:</div>

              {String(voterProfileId)}
            </span>
          </div>
          <div>
            <img
              width={"70px"}
              height={"70px"}
              src={`http://localhost:3000/images/VoterImages/${String(
                voterProfile[5]
              )}.png`}
              alt="Voter Image"
              className="min-h-[100px] lg:min-h-[200px]"
            />
          </div>
          <div className="flex flex-col gap-2 capitalize w-full px-4 mb-6 lg:text-[20px] lg:px-8 lg:gap-3 ">
            {voterDetails.map((item, index) => (
              <div className="flex justify-between font-medium" key={index}>
                {item.label}
                <span className="min-w-20 flex font-light opacity-80 lg:min-w-[160px] ">
                  <div className="pr-4 ">:</div> {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.form
        varients={slideInFromRight(0.8)}
        initial="hidden"
        whileInView="visible"
        onSubmit={castVote}
        className="formContainer lg:min-w-[420px] "
      >
        <div className="formInputWrapper">
          <label className="formInputLabel">Voter Id</label>
          <input type="text" ref={castVoterIdRef} className="formInput"></input>
        </div>
        <div className="formInputWrapper">
          <label className="formInputLabel">Candidate Id</label>
          <input type="text" ref={candidateIdRef} className="formInput"></input>
        </div>
        <button type="submit" className="formSubmitBtn">
          Cast Vote
        </button>
      </motion.form>
    </motion.div>
  );
};

export default VoterProfile;
