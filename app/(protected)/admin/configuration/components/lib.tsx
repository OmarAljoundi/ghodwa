import { Clock, House, ListEnd, MessageCircle, ShieldCheck } from 'lucide-react';
import { CgFormatSeparator } from 'react-icons/cg';
import { GrOverview } from 'react-icons/gr';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { RiTeamLine } from 'react-icons/ri';
import { SiGooglecampaignmanager360 } from 'react-icons/si';
import { TbDeviceVisionPro } from 'react-icons/tb';

export const menuItems = {
  Home: {
    icon: House,
    value: 'Home',
  },
  ExtraAboutContent: {
    icon: CgFormatSeparator,
    value: 'About Extra Pages',
  },

  SecurityDefence: {
    icon: ShieldCheck,
    value: 'Security and Defence',
  },

  Overview: {
    icon: GrOverview,
    value: 'Overview',
  },

  MissionVision: {
    icon: TbDeviceVisionPro,
    value: 'Mission Vision',
  },

  ManagementTeam: {
    icon: RiTeamLine,
    value: 'Management and Team',
  },

  ManagementSystems: {
    icon: SiGooglecampaignmanager360,
    value: 'Management Systems',
  },

  Offices: {
    icon: HiOutlineOfficeBuilding,
    value: 'Offices',
  },

  WorkingHours: {
    icon: Clock,
    value: 'Working Hours',
  },

  SocialMedia: {
    icon: MessageCircle,
    value: 'Social Media',
  },

  Footer: {
    icon: ListEnd,
    value: 'Footer',
  },
};
