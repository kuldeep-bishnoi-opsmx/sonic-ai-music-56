
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Github, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Headphones,
  Sparkles
} from "lucide-react";

interface FooterProps {
  onSectionChange?: (section: string) => void;
}

export function Footer({ onSectionChange }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleQuickLinkClick = (section: string) => {
    if (onSectionChange) {
      onSectionChange(section);
      // Scroll to top when changing sections
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSupportClick = (action: string) => {
    // Simulate support actions
    switch (action) {
      case 'help':
        alert('Help Center - Coming Soon!\nFor now, you can reach us at hello@sonicai.com');
        break;
      case 'community':
        alert('Community Forum - Coming Soon!\nJoin our Discord community for now');
        break;
      case 'api':
        alert('API Documentation - Coming Soon!\nDevelopers can access our API docs soon');
        break;
      case 'contact':
        alert('Contact Us - hello@sonicai.com\nWe\'d love to hear from you!');
        break;
      default:
        break;
    }
  };

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">AI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  SonicAI
                </h1>
                <Badge variant="secondary" className="text-xs">
                  Beta
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The future of music is here. Discover, create, and share AI-generated music 
              that pushes the boundaries of creativity.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                  onClick={() => handleQuickLinkClick("home")}
                >
                  Home
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                  onClick={() => handleQuickLinkClick("discover")}
                >
                  Discover
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                  onClick={() => handleQuickLinkClick("library")}
                >
                  Library
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                  onClick={() => alert('Upload AI Track feature is available in the top navigation!')}
                >
                  Upload AI Track
                </Button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2">
              <li>
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                  onClick={() => handleSupportClick('help')}
                >
                  Help Center
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                  onClick={() => handleSupportClick('community')}
                >
                  Community
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                  onClick={() => handleSupportClick('api')}
                >
                  API Documentation
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                  onClick={() => handleSupportClick('contact')}
                >
                  Contact Us
                </Button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@sonicai.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>© {currentYear} SonicAI. All rights reserved.</span>
            <Separator orientation="vertical" className="h-4" />
            <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Button>
            <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Headphones className="h-4 w-4" />
            <span>Made with</span>
            <Sparkles className="h-4 w-4 text-primary" />
            <span>by music lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
