"use client";

import './homemenuitem.css';
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Card } from '@/components/ui/card';
import clsx from 'clsx';
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
import { LucideIcon } from 'lucide-react';
import { TooltipConstants, TooltipSide } from '@/constants/tooltip';
import { useRouter } from 'next/navigation'

interface IconCardProps {
  Icon: LucideIcon;
  btn_label: ReactNode;
  short_desc: ReactNode;
  onClick?: () => void;
}
interface IconButtonProps {
  icon: LucideIcon;
  btn_label: ReactNode;
  short_desc?: ReactNode;
  tooltip_desc: ReactNode;
  gameMode?: ReactNode;
  redirect_path?: string;
}

const IconCard = ({ Icon, btn_label, short_desc, onClick }: IconCardProps) => (
  <Card
    className="p-6 hover:bg-accent transition-colors group cursor-pointer shadow-md dark:shadow-white h-full min-h-56.75"
    onClick={onClick}>
    <div className="space-y-4">
      <div className="p-3 w-fit rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-2xl font-semibold text-left p-1 pl-0">{btn_label}</p>
        <p className="text-md text-muted-foreground text-left">{short_desc}</p>
      </div>
    </div>
  </Card>
);

const IconButton = ({
  icon,
  btn_label,
  short_desc,
  tooltip_desc,
  gameMode = undefined,
  redirect_path }: IconButtonProps) => {

  const router = useRouter();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => { setWindowHeight(window.innerHeight); };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Dialog>
        <DialogTitle className="text-foreground" />
        <TooltipProvider delayDuration={TooltipConstants.DELAY_DURATION}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                {!redirect_path ? <DialogTrigger asChild>
                  <IconCard
                    Icon={icon}
                    btn_label={btn_label}
                    short_desc={short_desc} />
                </DialogTrigger> :
                  <IconCard
                    Icon={icon}
                    btn_label={btn_label}
                    onClick={redirect_path ? () => router.push(redirect_path) : undefined}
                    short_desc={short_desc} />
                }
              </div>
            </TooltipTrigger>
            <DialogContent className={clsx(`sm:max-w-125 bg-background gap-0 rounded-lg`, windowHeight <= 845 && "max-h-166.75 overflow-y-scroll")} aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold font-yt_font text-center p-0">{gameMode}</DialogTitle>
              </DialogHeader>
              <div>
                <DialogTitle className="text-center text-foreground font-yt_font font-semibold px-0">Today&apos;s Theme:</DialogTitle>
                <DialogTitle className="text-center text-foreground font-yt_font font-semibold px-0">wash (temp)</DialogTitle>
                <span className="text-center text-foreground font-yt_font font-semibold px-0"> X completions so far, next theme in 0X:XX:XX</span>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  variant="outline"
                  className="bg-background text-foreground justify-center text-center m-auto font-roboto"
                  onClick={() => router.push(("/" + gameMode).toLowerCase())}
                >
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