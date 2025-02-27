"use client";

import './homemenu.css'
import '../../app/globals.css';
import { UserRound, Calendar, ThumbsUp, Folder, Grid3X3 } from "lucide-react"
import IconButton from './HomemenuItem/homemenuitem';
import { GameModeConstants } from '@/constants/gamemode';

const HomeMenu = () => {
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-yt_font ">
        {/* Replace w/ redirect to bingo path */}
        <IconButton icon={Grid3X3} 
                    btn_label={GameModeConstants.BINGO} 
                    tooltip_desc={<span>Fill up a bingo card of any size and see if you can score bingo by watching a series of YouTube videos.</span>}
                    modePresent={true}
                    redirect_path='/bingo'
                    short_desc={<span>See if you&apos;ll score bingo throughout a series of YouTube videos!</span>}
        />
        <IconButton icon={UserRound} 
                    btn_label={GameModeConstants.VIEWERS} 
                    tooltip_desc={<span>A random YouTube video will be shown and you will have to guess how many <b>viewers</b> it has.
                        The closer you are to the target view count the more points you&apos;ll earn.</span>}
                    modal_title={GameModeConstants.VIEWERS + ": " + GameModeConstants.SETTINGS}
                    modePresent={true}
                    short_desc={<span>Guess how many viewers a YouTube video has</span>}
                    />
        <IconButton icon={Calendar} 
                    btn_label={GameModeConstants.UPLOAD} 
                    tooltip_desc={<span>A random YouTube video will be shown and you will have to guess <b>when</b> the video was <b>publicly uploaded</b>.
                          The closer you are to the actual upload date, the more points you&apos;ll earn.</span>}
                    modal_title={GameModeConstants.UPLOAD + ": " + GameModeConstants.SETTINGS}
                    modePresent={true}
                    short_desc={<span>Guess when a YouTube video was uploaded</span>}
                    />
        <IconButton icon={ThumbsUp} 
                    btn_label={GameModeConstants.LIKES} 
                    tooltip_desc={<span>A random YouTube video will be shown and you will have to guess how many <b>likes</b> it has.
                          The closer you are to the target <b>like</b> count the more points you&apos;ll earn.</span>}
                    modal_title={GameModeConstants.LIKES + ": " + GameModeConstants.SETTINGS}
                    modePresent={true}
                    short_desc={<span>Guess how the number of likes a YouTube video has</span>}
                    />
        <IconButton icon={Folder} 
                    btn_label={GameModeConstants.GENRE} 
                    tooltip_desc={<span>A random YouTube video will be shown and you will have to guess what <b>genre</b> the YouTube video is under.</span>}
                    modal_title={GameModeConstants.GENRE + ": " + GameModeConstants.SETTINGS}
                    modePresent={true}
                    short_desc={<span>Guess the YouTube genre of a YouTube video</span>}
                    />
    </div>
    )
}

export default HomeMenu;