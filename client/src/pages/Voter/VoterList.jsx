import { useState, useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { motion } from "framer-motion";
import { slideInFromBottom, slideInFromTop } from "../../utils/motion";
import { useNavigate } from "react-router-dom";

const VoterList = () => {
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!token) {
      navigateTo("/");
    }
  }, [navigateTo, token]);

  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const [voterList, setVoterList] = useState([]);

  useEffect(() => {
    const displayVoterList = async () => {
      try {
        const voterArray = await contractInstance.voterList();
        setVoterList(voterArray);
      } catch (error) {
        console.log(error.message);
      }
    };
    contractInstance && displayVoterList();
  }, [contractInstance]);

  return (
    <motion.div className="container flexColCenter !justify-start overflow-x-scroll lg:overflow-hidden">
      <motion.div className="w-full h-full overflow-x-auto px-10 lg:px-20">
        <motion.table className="flex flex-col gap-14 mt-10 ">
          <motion.thead
            variants={slideInFromTop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <tr className="flex justify-start items-center  primaryBorder px-10 py-4 min-w-[1275px] ">
              <th className="w-10">No.</th>
              <th className="w-[300px]">Image</th>
              <th className="w-[340px]">Name</th>
              <th className="w-[500px]">Wallet Address</th>
            </tr>
          </motion.thead>
          <motion.tbody
            variants={slideInFromBottom(0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-8  primaryBorder px-10 py-4 min-w-[1275px]"
          >
            {voterList.map((voter, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "even-row" : "odd-row"
                } flex  justify-start items-center text-center`}
              >
                <td className="w-10">{index + 1}</td>
                <td className="w-[300px] flex justify-center">
                  <img
                    width={"70px"}
                    height={"70px"}
                    src={`http://localhost:3000/images/VoterImages/${voter.voterAddress}.png`}
                    className="rounded-full"
                  />
                </td>
                <td className="w-[340px]">{voter.name}</td>
                <td className="w-[500px]">{voter.voterAddress}</td>
              </tr>
            ))}
          </motion.tbody>
        </motion.table>
      </motion.div>
    </motion.div>
  );
};

export default VoterList;
