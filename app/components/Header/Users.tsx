'use client'
import { useRouter } from 'next/navigation'
import {useState, useCallback} from 'react'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import useRegisterModal from '../../hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'

interface UsersProps {
  currentUser?: SafeUser | null
}

const Users: React.FC<UsersProps> = ({currentUser}) =>{
    const [isOpen, setisOpen] = useState(false)
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()
    const router = useRouter();

    const toggleOpen = useCallback(()=>{
        setisOpen((value) => !value);
    }, [])
    return (
        <div className='bg-slate-100 hover:bg-slate-200 rounded-full'>
        <div className='md:p-[5px] p-[4px] cursor-pointer' onClick={toggleOpen}>
        <Avatar src={currentUser?.image} />
        </div>
        { isOpen && (
          <div className='absolute rounded-md shadow-md w-[40vw] md:w-44 bg-white overflow-hidden right-5 top-15 text-sm'>
            <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
                <>
                <MenuItem 
                  onClick= {() => router.push(`/`)}
                  label="Home"
                />
                <MenuItem 
                  onClick={()=> {router.push('/trips')
                   setisOpen(!isOpen)}}
                  label="My trips"
                />
                {/* <MenuItem 
                  onClick={()=>{}}
                  label="My favourites"
                /> */}
                {/* <MenuItem 
                  onClick={()=>router.push('/properties')}
                  label="My Properties"
                /> */}
                <MenuItem 
                  onClick= {() => router.push(`/addyourplace`)}
                  label="Add Your Home"
                />
                
                <MenuItem 
                  onClick={()=>signOut()}
                  label="Logout"
                />
              </>
              ):(
                <>
                <MenuItem 
                  onClick={loginModal.onOpen}
                  label="Login"
                />
                <MenuItem 
                  onClick={registerModal.onOpen}
                  label="Sign Up"
                />
              </>
              )}
            </div>
          </div>
        )}
    </div>
    )
}

export default Users