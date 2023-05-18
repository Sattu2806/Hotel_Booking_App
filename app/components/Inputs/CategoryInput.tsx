'use client'

import { IconType } from "react-icons"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import qs from "query-string"
import useCategoryModal from "@/app/hooks/useCategoryModal"

interface CategoryInputProps {
    icon: IconType;
    label: string;
    selected?: boolean
}

const CategoryInput: React.FC<CategoryInputProps> = ({icon:Icon, label, selected}) => {
    const params = useSearchParams();
    const router = useRouter();
    const categoryModal = useCategoryModal();

    const handleClick = useCallback(()=>{
        let currentQuery = {};

        if(params){
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        if(params?.get('category') === label){
            delete updatedQuery.category;
        }
        const url = qs.stringifyUrl({
            url:'/',
            query:updatedQuery
        },{skipNull:true})

        router.push(url);

        categoryModal.onClose();
    },[])
    return(
        <div onClick={handleClick} className={`rounded-xl p-4 flex flex-col gap-3 hover:text-blue-500 hover:border-black border-2 transition cursor-pointer
     `}>
        <Icon size={24} />
        <div className='font-semibold'>
        {label}
        </div>
    </div>
    )
}

export default CategoryInput