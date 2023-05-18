"use client";
import { SafeUser } from "@/app/types";
import Container from "../Container";
import LeftContainer from "./LeftContainer";
import Logo from "./Logo";
import Menu from "./Menu";
import RightContainer from "./RightContainer";
import Users from "./Users";
import {TbSettings2} from "react-icons/tb"
import useCategoryModal from "@/app/hooks/useCategoryModal";
import { useRouter } from "next/navigation";


interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Header: React.FC<NavbarProps> = ({currentUser}) => {
  const categoryModal = useCategoryModal()
  const router = useRouter()
  console.log({currentUser})
  return (
    <div className="fixed w-full z-10 bg-white">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <LeftContainer>
              <div className="flex flex-row items-center justify-between gap-9">
                <Logo />
                <span className="hidden sm:block text-[16px] before:border-r-[1.5px]  before:border-slate-300"></span>
                <div className='hidden sm:block'>
                <div className='flex flex-row items-center md:space-x-9 space-x-6'>
                  <Menu onClick={categoryModal.onOpen} label="Categories"/>
                  <Menu onClick={() => router.push('/trips')} label="My Trips"/>
                  {/* <Menu onClick={() => router.push('/addyourplace')} label="Add Your Home" /> */}
                </div>
                </div>
              </div>
            </LeftContainer>
            <RightContainer>
              <div className="flex flex-row items-center justify-between md:gap-9 gap-5">
                <div className="flex flex-row items-center justify-between gap-8">
                  {/* <div className="cursor-pointer text-xl text-gray-700">
                    <TbSettings2 />
                  </div>
                  <div
                    className="cursor-pointer text-xl text-gray-700"
                  >
                    <svg
                      className="w-[20px]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      id="filter"
                    >
                      <path
                        d="M4 10h7.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2H22.91A6 6 0 0 0 11.09 8H4a1 1 0 0 0 0 2zM17 5a4 4 0 1 1-4 4A4 4 0 0 1 17 5zM44 23H36.91a6 6 0 0 0-11.82 0H4a1 1 0 0 0 0 2H25.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2zM31 28a4 4 0 1 1 4-4A4 4 0 0 1 31 28zM44 38H22.91a6 6 0 0 0-11.82 0H4a1 1 0 0 0 0 2h7.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2zM17 43a4 4 0 1 1 4-4A4 4 0 0 1 17 43z"
                        data-name="Layer 15"
                      ></path>
                    </svg>
                  </div> */}
                </div>
                <span className="text-[16px] before:border-r-[1.5px]  before:border-slate-300"></span>
                <Users currentUser = {currentUser}/>
              </div>
            </RightContainer>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Header;
