import { Clock, House, ListEnd, MessageCircle } from "lucide-react";
import { GrOverview } from "react-icons/gr";
import { TbDeviceVisionPro } from "react-icons/tb";
import { RiTeamLine } from "react-icons/ri";
import { SiGooglecampaignmanager360 } from "react-icons/si";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

export const menuItems = {
  Home: {
    icon: House,
    value: "Home",
  },

  Overview: {
    icon: GrOverview,
    value: "Overview",
  },

  MissionVision: {
    icon: TbDeviceVisionPro,
    value: "Mission Vision",
  },

  ManagementTeam: {
    icon: RiTeamLine,
    value: "Management and Team",
  },

  ManagementSystems: {
    icon: SiGooglecampaignmanager360,
    value: "Management Systems",
  },

  Offices: {
    icon: HiOutlineOfficeBuilding,
    value: "Offices",
  },

  WorkingHours: {
    icon: Clock,
    value: "Working Hours",
  },

  SocialMedia: {
    icon: MessageCircle,
    value: "Social Media",
  },

  Footer: {
    icon: ListEnd,
    value: "Footer",
  },
};
