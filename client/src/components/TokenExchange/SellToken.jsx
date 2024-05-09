import { ethers } from "ethers";
import { useRef } from "react";
import { toast } from "react-hot-toast";
const SellToken = ({ contractInstance, erc20ContractInstance }) => {
  const sellTokenAmountRef = useRef();
  const approveTokenAmountRef = useRef();
  const sellToken = async (e) => {
    try {
      e.preventDefault();
      const tokenValueEth = sellTokenAmountRef.current.value;
      const tokenValueWei = ethers.parseEther(tokenValueEth, 18);
      const tx = await contractInstance.sellGLDToken(tokenValueWei);
      const reciept = await tx.wait();
      toast.success("Transaction Successful");
    } catch (error) {
      console.error(error.message);
      toast.error("Transaction Failed");
    }
  };
  const approveToken = async (e) => {
    try {
      e.preventDefault();
      const tokenValueEth = approveTokenAmountRef.current.value;
      const tokenValueWei = ethers.parseEther(tokenValueEth, 18);
      const tokenMarketPlace = "0x3e492dd46004fba4f8f8a69fa25154a2bcaf787f";
      const tx = await erc20ContractInstance.approve(
        tokenMarketPlace,
        tokenValueWei
      );
      const reciept = await tx.wait();
      toast.success("Transaction Successful");
    } catch (error) {
      console.error(error.message);
      toast.error("Contract Instance Not Ready");
    }
  };
  return (
    <div className="w-full max-w-[460px] bg-secNav bg-opacity-10 p-6 rounded-xl ">
      <form
        onSubmit={sellToken}
        className="formContainer  max-w-[420px]  lg:min-w-[420px] mb-20 "
      >
        <div className="formInputWrapper">
          <label className="formInputLabel"> Token Amount To Sell</label>
          <input
            type="text"
            placeholder="Number of tokens to sell"
            ref={sellTokenAmountRef}
            className="formInput"
          ></input>
        </div>

        <button
          type="submit"
          className="formSubmitBtn w-full max-w-[420px] mt-10 lg:mt-4"
        >
          Sell Token
        </button>
      </form>
      <form
        onSubmit={approveToken}
        className="formContainer  max-w-[420px]  lg:min-w-[420px] "
      >
        <div className="formInputWrapper">
          <label className="formInputLabel">
            Token Amount To Approve(In Eth)
          </label>
          <input
            type="text"
            ref={approveTokenAmountRef}
            placeholder="Number of tokens to approve"
            className="formInput"
          ></input>
        </div>

        <button
          type="submit"
          className="formSubmitBtn w-full max-w-[420px] mt-10 lg:mt-4"
        >
          Approve Token
        </button>
      </form>
    </div>
  );
};

export default SellToken;
