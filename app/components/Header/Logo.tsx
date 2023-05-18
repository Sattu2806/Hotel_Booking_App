'use client'
import { useRouter } from "next/navigation"
import {AiFillHome} from "react-icons/ai"
const Logo = () => {
    const router = useRouter()

    return(
        <div onClick={() => router.push('/')} className='cursor-pointer flex flex-row text-2xl md:space-x-3 space-x-2 items-center'>
        <AiFillHome className='text-blue-500' />
        <h1  className='text-xl font-bold mt-[3px] text-neutral-700'>Homex</h1>
        </div>
    )
}
export default Logo