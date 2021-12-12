import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import groupImage from '../assets/group.jpg'

//Displays all inside values of channels and  direct mssgs like #grups-name and direct mssg users list avatar, name of indivial.
const TeamChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => {
    const { channel: activeChannel, client } = useChatContext();

    const ChannelPreview = () => (
        <div className="channel-preview__item">
             <Avatar 
                    image={groupImage}
                    name={"#"}
                    size={24}
                />
            <p>{channel?.data?.name || channel?.data?.id}</p>
        </div>
    );


    const DirectPreview = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    
        console.log("members[0]",members[0]);

        return (
            <div className="channel-preview__item single">
                <Avatar 
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName || members[0]?.user?.id}
                    size={24}
                />
                <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
            </div>
        )
    }

    return (
        <div className={
            channel?.id === activeChannel?.id
                ? 'channel-preview__wrapper__selected'
                : 'channel-preview__wrapper'
        }
        onClick={() => {
            setIsCreating(false);
            setIsEditing(false);
            setActiveChannel(channel); // switch to selected channel
            if(setToggleContainer) {
                setToggleContainer((prevState) => !prevState)
            }
        }}
        >
            {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
        </div>
    );
}

export default TeamChannelPreview