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

  const dummyVoterList = [
    {
      name: "vipul",
      1: "abc",
      2: "37n",
      3: 0n,
      4: 2n,
      voterAddress: "0xbB78c165A24376048974ff34EB2472258d1ae7f1",
      6: 0n,
    },
    {
      name: "john",
      1: "xyz",
      2: "25n",
      3: 1n,
      4: 4n,
      voterAddress: "0x1234567890abcdef1234567890abcdef12345678",
      6: 1n,
    },
    {
      name: "alice",
      1: "def",
      2: "30n",
      3: 0n,
      4: 3n,
      voterAddress: "0xAaBbCcDdEeFf00112233445566778899AaBbCcDd",
      6: 1n,
    },
    {
      name: "bob",
      1: "pqr",
      2: "40n",
      3: 1n,
      4: 5n,
      voterAddress: "0x9876543210abcdef9876543210abcdef98765432",
      6: 0n,
    },
    {
      name: "emma",
      1: "lmn",
      2: "29n",
      3: 1n,
      4: 6n,
      voterAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      6: 1n,
    },
  ];

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
            {dummyVoterList.map((voter, index) => (
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
