'use client'
import React, {useState, useCallback} from 'react'
import axios from 'axios'
import {FcGoogle} from "react-icons/fc"
import { toast } from 'react-hot-toast'
import {signIn} from "next-auth/react"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRegisterModal from '../../hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../Inputs/Input'
import Button from '../Button'
import useLoginModal from '@/app/hooks/useLoginModal'
import { useRouter } from 'next/navigation'
const LoginModal = () =>{
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {
            errors = {},
        } = {},
    } = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    });

    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) =>{
            setIsLoading(false)

            if(callback?.ok){
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose()
            }
            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }


    const onToggle = useCallback(() => {
        registerModal.onOpen();
        loginModal.onClose();
      }, [registerModal, loginModal])

    
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title="Welcome Back" subtitle="Login to your account"/>
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
            {/* <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required/> */}
            <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required/>
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            {/* <Button 
                outline
                label="Continue with Apple"
                icon={AiFillApple}
                onClick={() => {}}
            /> */}
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row items-center gap-2 justify-center'>
                    <div>
                        Don&apos;t have an Account?
                    </div>
                    <div className='text-neutral-800 cursor-pointer hover:underline'onClick={onToggle} >
                        Sign up
                    </div>
                </div>
            </div>
        </div>
    )
    return(
        <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
    )
}

export default LoginModal