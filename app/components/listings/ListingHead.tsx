'use client'
import useCountries from "@/app/hooks/useCountries"
import Heading from "../Heading"
import Image from "next/image"
import { SafeUser } from "@/app/types"

interface ListingHeadProps {
    title: string
    locationValue: string
    imageSrc: string
    id: string
    currentUser?: SafeUser | null
}

const ListingHead:React.FC<ListingHeadProps> = ({title, locationValue, imageSrc, id, currentUser}) => {
    const {getByValue} = useCountries()
    const location = getByValue(locationValue)
  return (
    <div>
        <Heading title={title} subtitle={`${location?.region}, ${location?.label}`}/>
        <div className='w-full h-[60vh] overflow-hidden rounded-xl relative mt-10'>
            <Image alt='Image' src={imageSrc} fill className='object-cover w-full' />
        </div>
    </div>
  )
}

export default ListingHead