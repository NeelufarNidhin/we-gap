import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { useParams } from 'react-router-dom'
import userModel from '../Interfaces/userModel'
import { useSelector } from 'react-redux'
import { RootState } from '../Storage/Redux/store'

const VideoPage = () => {
const {roomId} = useParams()
const userData: userModel = useSelector(
  (state: RootState) => state.userAuthStore
  );
const myMeeting  = async (element:any) => {
  const appID = 2146008869;
  const serverSecret = process.env.REACT_APP_ZEGO_SECRET ;
  console.log(serverSecret)
  
  if (roomId !== undefined && serverSecret !== undefined) {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId,Date.now().toString(), userData.firstName);
    const zp = ZegoUIKitPrebuilt.create(kitToken);



  zp.joinRoom({
    container:element,
    scenario:{
      mode: ZegoUIKitPrebuilt.VideoConference
    }
  
  })
}
}

  return (
    <div>
     <div ref= {myMeeting}/>
    </div>
  )
}

export default VideoPage
