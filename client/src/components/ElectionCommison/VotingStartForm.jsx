import { useWeb3Context } from "../../context/useWeb3Context";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { slideInFromRight } from "../../utils/motion.js";
const VotingStartForm = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const startTimeRef = useRef();
  const endTimeRef = useRef();

  const timeInSeconds = (time) => {
    const date = new Date(time);
    return Math.floor(date.getTime() / 1000);
  };
  const handleVotingTime = async (e) => {
    e.preventDefault();
    const startTime = startTimeRef.current.value;
    const endTime = endTimeRef.current.value;

    const startTimeSec = timeInSeconds(startTime);
    const endTimeSec = timeInSeconds(endTime);
    try {
      const tx = await contractInstance.voteTime(startTimeSec, endTimeSec);
      const receipt = tx.wait();
      toast.success("Voting Started");
    } catch (error) {
      toast.error("Error start the vote");
      console.error(error.message);
    }
  };
  return (
    <>
      <motion.div
        variants={slideInFromRight(0.4)}
        initial="hidden"
        whileInView="visible"
      >
        <form
          onSubmit={handleVotingTime}
          className="formContainer lg:min-w-[420px] "
        >
          <div className="formInputWrapper">
            <label htmlFor="start" className="formInputLabel">
              Start Time
            </label>
            <input
              type="datetime-local"
              id="start"
              ref={startTimeRef}
              className="formInput"
            ></input>
          </div>
          <div className="formInputWrapper">
            <label htmlFor="end" className="formInputLabel">
              End Time
            </label>
            <input
              type="datetime-local"
              id="end"
              ref={endTimeRef}
              required
              className="formInput"
            ></input>
          </div>

          <button type="submit" className="formSubmitBtn">
            Voting Start
          </button>
        </form>
      </motion.div>
    </>
  );
};

export default VotingStartForm;
