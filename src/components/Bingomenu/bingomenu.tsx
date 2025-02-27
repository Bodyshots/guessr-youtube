import './bingomenu.css'
import '../../app/globals.css';
 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { IoLogoYoutube, IoLogoGoogle } from 'react-icons/io5';
import { TrashIcon, Dice5Icon, PartyPopperIcon, SettingsIcon, Grid3x3Icon } from 'lucide-react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Card } from '../ui/card';
import BingoCard from '../BingoCard/bingocard';
import React from 'react';

const IntroBtns: React.FC<{
  className?: string;
}> = ({
  className
}) => {
  return (
  <div className={className}>
    <div>
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
    <div className="p-2">
      <span className="text-muted-foreground">Logging in is optional</span>
    </div>
  </div>)
}

const RandBtn: React.FC<{
  className?: string;
}> = ({
  className
}) => {
  return (
    <Button className={className}>
      <span className="flex flex-row gap-2 justify-center"><Dice5Icon/>Randomize all</span>
    </Button>)
}

const ClearBtn: React.FC<{
  className?: string;
}> = ({
  className
}) => {
  return (
    <Button className={className}>
      <span className="flex flex-row gap-2 justify-center"><TrashIcon/>Clear all</span>
    </Button>)
}

const BingoMenu = () => {
    return (
    <div className="flex flex-row align-center text-center justify-between font-roboto w-full h-full gap-4">
      <BingoCard/>
      <Card className="p-4">
        <IntroBtns className="p-2"/>
        <div className="bingo_game_settings">
          <div className="flex gap-4">
            <div className="bingo_settings_objs_container">
              <span className="flex flex-row justify-start gap-2 p-2 py-4 font-semibold text-2xl"><SettingsIcon/>Settings</span>
              <div className="bingo_settings_objs isolate flex -space-x-px"> {/* replace w/ togglegroup */}
                <div className="flex justify-center">
                  <Switch/>
                  <span className="font-medium px-2 text-lg">Allow diagonals</span>
                </div>
                <span className="text-md text-muted-foreground">Count diagonals when checking for winning patterns</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="flex flex-row justify-start gap-2 p-2 py-4 font-semibold text-2xl"><Grid3x3Icon/>Board</span>
              <div className="board_size_container">
                <span className="board_settings_subtitle">Board size: 5x5 (# items)</span>
                <Slider defaultValue={[33]} max={100} step={1} />
                <div className="flex gap-1 justify-center p-4">
                  <RandBtn/>
                  <ClearBtn/>
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
      </Card>
    </div>
    )
}

export default BingoMenu;