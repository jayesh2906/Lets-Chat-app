import React from 'react';
import { Channel, MessageTeam } from 'stream-chat-react'; // Pre-built components of stream-chat-react for Chat Ui

import { ChannelInner, CreateChannel, EditChannel } from './';

//ChannelContainer displays right part of UI i.e chat UI
const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
    if(isCreating) {  // creating a new channel
        return (
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }

    if(isEditing) { // editing an existing channel
        return (
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing} />
            </div> 
        )
    }

    //Message appears for newly created chat 
    const EmptyState = () => (
        <div className="channel-empty__container">
            <p className="channel-empty__first">This is the beginning of your chat history.</p>
            <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
        </div>
    )

    return (
        <div className=" channel__container">
            <Channel  
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />} // pre-built component, Ui of messages in proper way 
            >
                <ChannelInner setIsEditing={setIsEditing} /> {/* Ui for chat window */}
            </Channel>
        </div>
    );
}

export default ChannelContainer;