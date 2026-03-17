"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Calendar, Bell, ArrowRight, Upload, Play, X } from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [showSampleUpload, setShowSampleUpload] = useState(false);

  const steps = [
    {
      icon: FileText,
      title: "Welcome to GravMap",
      description: "Your intelligent real estate transaction management platform. Let&apos;s get you started with tracking your first contract.",
    },
    {
      icon: Upload,
      title: "Upload Your Contract",
      description: "Simply upload your purchase agreement or lease document and our AI will extract all the important dates and deadlines automatically.",
    },
    {
      icon: Calendar,
      title: "Track Your Timeline",
      description: "See all your important deadlines in one place. We'll calculate days remaining and help you stay on track.",
    },
    {
      icon: Bell,
      title: "Get Reminders",
      description: "Never miss a deadline again. We'll send you email reminders at 7, 3, and 1 day before each important date.",
    },
  ];

  const CurrentIcon = steps[step].icon;

  const handleSkip = () => {
    router.push("/dashboard");
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setShowSampleUpload(true);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  if (showSampleUpload) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">Let&apos;s Create Your First Transaction</h2>
              <p className="text-muted-foreground mt-2">
                You can upload a real contract or try a sample one to see how GravMap works
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              <X className="h-4 w-4 mr-2" />
              Skip
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/dashboard/transactions/new">
              <Card className="p-6 hover:border-primary cursor-pointer transition-colors h-full">
                <Upload className="h-12 w-12 mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Upload Your Contract</h3>
                <p className="text-sm text-muted-foreground">
                  Have a real contract? Upload it and we&apos;ll extract all the details for you.
                </p>
              </Card>
            </Link>

            <Link href="/dashboard/transactions/new?sample=true">
              <Card className="p-6 hover:border-primary cursor-pointer transition-colors h-full bg-primary/5 border-primary">
                <Play className="h-12 w-12 mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Try Sample Contract</h3>
                <p className="text-sm text-muted-foreground">
                  No contract yet? Try our sample to see how the platform works with mock data.
                </p>
              </Card>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t text-center">
            <Button variant="ghost" onClick={handleSkip}>
              Skip for now, I&apos;ll explore on my own
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
      <Card className="max-w-2xl w-full p-8">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setStep(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === step ? "w-8 bg-primary" : "w-2 bg-muted hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <CurrentIcon className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-3">{steps[step].title}</h2>
          <p className="text-muted-foreground text-lg">{steps[step].description}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {step > 0 && (
              <Button variant="ghost" onClick={handlePrevious}>
                Back
              </Button>
            )}
            <Button variant="ghost" onClick={handleSkip}>
              Skip Tour
            </Button>
          </div>

          <Button onClick={handleNext} size="lg">
            {step === steps.length - 1 ? "Get Started" : "Next"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Skip link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Experienced user?{" "}
            <button onClick={handleSkip} className="text-primary hover:underline">
              Skip to dashboard
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}
