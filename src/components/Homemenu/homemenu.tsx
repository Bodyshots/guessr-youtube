"use client";

import './homemenu.css'
import '../../app/globals.css';
import { UserRound, Play, ThumbsUp, Folder } from "lucide-react"
import IconButton from './HomemenuItem/homemenuitem';
import { GameModeConstants } from '@/constants/gamemode';

const HomeMenu = () => {
    return (
    <div className="home_card_container font-yt_font bg-background">
        <IconButton icon={UserRound} 
                    btn_label={GameModeConstants.VIEWERS} 
                    tooltip_desc={<span>A random YouTube video will be shown and you will have to guess how many <b>viewers</b> it has.
                        The closer you are to the target view count the more points you&apos;ll earn.</span>}
                    modal_title={GameModeConstants.SETTINGS}
                    modePresent={true}
                    />
        <IconButton icon={Play} 
                    btn_label={GameModeConstants.SUBS} 
                    tooltip_desc={<span>A random YouTube video will be shown and you will have to guess how many <b>subscribers</b> the <b>YouTube channel</b> has.
                          The closer you are to the target <b>subscriber</b> count the more points you&apos;ll earn.</span>}
                    modal_title={GameModeConstants.SETTINGS}
                    modePresent={true}
                    />
        <IconButton icon={ThumbsUp} 
                    btn_label={GameModeConstants.LIKES} 
                    tooltip_desc={<span>A random YouTube video will be shown and you will have to guess how many <b>subscribers</b> the <b>YouTube channel</b> has.
                          The closer you are to the target <b>subscriber</b> count the more points you&apos;ll earn.</span>}
                    modal_title={GameModeConstants.SETTINGS}
                    modePresent={true}
                    />
        <IconButton icon={Folder} 
                    btn_label={GameModeConstants.GENRE} 
                    tooltip_desc={<span>A random YouTube video will be shown and you will have to guess what <b>genre</b> the YouTube <b>video</b> is under.</span>}
                    modal_title={GameModeConstants.SETTINGS}
                    modePresent={true}
                    />
    </div>
    )
}

export default HomeMenu;