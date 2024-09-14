import React from "react";
import classNames from "clsx";
import { Theme, Tooltip, TooltipProps } from "react-tippy";

import "react-tippy/dist/tippy.css";

interface PopOverProps extends TooltipProps {
  interactive?: boolean;
  onRequestClose?: () => void;
  theme?: Theme;
  color?: string;
  open?: boolean;
  html?: JSX.Element;
  children?: JSX.Element;
  className?: string;
}

function PopOver(props: PopOverProps) {
  const { children, ...rest } = props;

  return <Tooltip {...rest}>{children}</Tooltip>;
}

export default PopOver;
