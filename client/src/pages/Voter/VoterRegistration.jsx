import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3Context } from "../../context/useWeb3Context";
import { uploadFile } from "../../utils/voterImageUpload";
import { toast } from "react-hot-toast";
import candidateRegImg from "../../assets/cand-regi.png";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "../../utils/motion";
const VoterRegistration = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const [file, setFile] = useState("");
  const nameRef = useRef();
  const ageRef = useRef();
  const maleRef = useRef();
  const femaleRef = useRef();
  const otherRef = useRef();

  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!token) {
      navigateTo("/");
    }
  }, [navigateTo, token]);

  const handleVoterRegistration = async (e) => {
    try {
      e.preventDefault();
      const name = nameRef.current.value;
      const age = ageRef.current.value;
      let gender;
      if (maleRef.current.checked) {
        gender = 0;
      } else if (femaleRef.current.checked) {
        gender = 1;
      } else {
        gender = 2;
      }
      if (name === "" || gender === "" || age === "") {
        throw new Error("Input fields cannot be empty!!!");
      }
      console.log("log", name, age, gender);
      const tx = await contractInstance.voterRegister(name, age, gender);
      const receipt = await tx.wait();
      if (receipt.status === 1) {
        toast.success("Voter registration succesful");
        await uploadFile(file);
      }
      nameRef.current.value = "";
      ageRef.current.value = "";
    } catch (error) {
      if (error.message.includes("Voter Already Registered")) {
        toast.error("Voter Already Registered");
      } else if (error.message.includes("You are not eligible")) {
        toast.error("You are not eligible to vote");
      } else {
        toast.error("Voter Registration Failed");
      }
      console.error(error.message);
    }
  };

  return (
    <motion.div className="text-white h-full w-full  lg:h-screen flexColCenter !justify-start  px-4 pb-20 lg:justify-center lg:gap-6">
      <motion.div className=" flex flex-col justify-center items-center gap-10  lg:flex-row  lg:gap-[200px]">
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
          onSubmit={handleVoterRegistration}
          className="formContainer  max-w-[420px]  lg:min-w-[420px] "
        >
          <div className="formInputWrapper">
            <label className="formInputLabel">Voter Name</label>
            <input
              type="text"
              placeholder="Voter Name"
              ref={nameRef}
              className="formInput"
            ></input>
          </div>
          <div className="formInputWrapper">
            <label className="formInputLabel">Voter Age</label>
            <input
              type="text"
              placeholder="Voter Age"
              ref={ageRef}
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
        className=" w-full formSubmitBtn max-w-[420px]  mt-10 lg:mt-4"
      >
        Voter Register
      </button>
    </motion.div>
  );
};

export default VoterRegistration;
