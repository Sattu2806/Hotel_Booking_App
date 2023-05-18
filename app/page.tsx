import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyState from './components/EmptyState'
import getListings from './actions/getListings'
import getCurrentUser from './actions/getCurrentUser'
import HomeCard from './components/listings/HomeCard'

export default async function Home() {
  const listings = await getListings()
  const currentUser = await getCurrentUser();

  if(listings.length === 0){
    return(
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
      <div className="pt-16">
        
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {listings.map((listing) =>{
                  return(
                      <HomeCard currentUser={currentUser} key={listing.id} data={listing}/>
                  )
            })}
      </div>
      </Container>
    </ClientOnly>
  )
}
