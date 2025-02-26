"use client";

import './homemenuitem.css';
import '../../../app/globals.css';
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Card } from '@/components/ui/card';
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
import { LucideIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { VideoConstants } from '@/constants/videotypes';
import { ClipConstants, ClipType } from '@/constants/clips';
import { ModeConstants } from '@/constants/modes';
import { OtherConstants } from '@/constants/other';
import { TooltipConstants, TooltipSide } from '@/constants/tooltip';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setVideo, setClips, setMode, setTimer } from '@/redux/slices/gameSlice';
import { useRouter } from 'next/navigation'


const IconCard: React.FC<{ Icon: LucideIcon; btn_label: ReactNode; onClick?: () => void }> = ({ Icon, btn_label, onClick }) => (
  <Card className="p-6 hover:bg-accent transition-colors group cursor-pointer shadow-md dark:shadow-white"
        onClick={onClick}>
    <div className="space-y-4">
      <div className="p-3 w-fit rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-2xl font-semibold text-left p-1 pl-0">{btn_label}</p>
        <p className="text-sm text-muted-foreground text-left">test1 description</p>
      </div>
    </div>
  </Card>
);

interface IconButtonProps {
  icon: LucideIcon;
  btn_label: ReactNode;
  tooltip_desc: ReactNode;
  modal_title: ReactNode;
  modePresent: boolean;
  redirect_path?: string;
}

const IconButton: React.FC<IconButtonProps> = ({  icon: Icon, 
                                                  btn_label, 
                                                  tooltip_desc,
                                                  modal_title,
                                                  modePresent,
                                                  redirect_path }) => {
                                                    
    const dispatch = useAppDispatch();
    const videoType = useAppSelector((state) => state.game_persist.video);
    const clipSelect = useAppSelector((state) => state.game_persist.clips);
    const mode = useAppSelector((state) => state.game_persist.mode);
    const timer = useAppSelector((state) => state.game_persist.timer);
    const router = useRouter();

    const handleSelect = (e: ClipType) => {
      dispatch(setClips(e));
    }

  return (
    <div className="home_menu_item">
      <Dialog>
        <DialogTitle className="text-foreground"/>
          <TooltipProvider delayDuration={TooltipConstants.DELAY_DURATION}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  {!redirect_path ? <DialogTrigger asChild>
                    <IconCard Icon={Icon} btn_label={btn_label}/>
                    </DialogTrigger> :
                    <IconCard Icon={Icon} btn_label={btn_label} onClick={redirect_path ? () => router.push(redirect_path) : undefined} />                                  
                  }
                </div>
              </TooltipTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold font-yt_font pb-0">{modal_title}</DialogTitle>
            </DialogHeader>
            <DialogTitle className="text-center text-foreground font-yt_font font-semibold">Video Type</DialogTitle>

            {/* Video Types */}
            <ToggleGroup size={"lg"} type="single" className="gap-0 text-foreground font-roboto">
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
            <span className="text-center text-sm text-foreground font-roboto">A random video will be picked for you each round. Videos may have ads</span>
            : <span className="text-center text-sm text-foreground font-roboto">A random short (less than 60 seconds) will be picked for you each round. Shorts may have ads</span>}

            {/* Shorts - clip collection */}
            {videoType === VideoConstants.SHORTS &&
            <DialogTitle className="text-center font-normal text-foreground">Clip collection</DialogTitle>}

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
            <ToggleGroup size={"lg"} type="single" className="gap-0 text-foreground font-roboto">
            <ToggleGroupItem  data-state={mode === ModeConstants.NORMAL ? OtherConstants.ON : OtherConstants.OFF}  
                                value={ModeConstants.NORMAL} 
                                aria-label="Toggle normal"
                                onClick={() => dispatch(setMode(ModeConstants.NORMAL))}
                                disabled={mode === ModeConstants.NORMAL}
                                className="rounded-r-none focus:z-10"
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

            <DialogTitle className="text-center text-foreground font-yt_font font-semibold">Round timer (minutes)</DialogTitle>
            <Input type="number"
                placeholder={timer ? timer : "0"} 
                min={"0"}
                value={timer ? timer : ""} 
                onChange={(e) => dispatch(setTimer(e.target.value))}/>
            <span className="text-center text-sm text-foreground font-roboto">Your guess will be automatically submitted when the timer runs out. Set to 0 to disable</span>
            <DialogTitle className="text-center text-foreground font-semibold font-yt_font">Play with chat (YouTube - Under Construction)</DialogTitle>
            <Input className="font-yt_font" type="url" placeholder="www.youtube.com/watch?v=..."/>
            <span className="text-center text-sm text-foreground font-roboto">Your viewers will be able to play along by guessing in chat</span>
            <DialogFooter>
            <Button
            type="submit"
            variant="outline"
            className="bg-background text-foreground justify-center text-center m-auto font-roboto">
                Start
            </Button>
            </DialogFooter>
            </DialogContent>
            
            <TooltipContent 
                className="tooltip_content" 
                side={TooltipSide.TOP}
                sideOffset={TooltipConstants.HOME_SIDE_OFFSET}>
                {tooltip_desc}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Dialog>
    </div>);
};

export default IconButton;