import { Link } from "react-router-dom";
import { useWeb3Context } from "../../context/useWeb3Context";
import {
  CircleChevronLeft,
  CircleChevronRight,
  CircleUser,
} from "lucide-react";
import { useState } from "react";
import vote from "../../assets/vote.svg";

const NavigationBar = () => {
  const { web3State } = useWeb3Context();
  const { electionCommissionStatus, selectedAccount } = web3State;
  const [isSideOpen, setIsSideOpen] = useState(false);
  const toggleNavbar = () => {
    console.log("clicked");
    setIsSideOpen(!isSideOpen);
  };

  return (
    <header className="w-screen h-[84px] bg-navBg text-white sticky top-0 z-[20] mx-auto px-6 text-[14px]">
      <nav className="w-full h-full flex  justify-between items-center ">
        <Link to="/">
          <img src={vote} alt="vote.svg" />
        </Link>

        <ul className="hidden lg:block flex flex-col justify-center items-center lg:flex lg:flex-row lg:gap-12 lg:w-full   hoverEffect font-semibold opacity-85">
          <li>
            <Link to="/candidate-registration">Candidate Registration</Link>
          </li>
          <li>
            <Link to="/candidate-list">Candidate List</Link>
          </li>
          <li>
            <Link to="/voter-registration">Voter Registration</Link>
          </li>
          {electionCommissionStatus ? (
            <li>
              <Link to="/voter-list">Voter List</Link>
            </li>
          ) : null}
          {electionCommissionStatus ? (
            <li>
              <Link to="/election-commision">Election Commission</Link>
            </li>
          ) : null}
          <li>
            <Link to="/token-exchange">Token Exchange</Link>
          </li>
        </ul>
        {isSideOpen ? (
          <>
            <ul className="absolute  lg:hidden h-screen top-[84px] right-0 pt-10 pl-4 flex flex-col justify-start items-start gap-6 w-[240px] md:w-[300px]  bg-gray-800 hoverEffect font-semibold ">
              <li>
                <Link to="/candidate-registration">Candidate Registration</Link>
              </li>
              <li>
                <Link to="/candidate-list">Candidate List</Link>
              </li>
              <li>
                <Link to="/voter-registration">Voter Registration</Link>
              </li>
              {electionCommissionStatus ? (
                <li>
                  <Link to="/voter-list">Voter List</Link>
                </li>
              ) : null}
              {electionCommissionStatus ? (
                <li>
                  <Link to="/election-commision">Election Commission</Link>
                </li>
              ) : null}
              <li>
                <Link to="/token-exchange">Token Exchange</Link>
              </li>
              <li>
                <Link to="/voter-profile">Voter Profile</Link>
              </li>
            </ul>
          </>
        ) : (
          <></>
        )}
        <Link to="/voter-profile" className="hidden lg:block">
          <CircleUser size={32} />
        </Link>

        <div className="lg:hidden">
          {isSideOpen ? (
            <CircleChevronRight size={32} onClick={toggleNavbar} />
          ) : (
            <CircleChevronLeft size={32} onClick={toggleNavbar} />
          )}
        </div>
      </nav>
    </header>
  );
};
export default NavigationBar;
