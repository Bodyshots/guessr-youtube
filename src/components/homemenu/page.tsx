import './homemenu.css'

const HomeMenu = () => {
    return (
    <div className="home_card_container">
        <div className="home_card_link_container">
            <div className="home_card_link_upper">
                <span className="home_card_link_pic">pic</span>
                <span className='home_card_link_title'>viewers</span>
            </div>
        </div>
        <div className="home_card_link_container">
            <div className="home_card_link_upper">
                <span>pic</span>
                <span className='home_card_link_title'>subscribers</span>
            </div>
        </div>
        <div className="home_card_link_container">
            <div className="home_card_link_upper">
            <span className="home_card_link_pic">pic</span>
                <span className='home_card_link_title'>genre</span>
            </div>
            <div className='home_card_desc'>
            dgsdasdasdasdasdadasddasdasdasdaddsadasdasdsa
            </div>
        </div>
        <div className="home_card_link_container">
            <div className="home_card_link_upper">
            <span className="home_card_link_pic">pic</span>
                <span className='home_card_link_title'>???</span>
            </div>
        </div>
    </div>
    )
}

export default HomeMenu;