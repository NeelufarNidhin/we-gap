import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { useSelector } from 'react-redux';
import userModel from '../Interfaces/userModel';
import { RootState } from '../Storage/Redux/store';
import { useGetEmployeesQuery } from '../API/employeeApi';
import { useGetEmployersQuery } from '../API/employerApi';
const VideoChat = () => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [caller, setCaller] = useState(null);
    const [incomingCall, setIncomingCall] = useState(false);

    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const userData: userModel = useSelector(
        (state: RootState) => state.userAuthStore
    );
    const [users, setUsers] = useState([]);
    const [receiver, setReceiver] = useState("");
    const { data, isLoading, isSuccess } = useGetEmployeesQuery({});
    const { data: EmployersList, isLoading: EmployerIsLoading, isSuccess: EmployersIsSuccess, error } = useGetEmployersQuery({});

    useEffect(() => {
        if (userData.role === "employer") {
            if (!isLoading && isSuccess && data) {
                setUsers(data.result);
                console.log(data.result)
            }
        } else if (userData.role === "employee") {
            if (!EmployerIsLoading && EmployersIsSuccess && EmployersList) {
                setUsers(EmployersList)
                console.log(EmployersList)
            }
        }

    }, [isLoading, isSuccess, data]);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${process.env.REACT_APP_API_URL}/chat`, { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets })
            .configureLogging(signalR.LogLevel.Information)
            .withAutomaticReconnect()
            .build();


        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => console.log("Connection established"))
                .catch(err => console.error("Error establishing connection:", err));

            connection.on("IncomingVideoCall", callerId => {
                setReceiver(callerId);
                setIncomingCall(true);
            });

            connection.on("VideoCallAccepted", () => {
                // Logic to start streaming video
                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                    .then((stream:any) => {
                        setLocalStream(stream);
                        // Logic to establish peer-to-peer connection and start streaming
                    })
                    .catch(err => console.error("Error accessing media devices:", err));
            });

            connection.on("VideoCallRejected", () => {
                // Logic to handle call rejection
                setIncomingCall(false);
                setCaller(null);
            });
        }
    }, [connection]);

    const acceptCall = () => {
        if (connection) {
            // Logic to accept the incoming call
            setIncomingCall(false);
            // Notify the server to accept the call
            connection.invoke("AcceptVideoCall", caller)
                .catch(error => console.error("Error accepting call:", error));
        }
    };

    const rejectCall = () => {
        if (connection) {
        // Logic to reject the incoming call
        setIncomingCall(false);
        // Notify the server to reject the call
        connection.invoke("RejectVideoCall", caller)
        .catch(error => console.error("Error accepting call:", error));

        }
    };

    const handleEmployeeClick = async (employeeName: string) => {
      
        setReceiver(employeeName);
        if (connection) {
            // Logic to initiate the video call to the selected user
            connection.invoke("StartVideoCall", userData.firstName, employeeName)
                .catch(error => console.error("Error initiating video call:", error));
        }
       
    };

    return (
        <div>
<div className="w-1/3 bg-gray-100">
                <h2 className="p-4 text-lg font-semibold">Users:</h2>
                <ul>
                    {users && users.map((user: any) => (
                         <li key={user.id} className="p-4 cursor-pointer hover:bg-gray-200">
                         {user.applicationUser.firstName}
                         <button onClick={() => handleEmployeeClick(user.applicationUser.firstName)}>Call</button>
                     </li>
                    ))}
                </ul>
            </div>
<div>
            {incomingCall && (
                <div>
                    <p>Incoming call from {receiver}</p>
                    <button onClick={acceptCall}>Accept</button>
                    <button onClick={rejectCall}>Reject</button>
                </div>
            )}
            {localStream && (
                <div>
                    <p>Your Video</p>
                    <video autoPlay muted ref={video => video && (video.srcObject = localStream)}></video>
                </div>
            )}
            {remoteStream && (
                <div>
                    <p>Remote Video</p>
                    <video autoPlay ref={video => video && (video.srcObject = remoteStream)}></video>
                </div>
            )}
        </div>
        </div>
    );
};

export default VideoChat;
