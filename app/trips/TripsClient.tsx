'use client'
import Container from "../components/Container"
import React, { useCallback, useState } from 'react'
import Heading from '../components/Heading'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import HomeCard from "../components/listings/HomeCard"
import { SafeReservation, SafeUser } from "../types"

interface TripsClientProps{
    reservations: SafeReservation[]
    currentUser?: SafeUser | null
}

const TripsClient:React.FC<TripsClientProps> = ({reservations, currentUser}) => {
    const router = useRouter()
    const [deletingId, setDeletingid] = useState('')

    const onCancel = useCallback((id:string) =>{
        setDeletingid(id)

        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success('Reservations cancelled')
            router.refresh()
        })
        .catch((error) =>{
            toast.error(error?.response?.data?.error)
        })
        .finally(()=>{
            setDeletingid('')
        })
    }, [router])

    return (
        <Container>
            <div className='pt-6 mt-10'>
                <Heading 
                title="Trips"
                subtitle="Where you have been and where you are going"
                />
                <div className='mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8'>
                    {reservations.map((reservation) =>(
                        <HomeCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="cancel reservation"
                        
                        />
                    ))}
                </div>
            </div>
        </Container>
      )
}
export default TripsClient