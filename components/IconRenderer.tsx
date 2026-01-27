
import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Linkedin, 
  Twitter, 
  Globe, 
  MessageCircle, 
  Mail, 
  Phone,
  Link as LinkIcon
} from 'lucide-react';

interface IconRendererProps {
  iconName?: string;
  className?: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ iconName, className }) => {
  const name = iconName?.toLowerCase() || '';
  
  switch (name) {
    case 'instagram': return <Instagram className={className} />;
    case 'facebook': return <Facebook className={className} />;
    case 'youtube': return <Youtube className={className} />;
    case 'linkedin': return <Linkedin className={className} />;
    case 'twitter': return <Twitter className={className} />;
    case 'globe': return <Globe className={className} />;
    case 'whatsapp': return <MessageCircle className={className} />;
    case 'email': return <Mail className={className} />;
    case 'phone': return <Phone className={className} />;
    default: return <LinkIcon className={className} />;
  }
};
