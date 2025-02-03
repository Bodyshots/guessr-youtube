"use client";

import './homemenuitem.css';
import '../../../app/globals.css';
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Input } from '@/components/ui/input';
import { VideoConstants } from '@/constants/videotypes';
import { ClipConstants, ClipType } from '@/constants/clips';
import { ModeConstants } from '@/constants/modes';
import { OtherConstants } from '@/constants/other';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setVideo, setClips, setMode, setTimer } from '@/redux/slices/gameSlice';

interface IconButtonProps {
  icon: IconType;
  btn_label: ReactNode;
  tooltip_desc: ReactNode;
  modal_title: ReactNode;
  modePresent: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({  icon: Icon, 
                                                  btn_label, 
                                                  tooltip_desc,
                                                  modal_title,
                                                  modePresent }) => {
    const dispatch = useAppDispatch();
    const videoType = useAppSelector((state) => state.game_persist.video);
    const clipSelect = useAppSelector((state) => state.game_persist.clips);
    const mode = useAppSelector((state) => state.game_persist.mode);
    const timer = useAppSelector((state) => state.game_persist.timer);

    const handleSelect = (e: ClipType) => {
      dispatch(setClips(e));
    }

  return (
    <Dialog>
      <DialogTitle/>
      <TooltipProvider>
        <Tooltip>

          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button className="home_card_link_container">
                <div className="home_card_link_upper">
                  <div className='home_card_link_title'>
                    <span className="home_card_label">{btn_label}</span>
                    <span className="home_card_link_pic"><Icon className="home_card_icon"/></span>
                  </div>
                </div>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>

        <DialogContent className="sm:max-w-[425px] bg-[#2b3140]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white font-yt_font">{modal_title}</DialogTitle>
        </DialogHeader>
        <DialogTitle className="text-center text-white font-yt_font font-semibold">Video Type</DialogTitle>

        {/* Video Types */}
        <ToggleGroup size={"lg"} type="single" className="gap-0 text-white font-roboto">
          <ToggleGroupItem  data-state={videoType === VideoConstants.VIDEO ? OtherConstants.ON : OtherConstants.OFF}  
                            value={VideoConstants.VIDEO}
                            aria-label="Toggle videos"
                            onClick={() => dispatch(setVideo(VideoConstants.VIDEO))}
                            disabled={videoType === VideoConstants.VIDEO}
                            variant="outline"
                            className="rounded-r-none focus:z-10">
            {VideoConstants.VIDEO}
          </ToggleGroupItem>
          <ToggleGroupItem  data-state={videoType === VideoConstants.SHORTS ? OtherConstants.ON : OtherConstants.OFF}
                            value={VideoConstants.SHORTS}
                            aria-label="Toggle shorts" 
                            onClick={() => dispatch(setVideo(VideoConstants.SHORTS))}
                            disabled={videoType === VideoConstants.SHORTS}
                            variant="outline" 
                            className="rounded-l-none focus:z-10">
            {VideoConstants.SHORTS}
          </ToggleGroupItem>
        </ToggleGroup>

        {videoType === VideoConstants.VIDEO ? 
        <span className="text-center text-sm text-white font-roboto">A random video will be picked for you each round. Videos may have ads</span>
        : <span className="text-center text-sm text-white font-roboto">A random short (less than 60 seconds) will be picked for you each round. Shorts may have ads</span>}

        {/* Shorts - clip collection */}
        {videoType === VideoConstants.SHORTS &&
        <DialogTitle className="text-center font-normal text-white">Clip collection</DialogTitle>}

        {videoType === VideoConstants.SHORTS &&
          <Select onValueChange={handleSelect}>
            <SelectTrigger className="w-[100%] flex m-auto p-auto">
              <SelectValue placeholder={clipSelect.replace('&lt;', '<').replace('&gt;', '>')}/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={ClipConstants.RANDOM}>{ClipConstants.RANDOM}</SelectItem>
                <SelectItem value={ClipConstants.SHORT}>{ClipConstants.SHORT.replace('&lt;', '<')}</SelectItem>
                <SelectItem value={ClipConstants.LONG}>{ClipConstants.LONG.replace('&gt;', '>')}</SelectItem>
                <SelectItem value={ClipConstants.POPULAR}>{ClipConstants.POPULAR}</SelectItem>
                <SelectItem value={ClipConstants.FORSEN}>{ClipConstants.FORSEN}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>}

        {/* Modes */}
        {modePresent && 
          <ToggleGroup size={"lg"} type="single" className="gap-0 text-white font-roboto">
          <ToggleGroupItem  data-state={mode === ModeConstants.NORMAL ? OtherConstants.ON : OtherConstants.OFF}  
                            value={ModeConstants.NORMAL} 
                            aria-label="Toggle normal"
                            onClick={() => dispatch(setMode(ModeConstants.NORMAL))}
                            disabled={mode === ModeConstants.NORMAL}
                            className="button:disabled:bg-red-600 rounded-r-none focus:z-10"
                            variant="outline">
            {ModeConstants.NORMAL}
          </ToggleGroupItem>
          <ToggleGroupItem  data-state={mode === ModeConstants.MC ? OtherConstants.ON : OtherConstants.OFF}  
                            value={ModeConstants.MC} 
                            aria-label="Toggle multiple choice" 
                            onClick={() => dispatch(setMode(ModeConstants.MC))}
                            disabled={mode === ModeConstants.MC}
                            className="rounded-none focus:z-10"
                            variant="outline">
            {ModeConstants.MC}
          </ToggleGroupItem>
          <ToggleGroupItem  data-state={mode === ModeConstants.HL ? OtherConstants.ON : OtherConstants.OFF}  
                            value={ModeConstants.HL}
                            aria-label="Toggle higher lower" 
                            onClick={() => dispatch(setMode(ModeConstants.HL))}
                            disabled={mode === ModeConstants.HL}
                            className="rounded-l-none focus:z-10"
                            variant="outline">
            {ModeConstants.HL}
          </ToggleGroupItem>
        </ToggleGroup>}

        <DialogTitle className="text-center text-white font-yt_font font-semibold">Round timer (minutes)</DialogTitle>
        <Input type="number"
               placeholder={timer ? timer : "0"} 
               min={"0"}
               value={timer ? timer : ""} 
               onChange={(e) => dispatch(setTimer(e.target.value))}/>
        <span className="text-center text-sm text-white font-roboto">Your guess will be automatically submitted when the timer runs out. Set to 0 to disable</span>
        <DialogTitle className="text-center text-white font-semibold font-yt_font">Play with chat (YouTube)</DialogTitle>
        <Input type="url" placeholder="www.youtube.com/watch?v=..."/>
        <span className="text-center text-sm text-white font-roboto">Your viewers will be able to play along by guessing in chat</span>
        <DialogFooter>
          <Button type="submit" className="bg-white hover:bg-gray-200 text-black justify-center text-center m-auto font-roboto">Start</Button>
        </DialogFooter>
        </DialogContent>
        
          <TooltipContent className="tooltip_content">
            {tooltip_desc}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Dialog>
  );
};

export default IconButton;