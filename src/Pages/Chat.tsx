import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import userModel from '../Interfaces/userModel';
import { useSelector } from 'react-redux';
import { RootState } from '../Storage/Redux/store';
import { useGetEmployersQuery } from '../API/employerApi';
import { useGetEmployeesQuery } from '../API/employeeApi';
import axios from 'axios';

interface ChatMessage {
    sender: string;
    message: string;
    timestamp: string;
}

interface Notification {
    type: string;
    message: string;
}

const Chat = () => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const userData: userModel = useSelector(
        (state: RootState) => state.userAuthStore
    );
    const auth = localStorage.getItem("token");
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

    }, [isLoading, isSuccess, data,EmployersList,EmployerIsLoading,EmployersIsSuccess]);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl( `${process.env.REACT_APP_API_URL}/chat`, { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets })
            .configureLogging(signalR.LogLevel.Information)
            .build();

        newConnection.start()
            .then(() => {
                setConnection(newConnection);
            });

            newConnection.on('ReceiveMessage', (sender: string, receivedMessage: string, at: string) => {
                setMessages((prevMessages: any) => [...prevMessages, { sender, message: receivedMessage, timestamp: new Date().toISOString() }]);
               // setNotifications((prevNotifications: Notification[]) => [...prevNotifications, { type: 'New Message', message: `You received a new message from ${sender}` }]);
            });
        
            newConnection.on('ReceiveNotification', (type: string, message: string) => {
                setNotifications((prevNotifications: Notification[]) => [...prevNotifications, { type, message }]);
            });
        
            return () => {
                newConnection.stop();
            };
        
       
    }, [userData]);

   const formatDateTime = (timestamp: string | undefined) => {
    if (!timestamp) {
        return ''; // Handle cases where timestamp is not available
    }
    const dateTime = new Date(timestamp);
    if (isNaN(dateTime.getTime())) {
        return "Invalid Date"; // Handle invalid dates
    }
    return dateTime.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

    const [message, setMessage] = useState('');

    const sendMessage = (sender: string, message: string) => {
        if (message.trim() === '') {
        // Do not send empty messages
        return;
    }
        if (connection) {
            connection.invoke('SendMessage', sender, receiver, message)
                .catch(err => console.error(err));
        }

        setMessage('');
    }

    const handleEmployeeClick = async (employeeName: string) => {
        setReceiver(employeeName);
        try {
            const token = localStorage.getItem("token");
            const headers: Record<string, string> = {};
            if (token) {
              headers["Authorization"] = `Bearer ${token}`;
            }
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/message/${userData.firstName}/${employeeName}`,
            {
                headers,
              }
            );
           // const data = await response.json();
            setMessages(response.data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching messages: ', error);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/3 bg-gray-100">
                <h2 className="p-4 text-lg font-semibold">Users:</h2>
                <ul>
                    {users && users.map((user: any) => (
                        <li key={user.id} onClick={() => handleEmployeeClick(user.applicationUser.firstName)} className="p-4 cursor-pointer hover:bg-gray-200">
                            {user.applicationUser.firstName}
                        </li>
                    ))}
                </ul>
            </div>

            {receiver && (
                <div className="w-2/3 bg-white">
                    <div className="flex justify-between items-center border-b p-4">
                        <h2 className="text-lg font-semibold">Chat with {receiver}</h2>
                    </div>
                    <div className="px-4 py-2 h-80 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className="mb-2">
                                <strong>{msg.sender}</strong>: {msg.message} <span className="text-gray-400 text-xs">{formatDateTime(msg.timestamp)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between border-t p-4">
                        <input type="text" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} required className="flex-1 p-2 border rounded-md focus:outline-none" />
                        <button onClick={() => sendMessage(userData.firstName, message)} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">Send</button>
                    </div>
                </div>
            )}

            <div className="w-1/3 bg-gray-100">
                <h2 className="p-4 text-lg font-semibold">Notifications:</h2>
                <ul>
                    {notifications.map((notification, index) => (
                        <li key={index} className="p-4 cursor-pointer hover:bg-gray-200">
                            <strong>{notification.type}: </strong>{notification.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Chat;
