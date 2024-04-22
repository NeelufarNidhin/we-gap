import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import userModel from '../Interfaces/userModel';
import { useSelector } from 'react-redux';
import { RootState } from '../Storage/Redux/store';
import { useGetEmployersQuery } from '../API/employerApi';
import { useGetEmployeesQuery } from '../API/employeeApi';

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
            .withUrl("http://localhost:8000/chat", { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets })
            .configureLogging(signalR.LogLevel.Information)
            .build();

        newConnection.start()
            .then(() => {
                setConnection(newConnection);
            });

            newConnection.on('ReceiveMessage', (sender: string, receivedMessage: string, at: string) => {
                setMessages((prevMessages: any) => [...prevMessages, { sender, message: receivedMessage, timestamp: at }]);
                setNotifications((prevNotifications: Notification[]) => [...prevNotifications, { type: 'New Message', message: `You received a new message from ${sender}` }]);
            });
        
            newConnection.on('ReceiveNotification', (type: string, message: string) => {
                setNotifications((prevNotifications: Notification[]) => [...prevNotifications, { type, message }]);
            });
        
            return () => {
                newConnection.stop();
            };
        
       
    }, [userData]);

    const formatDateTime = (timestamp: string) => {
        const dateTime = new Date(timestamp);
        return dateTime.toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const [message, setMessage] = useState('');

    const sendMessage = (sender: string, message: string) => {
        if (connection) {
            connection.invoke('SendMessage', sender, receiver, message)
                .catch(err => console.error(err));
        }

        setMessage('');
    }

    const handleEmployeeClick = async (employeeName: string) => {
        setReceiver(employeeName);
        try {
            const response = await fetch(`http://localhost:8000/api/message/${userData.firstName}/${employeeName}`);
            const data = await response.json();
            setMessages(data);
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
