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

export const XIcon = (props: any) =>
  React.createElement(
    "svg",
    {
      role: "img",
      viewBox: "0 0 24 24",
      width: props.size || 24,
      height: props.size || 24,
      className: props.className,
      fill: "currentColor",
    },
    React.createElement("path", {
      d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
    })
  );

export const RedditIcon = (props: any) =>
  React.createElement(
    "svg",
    {
      role: "img",
      viewBox: "0 0 24 24",
      width: props.size || 24,
      height: props.size || 24,
      className: props.className,
      fill: "currentColor",
    },
    React.createElement("path", {
      d: "M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.68-6.24-1.78l1.1-3.43 3.57.75c.05 1.05.95 1.9 2.03 1.9 1.1 0 2-.9 2-2s-.9-2-2-2c-.95 0-1.75.67-1.94 1.56l-3.93-.83c-.24-.05-.47.09-.55.33l-1.25 3.88C8.82 6.89 6.57 7.55 4.9 8.56c-.53-.7-1.39-1.12-2.32-1.12-1.65 0-3 1.35-3 3 0 .88.39 1.67 1 2.21-.06.28-.1.56-.1.85 0 3.86 4.48 7 10 7s10-3.14 10-7c0-.29-.04-.57-.1-.85.61-.54 1-1.33 1-2.21zM7.5 12c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm9 5.62c-1.35 1.35-3.85 1.47-4.5 1.47-.65 0-3.15-.12-4.5-1.47-.1-.1-.1-.27 0-.37.09-.1.26-.1.37 0 1.13 1.13 3.22 1.27 4.13 1.27.9 0 3-.14 4.13-1.27.1-.1.27-.1.37 0 .1.1.1.27 0 .37zm-.38-2.62c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
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

// DiscordIcon dạng nét Stroke
export const DiscordIcon = (props: any) =>
  React.createElement(
    "svg",
    {
      role: "img",
      viewBox: "0 0 24 24",
      width: props.size || 24,
      height: props.size || 24,
      className: props.className,
      fill: "currentColor",
    },
    React.createElement("path", {
      d: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"
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
  X: XIcon,
  Reddit: RedditIcon,
  Telegram: TelegramIcon,
  Zalo: ZaloIcon,
  Discord: DiscordIcon,
  Youtube,
  Instagram,
};
