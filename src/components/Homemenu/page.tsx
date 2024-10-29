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
                    label={"Viewers"} 
                    desc={<span>A random YouTube video will be shown and you will have to guess how many <b>viewers</b> it has.
                          The closer you are to the target view count the more points you&apos;ll earn.</span>}/>
        <IconButton icon={IoPlayOutline} 
                    label={"Subscribers"} 
                    desc={<span>A random YouTube video will be shown and you will have to guess how many <b>subscribers</b> the <b>YouTube channel</b> has.
                          The closer you are to the target <b>subscriber</b> count the more points you&apos;ll earn.</span>}/>
        <IconButton icon={HiOutlineThumbUp} 
                    label={"Likes"} 
                    desc={<span>A random YouTube video will be shown and you will have to guess how many <b>subscribers</b> the <b>YouTube channel</b> has.
                          The closer you are to the target <b>subscriber</b> count the more points you&apos;ll earn.</span>}/>
        <IconButton icon={IoMdFolderOpen} 
                    label={"Genre"} 
                    desc={<span>A random YouTube video will be shown and you will have to guess what <b>genre</b> the YouTube <b>video</b> is under.</span>}/>
    </div>
    )
}

export default HomeMenu;