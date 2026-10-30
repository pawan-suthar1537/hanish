import portfolioJson from "@/data/portfolio.json";
import {
  ShieldCheck,
  Users,
  Calendar,
  MessageCircle,
  Landmark,
  Receipt,
  ClipboardCheck,
  UserCheck,
  Clock,
  Eye,
  Headphones,
  Lock,
  MessageSquare,
  FolderOpen,
  Lightbulb,
  FileCheck,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Users,
  Calendar,
  MessageCircle,
  Landmark,
  Receipt,
  ClipboardCheck,
  UserCheck,
  Clock,
  Eye,
  Headphones,
  Lock,
  MessageSquare,
  FolderOpen,
  Lightbulb,
  FileCheck,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
};

export function getIcon(iconName?: string): LucideIcon {
  if (!iconName) return HelpCircle;
  if (iconMap[iconName]) return iconMap[iconName];
  const dynamicIcon = (LucideIcons as Record<string, any>)[iconName];
  if (dynamicIcon && (typeof dynamicIcon === "function" || typeof dynamicIcon === "object")) {
    return dynamicIcon as LucideIcon;
  }
  return HelpCircle;
}

let rawData = portfolioJson;

// In Node server environments, load fresh from data/portfolio.json
if (typeof window === "undefined") {
  try {
    const fs = eval("require")("fs");
    const path = eval("require")("path");
    const filePath = path.join(process.cwd(), "data", "portfolio.json");
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      rawData = JSON.parse(content);
    }
  } catch {
    // Fall back to imported JSON
  }
}

export const siteConfig = rawData.siteConfig;

export const navItems = rawData.navItems;

export const heroData = {
  ...rawData.heroData,
  badges: rawData.heroData.badges.map((badge) => ({
    ...badge,
    icon: getIcon(badge.icon),
  })),
};

export const aboutData = rawData.aboutData;

export const servicesData = {
  ...rawData.servicesData,
  items: rawData.servicesData.items.map((item) => ({
    ...item,
    icon: getIcon(item.icon),
  })),
};

export const whyChooseMeData = {
  ...rawData.whyChooseMeData,
  features: rawData.whyChooseMeData.features.map((feature) => ({
    ...feature,
    icon: getIcon(feature.icon),
  })),
};

export const testimonialsData = rawData.testimonialsData;

export const processData = {
  ...rawData.processData,
  steps: rawData.processData.steps.map((step) => ({
    ...step,
    icon: getIcon(step.icon),
  })),
};

export const ctaData = rawData.ctaData;

export const contactData = {
  ...rawData.contactData,
  infoItems: rawData.contactData.infoItems.map((item) => ({
    ...item,
    icon: getIcon(item.icon),
  })),
};

export const footerData = rawData.footerData;
