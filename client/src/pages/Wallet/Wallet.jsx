import { useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import heroBg from "../../assets/hero-bg.png";
import { motion } from "framer-motion";
import { slideInFromBottom } from "../../utils/motion.js";
const Wallet = () => {
  const navigateTo = useNavigate();
  const { handleWallet, web3State } = useWeb3Context();
  const { selectedAccount } = web3State;

  useEffect(() => {
    if (selectedAccount) {
      navigateTo("/voter-profile");
    }
  }, [selectedAccount, navigateTo]);

  return (
    <motion.div className="w-screen h-screen flex flex-col justify-center items-center  text-white bg-primaryBg md:px-6">
      <motion.h1
        variants={slideInFromBottom(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-[24px] md:text-[40px] lg:text-[62px] font-black text-center z-10"
      >
        The Decentralised Voting Platform.
      </motion.h1>
      <motion.h2
        variants={slideInFromBottom(0.3)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-[16px] md:text-[22px] lg:text-[24px] !opacity-70 mb-8 text-center z-10"
      >
        Spend less money in projects while providing a learning curve for
        students worldwide.
      </motion.h2>
      <motion.button
        variants={slideInFromBottom(0.4)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        onClick={handleWallet}
        className="px-7 py-3 text-[16px] font-medium rounded-[6px] bg-primaryColor flex  z-10 lg:px-10 lg:py-4 md:rounded-[8px]"
      >
        Connect Wallet <ArrowUpRight />
      </motion.button>
      <img
        src={heroBg}
        alt="hero-bg.png"
        className="absolute bottom-0 z-0 h-full w-full object-cover "
      />
    </motion.div>
  );
};

export default Wallet;
