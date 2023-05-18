import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingById"
import EmptyState from "@/app/components/EmptyState"
import ClientOnly from "@/app/components/ClientOnly"
import InnerListing from "./InnerListing"
import getReservations from "@/app/actions/getReservation"


interface IParams{
    listingId?: string
}

const EachListing = async ({params}: {params: IParams}) =>{
    const listing = await getListingById(params)
  const reservations = await getReservations(params)
    const currentUser = await getCurrentUser()

    if(!listing){
        return(
          <ClientOnly>
            <EmptyState></EmptyState>
          </ClientOnly>
        )
     }

     return (

        <ClientOnly>
          <InnerListing reservations={reservations} listing={listing} currentUser={currentUser}/>
        </ClientOnly>
    
      )
}

export default EachListing