"use client";

import './homemenuitem.css';
import { ReactNode } from "react";
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LucideIcon } from 'lucide-react';
import { TooltipConstants, TooltipSide } from '@/constants/tooltip';
import { useRouter } from 'next/navigation'

interface IconButtonProps {
  icon: LucideIcon;
  btn_label: ReactNode;
  short_desc?: ReactNode;
  tooltip_desc: ReactNode;
  gameMode?: ReactNode;
  redirect_path: string;
}

const IconButton = ({
  icon: Icon,
  btn_label,
  short_desc,
  tooltip_desc,
  redirect_path }: IconButtonProps) => {

  const router = useRouter();

  return (
    <TooltipProvider delayDuration={TooltipConstants.DELAY_DURATION}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className="p-6 hover:bg-accent transition-colors group cursor-pointer shadow-md dark:shadow-white h-full min-h-54.75"
            onClick={redirect_path ? () => router.push(redirect_path) : undefined}>
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
        </TooltipTrigger>
        <TooltipContent
          className="tooltip_content"
          side={TooltipSide.TOP}
          sideOffset={TooltipConstants.HOME_SIDE_OFFSET}>
          {tooltip_desc}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>);
};

export default IconButton;