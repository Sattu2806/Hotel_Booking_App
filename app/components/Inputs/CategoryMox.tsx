'use client'

import { IconType } from "react-icons"

interface CategoryBoxProps {
    icon:IconType;
    label: string;
    selected?: boolean;
    onClick: (value: string) => void
}

const CategoryBox:React.FC<CategoryBoxProps> = ({icon:Icon, label, selected, onClick}) => {
  return (
    <div onClick={()=> onClick(label)} className={`rounded-xl p-5 flex gap-3 hover:text-blue-500 hover:border-black border-2 transition cursor-pointer
     ${selected ? "border-black text-blue-500":"border-neutral-200"}
     
     `}>
        <Icon size={30} />
        <div className='font-semibold'>
        {label}
        </div>
    </div>
  )
}

export default CategoryBox