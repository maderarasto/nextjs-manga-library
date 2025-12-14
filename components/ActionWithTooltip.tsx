import React from 'react';
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

export type ActionWithTooltipProps = {
  icon?: React.ReactNode
  tooltipText?: string
  onClick?: () => void
}

const ActionWithTooltip = ({
  icon,
  tooltipText,
  onClick,
}: ActionWithTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-pointer transition-transform active:scale-80" onClick={onClick} asChild>
        {icon}
      </TooltipTrigger>
      <TooltipContent>{tooltipText}</TooltipContent>
    </Tooltip>
  );
};

export default ActionWithTooltip;