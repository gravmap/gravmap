import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calendar, 
  Bell, 
  FileText, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Sparkles 
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "GravMap - Never Miss a Real Estate Deadline Again",
  description: "AI-powered real estate transaction management. Automatically extract deadlines from contracts, track timelines, and get reminders. Stop juggling dates manually.",
  keywords: "real estate transaction management, contract deadline tracker, real estate CRM, AI contract extraction, closing date tracker, real estate agent tools",
  openGraph: {
    title: "GravMap - Never Miss a Real Estate Deadline Again",
    description: "AI-powered real estate transaction management. Automatically extract deadlines from contracts and get reminders.",
    url: "https://gravmap.com",
    siteName: "GravMap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GravMap - Never Miss a Real Estate Deadline Again",
    description: "AI-powered real estate transaction management. Automatically extract deadlines from contracts and get reminders.",
  },
};

const features = [
  {
    icon: FileText,
    title: "AI Contract Extraction",
    description: "Upload your purchase agreement and our AI extracts all dates, parties, and deadlines automatically. No manual data entry.",
  },
  {
    icon: Calendar,
    title: "Smart Timeline Tracking",
    description: "See all your deadlines in one beautiful timeline. Know exactly what's due and when, across all your transactions.",
  },
  {
    icon: Bell,
    title: "Intelligent Reminders",
    description: "Get email reminders at 7, 3, and 1 day before each deadline. Customize the schedule to fit your workflow.",
  },
  {
    icon: Clock,
    title: "Save Hours Every Week",
    description: "Stop manually tracking dates in spreadsheets. Let GravMap handle the details so you can focus on closing deals.",
  },
];

const benefits = [
  "Never miss another deadline",
  "Reduce manual data entry by 90%",
  "Get paid faster with on-time closings",
  "Impress clients with proactive updates",
  "Handle more transactions with less stress",
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              AI-Powered Real Estate Transaction Management
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Never Miss a{" "}
              <span className="text-primary">Deadline</span>{" "}
              Again
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Upload your contracts and let AI extract all the important dates. Track deadlines, 
              get reminders, and close deals on time, every time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  See Demo
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • Free 14-day trial
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="py-8 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm md:text-base">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything You Need to Close Deals on Time
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built by real estate professionals, for real estate professionals. 
              Stop managing deadlines in your head or messy spreadsheets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="p-6 border-2 hover:border-primary transition-colors">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in less than 5 minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Upload Your Contract",
                description: "Drag and drop your purchase agreement. Our AI reads and extracts all the important information.",
              },
              {
                step: "2",
                title: "Review & Confirm",
                description: "Quickly review the extracted dates and details. Make any edits needed, then confirm.",
              },
              {
                step: "3",
                title: "Track & Remind",
                description: "Your timeline is ready. Get automatic reminders before each deadline arrives.",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Trusted by Real Estate Professionals
            </h2>
            <p className="text-lg text-muted-foreground">
              Join hundreds of agents who&apos;ve simplified their workflow
            </p>
          </div>

          {/* Placeholder for testimonials */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: "GravMap has saved me hours every week. I used to track deadlines manually - never again!",
                author: "Sarah M.",
                role: "Real Estate Agent, 15 years",
                avatar: "S",
              },
              {
                quote: "The AI extraction is incredibly accurate. It caught dates I would have missed.",
                author: "Michael T.",
                role: "Broker, Team Lead",
                avatar: "M",
              },
              {
                quote: "My clients are impressed when I proactively update them on every milestone.",
                author: "Jennifer K.",
                role: "Buyer's Agent",
                avatar: "J",
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-6">
                <p className="text-sm mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "500+", label: "Active Users" },
              { value: "2,500+", label: "Transactions Tracked" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9/5", label: "User Rating" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start free, upgrade when you&apos;re ready
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 text-left">
                <h3 className="font-semibold text-lg mb-2">Free</h3>
                <div className="text-3xl font-bold mb-2">$0<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                <p className="text-sm text-muted-foreground mb-4">Perfect for getting started</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    3 active transactions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    AI extraction
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Email reminders
                  </li>
                </ul>
              </Card>

              <Card className="p-6 text-left border-primary border-2">
                <div className="inline-block px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded mb-2">
                  POPULAR
                </div>
                <h3 className="font-semibold text-lg mb-2">Pro</h3>
                <div className="text-3xl font-bold mb-2">$29<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                <p className="text-sm text-muted-foreground mb-4">For busy professionals</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Unlimited transactions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Export to PDF/CSV
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Custom reminders
                  </li>
                </ul>
              </Card>
            </div>

            <Link href="/pricing">
              <Button size="lg" variant="outline">
                See Full Pricing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Stop Worrying About Deadlines?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join hundreds of real estate professionals who trust GravMap to keep their transactions on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/help">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Learn More
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
