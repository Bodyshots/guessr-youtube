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
  DialogDescription,
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
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Input } from '@/components/ui/input';
import { VideoConstants, VideoType } from '@/constants/videotypes';
import { ClipConstants, ClipType } from '@/constants/clips';
import { ModeConstants, ModeType } from '@/constants/modes';
import { OtherConstants } from '@/constants/other';

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
    const [videoType, setVideoType] = useState<VideoType>(VideoConstants.VIDEO);
    const [mode, setMode] = useState<ModeType>(ModeConstants.NORMAL);
    const [clipSelect, setClipSelect] = useState<(ClipType)>(ClipConstants.RANDOM);

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
          <DialogTitle style={{color: "white"}} className={"text-xl font-semibold"}>{modal_title}</DialogTitle>
        </DialogHeader>
        <DialogTitle style={{color: "white"}} className={"text-center font-normal"}>Video Type</DialogTitle>

        {/* Video Types */}
        <ToggleGroup size={"lg"} type="single" style={{color: "white"}} className="gap-0">
          <ToggleGroupItem  data-state={videoType === VideoConstants.VIDEO ? OtherConstants.ON : OtherConstants.OFF}  
                            value={VideoConstants.VIDEO}
                            aria-label="Toggle videos"
                            onClick={() => setVideoType(VideoConstants.VIDEO)}
                            disabled={videoType === VideoConstants.VIDEO}
                            variant="outline"
                            className="rounded-r-none focus:z-10">
            {VideoConstants.VIDEO}
          </ToggleGroupItem>
          <ToggleGroupItem  value={VideoConstants.SHORTS}
                            aria-label="Toggle shorts" 
                            onClick={() => setVideoType(VideoConstants.SHORTS)}
                            disabled={videoType === VideoConstants.SHORTS}
                            variant="outline" 
                            className="rounded-l-none focus:z-10">
            {VideoConstants.SHORTS}
          </ToggleGroupItem>
        </ToggleGroup>

        {videoType === VideoConstants.VIDEO ? 
        <span style={{color: "white"}} className={"text-center text-sm"}>A random video will be picked for you each round. Videos may have ads</span>
        : <span style={{color: "white"}} className={"text-center text-sm"}>A random short (less than 60 seconds) will be picked for you each round. Shorts may have ads</span>}

        {/* Shorts - clip collection */}
        {videoType === VideoConstants.SHORTS &&
        <DialogTitle style={{color: "white"}} className={"text-center font-normal"}>Clip collection</DialogTitle>}

        {videoType === VideoConstants.SHORTS &&
          <Select>
            <SelectTrigger className="w-[100%] flex m-auto p-auto">
              <SelectValue placeholder={clipSelect.replace('&lt;', '<').replace('&gt;', '>')}/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={ClipConstants.RANDOM} onClick={() => setClipSelect(ClipConstants.RANDOM)}>{ClipConstants.RANDOM}</SelectItem>
                <SelectItem value={ClipConstants.SHORT} onClick={() => setClipSelect(ClipConstants.SHORT)}>{ClipConstants.SHORT.replace('&lt;', '<')}</SelectItem>
                <SelectItem value={ClipConstants.LONG} onClick={() => setClipSelect(ClipConstants.LONG)}>{ClipConstants.LONG.replace('&gt;', '>')}</SelectItem>
                <SelectItem value={ClipConstants.POPULAR} onClick={() => setClipSelect(ClipConstants.POPULAR)}>{ClipConstants.POPULAR}</SelectItem>
                <SelectItem value={ClipConstants.FORSEN} onClick={() => setClipSelect(ClipConstants.FORSEN)}>{ClipConstants.FORSEN}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>}

        {/* Modes */}
        {modePresent && 
          <ToggleGroup size={"lg"} type="single" style={{color: "white"}} className="gap-0">
          <ToggleGroupItem  data-state={mode === ModeConstants.NORMAL ? OtherConstants.ON : OtherConstants.OFF}  
                            value={ModeConstants.NORMAL} 
                            aria-label="Toggle normal"
                            onClick={() => setMode(ModeConstants.NORMAL)}
                            disabled={mode === ModeConstants.NORMAL}
                            className="button:disabled:bg-red-600 rounded-r-none focus:z-10"
                            variant="outline">
            {ModeConstants.NORMAL}
          </ToggleGroupItem>
          <ToggleGroupItem  value={ModeConstants.MC} 
                            aria-label="Toggle multiple choice" 
                            onClick={() => setMode(ModeConstants.MC)}
                            disabled={mode === ModeConstants.MC}
                            className="rounded-none focus:z-10"
                            variant="outline">
            {ModeConstants.MC}
          </ToggleGroupItem>
          <ToggleGroupItem  value={ModeConstants.HL}
                            aria-label="Toggle higher lower" 
                            onClick={() => setMode(ModeConstants.HL)}
                            disabled={mode === ModeConstants.HL}
                            className="rounded-l-none focus:z-10"
                            variant="outline">
            {ModeConstants.HL}
          </ToggleGroupItem>
        </ToggleGroup>}

        <DialogTitle style={{color: "white"}} className={cn("text-center font-normal")}>Round timer (minutes)</DialogTitle>
        <Input type="number" placeholder="0" min={"0"}/>
        <span style={{color: "white"}} className={cn("text-center text-sm")}>Your guess will be automatically submitted when the timer runs out. Set to 0 to disable</span>
        <DialogTitle style={{color: "white"}} className={cn("text-center font-normal")}>Play with chat (YouTube)</DialogTitle>
        <Input type="url" placeholder="www.youtube.com/watch?v=..."/>
        <span style={{color: "white"}} className={cn("text-center text-sm")}>Your viewers will be able to play along by guessing in chat</span>
        <DialogFooter>
          <Button type="submit" className={cn("bg-white hover:bg-gray-200 text-black justify-center text-center m-auto")}>Start</Button>
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