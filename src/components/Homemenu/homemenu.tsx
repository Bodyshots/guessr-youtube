"use client";

import './homemenu.css'
import '../../app/globals.css';
import { UserRound, Calendar, ThumbsUp, Folder, Grid3X3 } from "lucide-react"
import IconButton from './HomemenuItem/homemenuitem';
import { GameModeConstants } from '@/constants/gamemode';

const HomeMenu = () => {
    return (
    <div className="home_card_container font-yt_font">
        {/* Replace w/ redirect to bingo path */}
        <IconButton icon={Grid3X3} 
            btn_label={GameModeConstants.BINGO} 
            tooltip_desc={<span>See if you&apos;ll score bingo throughout a series of YouTube videos!</span>}
            modal_title={GameModeConstants.SETTINGS}
            modePresent={true}
            redirect_path='/bingo'
            />
        <IconButton icon={UserRound} 
                    btn_label={GameModeConstants.VIEWERS} 
                    tooltip_desc={<span>A random YouTube video will be shown and you will have to guess how many <b>viewers</b> it has.
                        The closer you are to the target view count the more points you&apos;ll earn.</span>}
                    modal_title={GameModeConstants.SETTINGS}
                    modePresent={true}
                    />
        <IconButton icon={Calendar} 
                    btn_label={GameModeConstants.UPLOAD} 
                    tooltip_desc={<span>A random YouTube video will be shown and you will have to guess <b>when</b> the video was <b>publicly uploaded</b>.
                          The closer you are to the actual upload date, the more points you&apos;ll earn.</span>}
                    modal_title={GameModeConstants.SETTINGS}
                    modePresent={true}
                    />
        <IconButton icon={ThumbsUp} 
                    btn_label={GameModeConstants.LIKES} 
                    tooltip_desc={<span>A random YouTube video will be shown and you will have to guess how many <b>likes</b> it has.
                          The closer you are to the target <b>like</b> count the more points you&apos;ll earn.</span>}
                    modal_title={GameModeConstants.SETTINGS}
                    modePresent={true}
                    />
        <IconButton icon={Folder} 
                    btn_label={GameModeConstants.GENRE} 
                    tooltip_desc={<span>A random YouTube video will be shown and you will have to guess what <b>genre</b> the YouTube video is under.</span>}
                    modal_title={GameModeConstants.SETTINGS}
                    modePresent={true}
                    />
    </div>
    )
}

export default HomeMenu;