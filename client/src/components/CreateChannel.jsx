import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import { UserList } from './';
import { CloseCreateChannel } from '../assets';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {  // for team chat name input field and add members heading
    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="group-name" />
            <p>Add Members</p>
        </div>
    )
}

const CreateChannel = ({ createType, setIsCreating }) => {
    const { client, setActiveChannel } = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
    const [channelName, setChannelName] = useState('');

    const createChannel = async (e) => {
        // to create new channel
        e.preventDefault();

        try {
            const newChannel = await client.channel(createType, channelName, {
                name: channelName, members: selectedUsers
            });

            await newChannel.watch();

            // clean up after creating channel
            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.userID]);
            setActiveChannel(newChannel); // new channel will be active one
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{createType === 'team' ? 'Create a New Group' : 'Send a Direct Message'}</p>
                <CloseCreateChannel setIsCreating={setIsCreating} /> {/* close icon at right */}
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
            <UserList setSelectedUsers={setSelectedUsers} /> {/* to user list in middle */}
            <div className="create-channel__button-wrapper" onClick={createChannel}>
                <p>{createType === 'team' ? 'Create Group' : 'Create Message Group'}</p> {/* create button at bottom right */}
            </div>
        </div>
    )
}

export default CreateChannel