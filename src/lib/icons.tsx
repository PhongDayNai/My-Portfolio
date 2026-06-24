import React from "react";
import { Github, Facebook, Server, Mail, Phone, Calendar, Circle, Globe, Linkedin, Youtube, Instagram } from "lucide-react";

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

// Telegram nét stroke, chỉ hiển thị máy bay giấy, không có vòng tròn bao quanh
export const TelegramIcon = (props: any) =>
  React.createElement(
    "svg",
    {
      role: "img",
      viewBox: "0 0 24 24",
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
      d: "m22 2-7 20-4-9-9-4Z"
    }),
    React.createElement("path", {
      d: "M22 2 11 13"
    })
  );

// ZaloIcon dạng nét Stroke thanh mảnh, bong bóng thoại Zalo bo góc mượt mà và chữ Z nghệ thuật ở trung tâm
export const ZaloIcon = (props: any) =>
  React.createElement(
    "svg",
    {
      role: "img",
      viewBox: "0 0 24 24",
      width: props.size || 24,
      height: props.size || 24,
      className: props.className,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    // Bong bóng thoại Zalo dẹt nằm ngang mềm mại có đuôi nhọn góc dưới bên trái
    React.createElement("path", {
      d: "M21 11.5c0-4.14-4.03-7.5-9-7.5s-9 3.36-9 7.5c0 1.6 0.6 3.1 1.6 4.3L3.5 20l4.5-1.3c1.2 0.5 2.6 0.8 4 0.8 4.97 0 9-3.36 9-7.5z"
    }),
    // Chữ Z nghệ thuật được căn giữa hoàn hảo
    React.createElement("path", {
      d: "M9.5 9h5L9.5 14h5"
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
  Linkedin,
  Telegram: TelegramIcon,
  Zalo: ZaloIcon,
  Youtube,
  Instagram,
};
