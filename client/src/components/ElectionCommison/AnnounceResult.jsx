import { useWeb3Context } from "../../context/useWeb3Context";
import { toast } from "react-hot-toast";
import { Volume1 } from "lucide-react";

const AnnounceResult = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;

  const announceResult = async () => {
    try {
      const tx = await contractInstance.result();
      const reciept = await tx.wait();
      toast.success("Result Announced");
    } catch (error) {
      toast.error("Error start the vote");
      console.error(error.message);
    }
  };
  return (
    <button
      onClick={announceResult}
      className="h-14 uppercase bg-announcement rounded-[8px]  lg:min-w-[420px] flex justify-center items-center gap-2"
    >
      <Volume1 />
      <h3>ANNOUNCE RESULT</h3>
    </button>
  );
};

export default AnnounceResult;
