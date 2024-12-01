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

const Clips = {
  random: 'Random',
  short: 'Short clips (<10s)',
  long: 'Long clips (>40s)',
  popular: 'Popular clips (>100,000 views)',
  forsen: 'forsen'
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
    const [clipSelect, setClipSelect] = useState(Clips.random);

  return (
    <Dialog>
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
          <ToggleGroupItem  data-state={videoType === VideoTypes.video ? Toggle.on : Toggle.off}  
                            value={VideoTypes.video}
                            aria-label="Toggle videos"
                            onClick={() => setVideoType(VideoTypes.video)}
                            disabled={videoType === VideoTypes.video}
                            variant="outline"
                            className="rounded-r-none focus:z-10">
            {VideoTypes.video}
          </ToggleGroupItem>
          <ToggleGroupItem  value={VideoTypes.shorts}
                            aria-label="Toggle shorts" 
                            onClick={() => setVideoType(VideoTypes.shorts)}
                            disabled={videoType === VideoTypes.shorts}
                            variant="outline" 
                            className="rounded-l-none focus:z-10">
            {VideoTypes.shorts}
          </ToggleGroupItem>
        </ToggleGroup>

        {videoType === VideoTypes.video ? 
        <span style={{color: "white"}} className={"text-center text-sm"}>A random video will be picked for you each round. Videos may have ads</span>
        : <span style={{color: "white"}} className={"text-center text-sm"}>A random short (less than 60 seconds) will be picked for you each round. Shorts may have ads</span>}

        {/* Shorts - clip collection */}
        {videoType === VideoTypes.shorts &&
        <DialogTitle style={{color: "white"}} className={"text-center font-normal"}>Clip collection</DialogTitle>}

        {videoType === VideoTypes.shorts &&
          <Select>
            <SelectTrigger className="w-[100%] flex m-auto p-auto">
              <SelectValue placeholder={clipSelect.replace('&lt;', '<').replace('&gt;', '>')}/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={Clips.random} onClick={() => setClipSelect(Clips.random)}>{Clips.random}</SelectItem>
                <SelectItem value={Clips.short} onClick={() => setClipSelect(Clips.short)}>{Clips.short.replace('&lt;', '<')}</SelectItem>
                <SelectItem value={Clips.long} onClick={() => setClipSelect(Clips.long)}>{Clips.long.replace('&gt;', '>')}</SelectItem>
                <SelectItem value={Clips.popular} onClick={() => setClipSelect(Clips.popular)}>{Clips.popular}</SelectItem>
                <SelectItem value={Clips.forsen} onClick={() => setClipSelect(Clips.forsen)}>{Clips.forsen}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>}

        {/* Modes */}
        {modePresent && 
          <ToggleGroup size={"lg"} type="single" style={{color: "white"}} className="gap-0">
          <ToggleGroupItem  data-state={mode === Modes.normal ? Toggle.on : Toggle.off}  
                            value={Modes.normal} 
                            aria-label="Toggle normal"
                            onClick={() => setMode(Modes.normal)}
                            disabled={mode === Modes.normal}
                            className="button:disabled:bg-red-600 rounded-r-none focus:z-10"
                            variant="outline">
            {Modes.normal}
          </ToggleGroupItem>
          <ToggleGroupItem  value={Modes.mc} 
                            aria-label="Toggle multiple choice" 
                            onClick={() => setMode(Modes.mc)}
                            disabled={mode === Modes.mc}
                            className="rounded-none focus:z-10"
                            variant="outline">
            {Modes.mc}
          </ToggleGroupItem>
          <ToggleGroupItem  value={Modes.hl}
                            aria-label="Toggle higher lower" 
                            onClick={() => setMode(Modes.hl)}
                            disabled={mode === Modes.hl}
                            className="rounded-l-none focus:z-10"
                            variant="outline">
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
          <Button type="submit" className={cn("bg-white hover:bg-gray-200 text-black justify-center text-center m-auto")}>Start</Button>
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