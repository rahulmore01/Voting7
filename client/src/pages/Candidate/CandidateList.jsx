import { useState, useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { slideInFromBottom, slideInFromTop } from "../../utils/motion";

const CandidatesList = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const [candidateList, setCandidateList] = useState([]);
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!token) {
      navigateTo("/");
    }
  }, [navigateTo, token]);

  useEffect(() => {
    const displayCandidatesList = async () => {
      try {
        const candidateArray = await contractInstance.candidateList();
        setCandidateList(candidateArray);
      } catch (error) {
        console.log(error.message);
      }
    };
    contractInstance && displayCandidatesList();
  }, [contractInstance]);

  return (
    <motion.div className="w-full h-screen flexColCenter">
      <motion.div className="container min-w-[200px] flexColCenter !justify-start overflow-x-auto px-10 lg:px-20 pt-10">
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          whileInView="visible"
          className="overflow-x-auto"
        >
          <h1 className="text-[32px] font-semibold">Candidates list</h1>
          <div className="horizontalLine lg:max-w-[400px] mb-14 lg:mb-6"></div>
        </motion.div>

        {candidateList.length !== 0 ? (
          <motion.table className="w-full flex flex-col gap-14 overflow-x-auto ">
            <motion.thead
              variants={slideInFromBottom(0.5)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <tr className="flex justify-start items-center  primaryBorder px-10 py-4 min-w-[1275px]">
                <th className="w-10">No.</th>
                <th className="w-40">Image</th>
                <th className="w-[340px]">Name</th>
                <th className="w-24">Party</th>
                <th className="w-28">Vote Count</th>
                <th className="w-[500px]">Wallet Address</th>
              </tr>
            </motion.thead>
            <motion.tbody
              variants={slideInFromBottom(0.5)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-8  primaryBorder px-10 py-4 min-w-[1275px] mb-20"
            >
              {candidateList.map((candidate, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "even-row" : "odd-row"
                  } flex  justify-center items-center text-center`}
                >
                  <td className="w-10">{index + 1}</td>
                  <td className="w-40 flex justify-center">
                    <img
                      width={"70px"}
                      height={"70px"}
                      src={`http://localhost:3000/images/CandidateImages/${candidate.candidateAddress}.png`}
                      className="rounded-full"
                    />
                  </td>
                  <td className="w-[340px]">{candidate.name}</td>
                  <td className="w-24">{candidate.party}</td>
                  <td className="w-28">{String(candidate.votes)}</td>
                  <td className="w-[500px]">{candidate.candidateAddress}</td>
                </tr>
              ))}
            </motion.tbody>
          </motion.table>
        ) : (
          <p>No Candidates Found!</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CandidatesList;
