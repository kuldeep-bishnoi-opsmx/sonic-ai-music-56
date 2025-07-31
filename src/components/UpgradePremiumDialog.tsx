
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Crown, Check, Sparkles, Music, Download, Infinity } from "lucide-react";

interface UpgradePremiumDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpgradePremiumDialog({ open, onOpenChange }: UpgradePremiumDialogProps) {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [isUpgrading, setIsUpgrading] = useState(false);

  const plans = [
    {
      id: "pro",
      name: "Pro",
      price: "$9.99",
      period: "month",
      features: [
        "Unlimited AI track generation",
        "High-quality audio downloads",
        "Priority support",
        "Advanced AI models",
        "Commercial license"
      ],
      popular: true
    },
    {
      id: "ultimate",
      name: "Ultimate",
      price: "$19.99",
      period: "month",
      features: [
        "Everything in Pro",
        "Exclusive AI models",
        "Custom voice synthesis",
        "API access",
        "White-label solution",
        "Priority queue"
      ],
      popular: false
    }
  ];

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    
    // Simulate upgrade process
    setTimeout(() => {
      setIsUpgrading(false);
      onOpenChange(false);
      // Show success message
      alert("Successfully upgraded to Premium! Welcome to SonicAI Pro! 🎉");
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Upgrade to Premium
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Plan */}
          <div className="bg-card/50 rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Current Plan: Free</h3>
                <p className="text-sm text-muted-foreground">Limited features and track generation</p>
              </div>
              <Badge variant="outline">Free</Badge>
            </div>
          </div>

          {/* Plan Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`p-6 cursor-pointer transition-all duration-200 relative ${
                  selectedPlan === plan.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:shadow-card'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-primary">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <Separator />

          {/* Features Comparison */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">What you'll get:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Infinity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Unlimited Generation</p>
                  <p className="text-xs text-muted-foreground">No daily limits</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Download className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">High-Quality Downloads</p>
                  <p className="text-xs text-muted-foreground">WAV & FLAC formats</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Advanced AI Models</p>
                  <p className="text-xs text-muted-foreground">Latest technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUpgrading}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpgrade} 
            disabled={isUpgrading}
            className="bg-gradient-primary hover:shadow-glow"
          >
            <Crown className="h-4 w-4 mr-2" />
            {isUpgrading ? "Upgrading..." : `Upgrade to ${plans.find(p => p.id === selectedPlan)?.name}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
