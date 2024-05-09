import AnnounceResult from "../../components/ElectionCommison/AnnounceResult";
import DisplayWinner from "../../components/ElectionCommison/DisplayWinner";
import VotingStartForm from "../../components/ElectionCommison/VotingStartForm";
import VotingStatus from "../../components/ElectionCommison/VotingStatus";
import EmergencyDeclare from "../../components/ElectionCommison/EmergencyDeclare";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import electionCommis from "../../assets/ele-com.png";
import { motion } from "framer-motion";

import {
  slideInFromBottom,
  slideInFromLeft,
  slideInFromTop,
} from "../../utils/motion.js";
const ElectionCommision = () => {
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!token) {
      navigateTo("/");
    }
  }, [navigateTo, token]);
  return (
    <motion.div className="text-white w-screen   h-screen px-4 flex flex-col items-center">
      <motion.div className="w-full max-w-[420px]  lg:w-full lg:max-w-full h-full px-4">
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          whileInView="visible"
          className="highlBar  lg:px-4 lg:h-20 flexColCenter   lg:flex-row  lg:justify-between   md:text-[14px] "
        >
          <VotingStatus />
          <DisplayWinner />
        </motion.div>
        <motion.div className="flex flex-col mt-14 lg:mt-20 lg:justify-center lg:items-center">
          <div className="flex flex-col lg:flex-row  lg:gap-[200px]">
            <motion.img
              variants={slideInFromLeft(0.4)}
              initial="hidden"
              whileInView="visible"
              src={electionCommis}
              alt="electionCommis.png"
              className="hidden lg:block lg:w-[300px]"
            />

            <VotingStartForm />
          </div>
          <div className="bg-white w-full h-1 mt-4 opacity-30 md:hidden"></div>

          <motion.div
            variants={slideInFromBottom(0.6)}
            initial="hidden"
            whileInView="visible"
            className="flex flex-col lg:flex-row mt-20 gap-4 lg:gap-16 "
          >
            <AnnounceResult />
            <EmergencyDeclare />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ElectionCommision;
