import './homemenuitem.css';
import '../../../app/globals.css';
import React from "react";
import { IconType } from "react-icons";
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface IconButtonProps {
  icon: IconType;
  label: React.ReactNode;
  desc: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, label, desc }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="home_card_link_container">
              <div className="home_card_link_upper">
                  <div className='home_card_link_title'>
                      <span>{label}</span>
                      <span className="home_card_link_pic"><Icon/></span>
                  </div>
              </div>
          </Button>
      </TooltipTrigger>
      <TooltipContent>
        {desc}
      </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default IconButton;