createTrip:
Inputs: 
    tripId: string, 
    userId: string, 
    circuit: string, 
    timeStart?: datetime, 
    timeEnd?: datetime, 
    hotel?: string
    startLat?: number, 
    startLng?: number, 
    pax?: number, 
    tags?: string[],
    needCircuit: bool


getRecommendations
Inputs: 
    tripId: string,
    tripObj: {},
    needCircuit: bool,

    // trip has information needed 
    trip <- getCurrentTrip()
    circuit <- getCircuit(circuit)
    circuitTasks <- getCircuitPacket(circuit)
    
    // get all default
    if !present(startLat && startLng)
        take cityCenter
    if !(present(timeStart, timeEnd)) 
        take standardDay
    if !present(pax)
        take 1
    
    
    
    // get all feasibleTasks
    feasibleTasks, ambitiousTasks <- getFeasibleTasks(tasks, trip)
    
    rankedFeasible <- sortTasks(feasibleTasks)
    rankedAmbitious <- sortTasks(ambitiousTasks)
    
    return {rankedFeasible, rankedAmbitious}
    
    sortTasks(tasks, config, tags, userTaskMatrix){
        diversityFactor (heurestic) 
        popularityFactor (rating & reviews) 
        tagScore (currentTagVector to existingTagVectors) 
        similarUserScore 
        }
    
    
    circuit : {
        listingId: {
            listingId: string,
            listingName: string,
            rating: number,
            num_reviews: number,
            coverImage: string,
            mainTip: string,
            type: string,
            hyperLocation: string,
            dailyVisitors?: number,
            blogMentions?: number,
            shortlistedBy?: number,
            pricePaxVariants: variant[{pax: 1, tat: 30, price: 250},],
            operatingHours: operatingHours[]
        },
    }
    
    recommendations : [listingIds], ambitiousTasks: [listingIds]

    // recommendations for added task
    // routingAPI
    // reroute and return status




lobVariants : {
    lobId
    tat
    avgPrice
}


Shopping

Food&Drink

SightSeeing

Nature&Outdoors - Scuba, SkyDiving, Hiking







createTripObj -> With startingPoint 
getOperatingWindows -> Non overlappingPeriods
forEachWindow -> getAllFeasibleTasks() add them to the recommendationsResponse, updateTheDistance//travelTimeFromTop

recommendationResponse 
task {
    feasibleFromTop: boolean,
    distanceFromTop: boolean,
    timeFromTop: boolean,
    feasible: boolean,
    listingId: string,
    feasibleOperatingWindows: string[],
}

tripElement
task {
    listingId: string,
    variantId: string,
    pax: number,
    startTime: date,
    endTime: date,
    booked: boolean
}

 