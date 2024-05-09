import { ethers } from "ethers";
import { useRef } from "react";
import { toast } from "react-hot-toast";
const BuyToken = ({ contractInstance }) => {
  const tokenAmountRef = useRef();
  const buyToken = async (e) => {
    try {
      e.preventDefault();
      const numberOfTokens = tokenAmountRef.current.value;
      const numberOfTokens18Decimals = ethers.parseUnits(numberOfTokens, 18);
      const tokenPriceWei = await contractInstance.tokenPrice();
      const totalPriceOfTokens = tokenPriceWei * BigInt(numberOfTokens);
      const tx = await contractInstance.buyGLDToken(numberOfTokens18Decimals, {
        value: totalPriceOfTokens,
      });
      const reciept = await tx.wait();
      toast.success("Transaction Successful");
    } catch (error) {
      console.error(error.message);
      toast.error("Contract Instance Not Ready");
    }
  };
  return (
    <div className=" bg-secNav bg-opacity-10 p-6 rounded-xl">
      <form
        onSubmit={buyToken}
        className=" formContainer  max-w-[420px]  lg:min-w-[420px] "
      >
        <div className="formInputWrapper">
          <label className="formInputLabel">Token Amount To Buy</label>
          <input
            type="text"
            ref={tokenAmountRef}
            placeholder="Number of tokens to buy"
            className="formInput"
          ></input>
        </div>

        <button
          type="submit"
          className="formSubmitBtn w-full max-w-[420px] mt-10 lg:mt-4"
        >
          Buy Token
        </button>
      </form>
    </div>
  );
};

export default BuyToken;
