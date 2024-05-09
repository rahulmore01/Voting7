import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3Context } from "../../context/useWeb3Context";
import { uploadFile } from "../../utils/candidateImageUpload";
import { toast } from "react-hot-toast";
import candidateRegImg from "../../assets/cand-regi.png";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "../../utils/motion.js";
const CandidateRegistration = () => {
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!token) {
      navigateTo("/");
    }
  }, [navigateTo, token]);
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const [file, setFile] = useState("");
  const nameRef = useRef();
  const maleRef = useRef();
  const femaleRef = useRef();
  const otherRef = useRef();
  const ageRef = useRef();
  const partyRef = useRef();

  const handleCandidateRegistration = async (e) => {
    try {
      e.preventDefault();
      const name = nameRef.current.value;
      const age = ageRef.current.value;
      const party = partyRef.current.value;
      let gender;

      if (maleRef.current.checked) {
        gender = 0;
      } else if (femaleRef.current.checked) {
        gender = 1;
      } else {
        gender = 2;
      }
      console.log(gender);
      if (name === "" || gender === "" || age === "" || party === "") {
        throw new Error("Input fields cannot be empty!!!");
      }
      const tx = await contractInstance.candidateRegister(
        name,
        party,
        age,
        gender
      );
      const receipt = await tx.wait();
      if (receipt.status === 1) {
        toast.success("Candidate Registration Successful");
        await uploadFile(file);
      }
      nameRef.current.value = "";
      ageRef.current.value = "";
      partyRef.current.value = "";
    } catch (error) {
      toast.error("Candidate Registration Failed!!!");
      console.error(error.message);
    }
  };

  return (
    <motion.div className="container lg:h-screen  flex flex-col justify-start items-center px-4 pb-20 lg:justify-center lg:gap-6">
      <motion.div className=" flexColCenter gap-10  lg:flex-row  lg:gap-[200px]">
        <motion.img
          variants={slideInFromLeft(0.4)}
          initial="hidden"
          whileInView="visible"
          src={candidateRegImg}
          alt="candidateRegImg.png"
          className="w-full max-w-[420px] h-auto lg:max-w-[400px] lg:pb-10"
        />

        <motion.form
          variants={slideInFromRight(0.4)}
          initial="hidden"
          whileInView="visible"
          onSubmit={handleCandidateRegistration}
          className="formContainer  max-w-[420px] lg:min-w-[420px] "
        >
          <div className="formInputWrapper">
            <label className="formInputLabel">Candidate Name</label>
            <input
              type="text"
              placeholder="Candidate Name"
              ref={nameRef}
              className="formInput"
            ></input>
          </div>

          <div className="formInputWrapper">
            <label className="formInputLabel">Candidate Age</label>
            <input
              type="text"
              placeholder="Candidate Age"
              ref={ageRef}
              className="formInput"
            ></input>
          </div>
          <div className="formInputWrapper">
            <label className="formInputLabel">Candidate Party</label>
            <input
              type="text"
              placeholder="Candidate Party"
              ref={partyRef}
              className="formInput"
            ></input>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-[14px]">Gender</label>
            <div className="flex gap-4 lg:gap-10">
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  ref={maleRef}
                />
                <label htmlFor="male" className="ml-2">
                  M
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  ref={femaleRef}
                />
                <label htmlFor="female" className="ml-2">
                  F
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                  ref={otherRef}
                />
                <label htmlFor="other" className="ml-2">
                  O
                </label>
              </div>
            </div>
          </div>
          <input
            className="w-[240px]"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
        </motion.form>
      </motion.div>
      <button
        type="submit"
        className="formSubmitBtn w-full max-w-[420px] mt-10 lg:mt-4"
      >
        Register
      </button>
    </motion.div>
  );
};

export default CandidateRegistration;
