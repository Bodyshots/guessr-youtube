import '../../../app/globals.css'
import { IconType } from 'react-icons'
import React from 'react';

interface IconSideButtonProps {
    icon: IconType;
    label: string;
}

const SideBarItem: React.FC<IconSideButtonProps> = ({ icon: Icon, label}) => {
    return (
        <button className="sideBarLink">
            <div className="sideBarLinkContainer">
                <Icon className="sideBarLinkImg"/>
                <span className="sideBarLinkName">{label}</span>
            </div>
        </button>
    )
}

export default SideBarItem;