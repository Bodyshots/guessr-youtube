import './bingomenu.css'
import '../../app/globals.css';
 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { IoLogoYoutube, IoLogoGoogle } from 'react-icons/io5';
import { TrashIcon, Dice5Icon, PartyPopperIcon, SettingsIcon, Grid3x3Icon } from 'lucide-react';
import { ScrollArea } from '@radix-ui/react-scroll-area';

const BingoMenu = () => {

    return (
    <div className="bingo_menu_container">
      <div>
        <div className="how_to_login_btns">
          <Button variant="outline"
                  className="rounded-r-none focus:z-10">
            <IoLogoYoutube/>
            How to play
          </Button>
          <Button variant="outline" 
                  className="rounded-l-none focus:z-10">
            <IoLogoGoogle/>
            Log in with Google
          </Button>
        </div>
        <div className="bingo_game_settings">
          <div className="bingo_settings">
            <div className="bingo_settings_objs_container">
              <span className="bingo_settings_title"><SettingsIcon/>Settings</span>
              <div className="bingo_settings_objs isolate flex -space-x-px"> {/* replace w/ togglegroup */}
                <div className="bingo_settings_btns">
                  <Button variant="outline" className="rounded-r-none focus:z-10">
                    <IoLogoYoutube/>
                    YouTube Bingo
                  </Button>
                  <Button variant="outline" className="rounded-l-none focus:z-10">
                    Custom Bingo
                  </Button>
                </div>
                text decribing either bingo option
                <Switch/>
                <span>Allow diagonals</span>
                <span>Count diagonals when checking for winning patterns</span>
              </div>
            </div>
            <div className="bingo_board_settings">
              <span className="board_settings_title"><Grid3x3Icon/>Board</span>
              <div className="board_size_container">
                <span className="board_settings_subtitle">Board size: 5x5 (# items)</span>
                <Slider defaultValue={[33]} max={100} step={1} />
                <div className="flex">
                  <Button>
                    <Dice5Icon/>
                    Randomize all
                  </Button>
                  <Button>
                    <TrashIcon/>
                    Clear all
                  </Button>
                </div>
                <ScrollArea className="bingo_items">
                  <Input/>
                </ScrollArea>
                <Button>
                  <PartyPopperIcon/>
                  Start
                </Button>
                <span>Remember to share the bingo link with your viewers if you logged in with Google!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default BingoMenu;