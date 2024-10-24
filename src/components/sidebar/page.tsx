import './sidebar.css'

const SideBar = () => {
    return (
    <div className="sideBarContainer">
        <div className="sideBarLink">
            <span className="sideBarLinkImg">img</span>
            <span className="sideBarLinkTitle">title</span>
        </div>
        <div className="sideBarLink">
            <span className="sideBarLinkImg">img</span>
            <span className="sideBarLinkTitle">bingo</span>
        </div>
        <div className="sideBarLink">
            <span className="sideBarLinkImg">img</span>
            <span className="sideBarLinkTitle">settings</span>
        </div>
        <div className="sideBarLink">
            <span className="sideBarLinkImg">img</span>
            <span className="sideBarLinkTitle">about</span>
        </div>
    </div>
    )
}

export default SideBar;