"use client";

import './homemenuitem.css';
import '../../../app/globals.css';
import { ReactNode, MouseEvent } from "react";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Input } from '@/components/ui/input';

interface IconButtonProps {
  icon: IconType;
  btn_label: ReactNode;
  tooltip_desc: ReactNode;
  modal_title: ReactNode;
  modePresent: boolean;
}

const VideoTypes = {
  video: 'Videos',
  shorts: 'Shorts'
}

const Modes = {
  normal: 'Normal',
  mc: "Multiple Choice",
  hl: "Higher Lower"
}

const Toggle = {
  on: 'on',
  off: 'off'
}

const IconButton: React.FC<IconButtonProps> = ({  icon: Icon, 
                                                  btn_label, 
                                                  tooltip_desc,
                                                  modal_title,
                                                  modePresent }) => {
    const [videoType, setVideoType] = useState(VideoTypes.video);
    const [mode, setMode] = useState(Modes.normal);

    const onClickVidType = ( e: MouseEvent<HTMLButtonElement, MouseEvent<Element, MouseEvent>> ) => {
      setVideoType(e.currentTarget.innerHTML);
    }

    const onClickMode = ( e: MouseEvent<HTMLButtonElement, MouseEvent<Element, MouseEvent>> ) => {
      setMode(e.currentTarget.innerHTML);
    }

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>

          <TooltipTrigger>
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
          <DialogTitle style={{color: "white"}} className={cn("text-xl font-semibold")}>{modal_title}</DialogTitle>
        </DialogHeader>
        <DialogTitle style={{color: "white"}} className={cn("text-center font-normal")}>Video Type</DialogTitle>

        {/* Video Types */}
        <ToggleGroup size={"lg"} type="single" style={{color: "white"}}>
          <ToggleGroupItem  data-state={videoType === VideoTypes.video ? Toggle.on : Toggle.off}  
                            value={VideoTypes.video}
                            aria-label="Toggle videos"
                            onClick={(e) => onClickVidType(e)}
                            disabled={videoType === VideoTypes.video}>
            Videos
          </ToggleGroupItem>
          <ToggleGroupItem  value={VideoTypes.shorts}
                            aria-label="Toggle shorts" 
                            onClick={(e) => onClickVidType(e)}
                            disabled={videoType === VideoTypes.shorts}>
            Shorts
          </ToggleGroupItem>
        </ToggleGroup>

        {videoType === VideoTypes.video ? 
        <span style={{color: "white"}} className={cn("text-center text-sm")}>A random video will be picked for you each round. Videos may have ads</span>
        : <span style={{color: "white"}} className={cn("text-center text-sm")}>A random short (less than 60 seconds) will be picked for you each round. Shorts may have ads</span>}

        {/* Modes */}
        {modePresent && 
          <ToggleGroup size={"lg"} type="single" style={{color: "white"}}>
          <ToggleGroupItem  data-state={mode === Modes.normal ? Toggle.on : Toggle.off}  
                            value={Modes.normal} 
                            aria-label="Toggle normal"
                            onClick={(e) => onClickMode(e)}
                            disabled={mode === Modes.normal}>
            {Modes.normal}
          </ToggleGroupItem>
          <ToggleGroupItem  value={Modes.mc} 
                            aria-label="Toggle multiple choice" 
                            onClick={(e) => onClickMode(e)}
                            disabled={mode === Modes.mc}>
            {Modes.mc}
          </ToggleGroupItem>
          <ToggleGroupItem  value={Modes.hl}
                            aria-label="Toggle higher lower" 
                            onClick={(e) => onClickMode(e)}
                            disabled={mode === Modes.hl}>
            {Modes.hl}
          </ToggleGroupItem>
        </ToggleGroup>}

        <DialogTitle style={{color: "white"}} className={cn("text-center font-normal")}>Round timer (minutes)</DialogTitle>
        <Input type="number" placeholder="0" min={"0"}/>
        <span style={{color: "white"}} className={cn("text-center text-sm")}>Your guess will be automatically submitted when the timer runs out. Set to 0 to disable</span>
        <DialogTitle style={{color: "white"}} className={cn("text-center font-normal")}>Play with chat (YouTube)</DialogTitle>
        <Input type="url" placeholder="www.youtube.com/watch?v=..."/>
        <span style={{color: "white"}} className={cn("text-center text-sm")}>Your viewers will be able to play along by guessing in chat</span>
        <DialogFooter>
          <Button type="submit" className={cn("bg-white hover:bg-gray-200 text-black")}>Start</Button>
        </DialogFooter>
        </DialogContent>
        
          <TooltipContent>
            {tooltip_desc}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Dialog>
  );
};

export default IconButton;