if [ $1 == algolia ];
then
  echo “deploying algolia triggers”
  firebase deploy --only functions:onListingCreateAlgolia,functions:onStayCreateAlgolia,functions:onListingUpdateAlgolia,functions:onStayUpdateAlgolia,functions:onCircuitAddAlgolia,functions:onCircuitUpdateAlgolia,functions:onCollectionAddAlgolia,functions:onCollectionUpdateAlgolia,functions:onCollectionDeleteAlgolia,functions:onTripAddAlgolia,functions:onTripUpdateAlgolia,functions:onTripDeleteAlgolia,functions:onListingDeleteAlgolia,functions:onStayDeleteAlgolia
elif [ $1 == scrapping ]
then
  echo “deploying scrapping triggers”
  firebase deploy --only functions:createScrapperInput,functions:seedHotelScrappedInformation,functions:createHotelScrapperObjs,functions:createHotelScrapperInput
elif [ $1 == user ]
then
  echo “deploying user triggers”
  firebase deploy --only functions:onInfluencerCreationRequest,functions:onInfluencerCreationSuccess,functions:onUserCreate,functions:onUserUpdate
elif [ $1 == visitors ]
then
  echo “deploying visitors triggers”
  firebase deploy --only functions:onVisitorCreate,functions:onViewCreate
elif [ $1 == listingUpdate ]
then
  echo “deploying listingUpdate triggers”
  firebase deploy --only functions:onListingUpdate,functions:onStayUpdate,functions:onListingCreate,functions:onStayCreate
elif [ $1 == googlePlaces ]
then
  echo “deploying “googlePlaces“ triggers”
  firebase deploy --only functions:onGooglePlaceCreate,functions:onTripGooglePlaceCreate
elif [ $1 == collections ]
then
  echo “deploying “collections“ triggers”
  firebase deploy --only functions:onCollectionCreate,functions:createCollectionLink,functions:onCollectionListingCreate,functions:onCollectionListingDelete,functions:onCollectionDelete,functions:onCollectionUpdate,functions:ugcToCollection,functions:duplicateCollection,functions:onCollectionLikeCreate,functions:onCollectionLikeDelete
elif [ $1 == thumbnail ]
then
  echo “deploying “thumbnail“ triggers”
  firebase deploy --only functions:addListingThumbnail,functions:onListingDetailCoverCreate,functions:onStayCoverCreate,functions:onListingDetailCoverUpdate,functions:onStayCoverUpdate
elif [ $1 == misc ]
then
  echo “deploying “misc“ triggers”
  firebase deploy --only functions:addListingLink,functions:onDiscoveryUpdate,functions:onDiscoveryCreate,functions:onReferrerUpdate,functions:addInviteURLToUser,functions:onBookingCreate,functions:onBookingUpdate,functions:onNewUserAuth,functions:onListingViewCreate,functions:onBookingValueUpdate,functions:onErrorMessageCreate
elif [ $1 == httpsAlgolia ]
then
  echo “deploying “httpsAlgolia“ triggers”
  firebase deploy --only functions:moveListingToAlgolia,functions:moveStaysToAlgolia,functions:moveListingsToAlgolia,functions:moveCircuitsToAlgolia,functions:moveCollectionToAlgolia,functions:moveCollectionsToAlgolia
elif [ $1 == cloudinary ]
then
  echo “deploying “cloudinary“ triggers”
  firebase deploy --only functions:generateCloudinarySignature,functions:onCollectionMediaCreate,functions:onCollectionMediaUpdate,functions:onTripMediaCreate,functions:onTripMediaUpdate,functions:cloudinaryNotification,functions:cloudinaryTripNotification
elif [ $1 == trips ]
then
  echo “deploying “trips“ triggers”
  firebase deploy --only functions:onTripCreate,functions:onTripUpdate,functions:onTripDelete,functions:onTripLikeCreate,functions:onTripLikeDelete,functions:onTripViewCreate,functions:createTripLink
elif [ $1 == legacy ]
then
  echo “deploying “legacy“ triggers”
  firebase deploy --only functions:onListingVariantWrite,functions:onStayVariantWrite,functions:onListingVariantOptionWrite,functions:onStayVariantOptionWrite,functions:onStayVariantDelete,functions:onListingVariantDelete,functions:onStayVariantOptionDelete,functions:onListingVariantOptionDelete
elif [ $1 == leads ]
then 
  echo “deploying “leads“ triggers”
  firebase deploy --only functions:onLeadWrite,functions:cronViewsLeadsEarning,functions:onEarningUpdate
elif [ $1 == message ]
then
  echo “deploying message triggers”
  firebase deploy --only functions:onMessageCreate
elif [ $1 == messagebird ]
then
  echo “deploying messagebird triggers”
  firebase deploy --only functions:newMessage,functions:newConversation,functions:onGhostMessageReply,functions:reportURL,functions:cronExpiryMessage
elif [ $1 == socialboat ]
then
  echo “deploying socialboat triggers”
  firebase deploy --only functions:onSbEventUpdate,functions:onPaymentCreate,functions:onFreeUserSignUp,functions:addHocWhatsapp,functions:emailScheduler,functions:onNewClapper,functions:whatsappMessage
else if [ $1 == socialboatCron ]
then 
  echo “deploying socialboat cron triggers”
  firebase deploy --only functions:reminderCron,functions:morningCron,functions:eveningCron,functions:streakCron,functions:prizeCron,functions:onReplyDefree2,functions:onActivityCreate,functions:onActivityUpdate,functions:onPostReply,functions:urgentReminderCron
else if [ $1 == socialboatStream ]
then 
  echo “deploying streaming triggers”
  firebase deploy --only functions:onWorkoutActivityCreate,functions:onWorkoutActivityUpdate,functions:onLiveWorkoutUpdate,functions:onLiveWorkoutCreate,functions:handleEventEnd
else if [ $1 == terra ]
then
  echo “deploying terra triggers”
  firebase deploy --only functions:terraCentral,functions:activityCron,functions:pastActivityCron,functions:reconcileTerraUser,functions:reconcileTerraDayUser,functions:reconcileUserKPIs
else
  echo $1
  echo “Run functionDeploy batch to list available batches.”
fi

echo "exit"
exit 0