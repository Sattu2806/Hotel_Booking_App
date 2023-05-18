'use client'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import {IoMdClose} from "react-icons/io"
import Button from '../Button'
interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string | null;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string

}

const Modal: React.FC<ModalProps> = ({
    isOpen, 
    onClose, 
    onSubmit, 
    title, 
    body, 
    footer, 
    actionLabel, 
    disabled, 
    secondaryAction, 
    secondaryActionLabel
}) => {
    const [showModel, setShowModel] = useState(isOpen)

    useEffect(() =>{
        setShowModel(isOpen);
    },[isOpen])

    const handleClose = useCallback(() =>{
        if(disabled){
            return;
        }

        setShowModel(false);

        setTimeout(() =>{
            onClose();
        },300)
    }, [onClose, disabled])

    const handleSubmit = useCallback(() =>{
        if(disabled){
            return;
        }

        onSubmit();
    }, [disabled, onSubmit])

    const handleSecondaryAction = useCallback (()=>{
        if(disabled || !secondaryAction){
            return;
        }

        secondaryAction();
    }, [disabled, secondaryAction])

    if(!isOpen){
        return null;
    }


    return(
        <Fragment>
        <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none bg-neutral-800/60'>
            <div className='relative w-full md:w-4/6 lg:w-3/6 xl:2/5 my-6 mx-auto h-full lg:h-auto md:h-auto'>
                {/* CONTENT */}
                <div className={`translate duration-300 h-full ${showModel ? "translate-y-0" : "translate-y-full"} ${showModel ? "opacity-100" : "opacity-0"}`}>
                    <div className='translate h-full lg:h-auto md:h-auto border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                        {/* HEADER */}
                        <div className='flex items-center justify-center p-6 rounded-t relative border-b-[1px]'>
                            <button onClick={handleClose} className='p-1 border-0 hover:opacity-70 transition absolute left-9'>
                                <IoMdClose size={18}/>
                            </button>
                            <div className='text-lg font-semibold'>
                                {title}
                            </div>
                        </div>
                        {/* BODY */}
                        <div className='relative p-6 flex-auto'>
                            {body}
                        </div>
                        {/* FOOTER */}
                        {actionLabel && (
                            <div className='flex flex-col gap-2 p-6'>
                                <div className='flex flex-row items-center gap-4 w-full'>
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button outline disabled={disabled} label={secondaryActionLabel} onClick={handleSecondaryAction}/>
                                    )}
                                    <Button disabled={disabled} label={actionLabel} onClick={handleSubmit}/>
                                </div>
                                {footer}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    )
}
export default Modal