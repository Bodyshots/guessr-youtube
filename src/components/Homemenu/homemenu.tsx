import './homemenu.css'
import '../../app/globals.css';
import { IoPersonOutline } from "react-icons/io5";
import { IoPlayOutline } from "react-icons/io5";
import { IoMdFolderOpen } from "react-icons/io";
import { HiOutlineThumbUp } from "react-icons/hi";
import IconButton from './HomemenuItem/homemenuitem';

const HomeMenu = () => {
    return (
    <div className="home_card_container">
        <IconButton icon={IoPersonOutline} 
                    btn_label={"Viewers"} 
                    tooltip_desc={<span>A random YouTube video will be shown and you will have to guess how many <b>viewers</b> it has.
                        The closer you are to the target view count the more points you&apos;ll earn.</span>}
                    modal_title={"Game Settings"}
                    modePresent={true}
                    />
        <IconButton icon={IoPlayOutline} 
                    btn_label={"Subscribers"} 
                    tooltip_desc={<span>A random YouTube video will be shown and you will have to guess how many <b>subscribers</b> the <b>YouTube channel</b> has.
                          The closer you are to the target <b>subscriber</b> count the more points you&apos;ll earn.</span>}
                    modal_title={"Game Settings"}
                    modePresent={true}
                    />
        <IconButton icon={HiOutlineThumbUp} 
                    btn_label={"Likes"} 
                    tooltip_desc={<span>A random YouTube video will be shown and you will have to guess how many <b>subscribers</b> the <b>YouTube channel</b> has.
                          The closer you are to the target <b>subscriber</b> count the more points you&apos;ll earn.</span>}
                    modal_title={"Game Settings"}
                    modePresent={true}
                    />
        <IconButton icon={IoMdFolderOpen} 
                    btn_label={"Genre"} 
                    tooltip_desc={<span>A random YouTube video will be shown and you will have to guess what <b>genre</b> the YouTube <b>video</b> is under.</span>}
                    modal_title={"Game Settings"}
                    modePresent={true}
                    />
    </div>
    )
}

export default HomeMenu;