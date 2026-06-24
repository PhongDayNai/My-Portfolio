import React from "react";
import { Github, Facebook, Server, Mail, Phone, Calendar, Circle, Globe } from "lucide-react";

export const TiktokIcon = (props: any) =>
  React.createElement(
    "svg",
    {
      role: "img",
      viewBox: "1.5 1.5 21 21",
      width: props.size || 24,
      height: props.size || 24,
      className: props.className,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    React.createElement("path", {
      d: "M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5",
    })
  );

export const ICON_MAP: Record<string, any> = {
  Github,
  Facebook,
  TikTok: TiktokIcon,
  Server,
  Mail,
  Phone,
  Calendar,
  Circle,
  Globe,
};
