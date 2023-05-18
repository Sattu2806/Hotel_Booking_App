'use client'
import { Listing, Reservation} from "@prisma/client";
import { SafeUser } from "@/app/types";
import { useRouter } from 'next/navigation'
import useCountries from "@/app/hooks/useCountries";
import { useCallback, useMemo } from "react";
import {format} from "date-fns"
import Image from 'next/image';
import Button from "../Button";
import { SafeListing, SafeReservation } from "@/app/types";


interface HomeCardProps{
    data: SafeListing
    reservation?: SafeReservation
    onAction?: (id: string) => void
    disabled?: boolean
    actionLabel?: string
    actionId?: string
    currentUser?: SafeUser | null
}

const HomeCard:React.FC<HomeCardProps> = ({data, reservation, onAction, disabled, actionLabel, actionId = "", currentUser}) =>{
    const router = useRouter();
    const {getByValue} = useCountries();
    const location = getByValue(data.locationValue)

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) =>{
        e.stopPropagation();

        if(disabled){
            return
        }

        onAction?.(actionId);
    }, [onAction,actionId,disabled])

    const price = useMemo(() =>{
        if(reservation){
            return reservation.totalPrice
        }
        return data.price
    }, [reservation, data.price])

    const reservationDate = useMemo(() =>{
        if(!reservation){
            return null
        }

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    },[reservation])

    return (
        <div onClick={() => router.push(`/listings/${data.id}`)} className='col-span-1 cursor-pointer group shadow-md rounded-lg' >
            <div className='p-3'>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='aspect-square w-full relative overflow-hidden rounded-md'>
                        <Image fill alt="Listing" src={data.imageSrc} className="object-cover h-full w-full group-hover:scale-105 transition"/>
                    </div>
                    <div className=''>
                        <div>
                            <h1 className='text-neutral-800 font-semibold'>{location?.region}, {location?.label}</h1>
                            <h1 className='font-light text-neutral-500'>{reservationDate  || data.category}</h1>
                        </div>
                        <div>
                            <div className='font-semibold pt-1'>
                                $ {price} 
                                {!reservation && (
                                <span className='text-neutral-500'> night</span>
                                )}
                            </div>
                            
                        </div>
                    </div>
                    {onAction && actionLabel && (
                        <Button
                         disabled={disabled}
                         small
                         label={actionLabel}
                         onClick={handleCancel}
                        />
                    )}
                </div>
            </div>
        </div>
      )

}

export default HomeCard