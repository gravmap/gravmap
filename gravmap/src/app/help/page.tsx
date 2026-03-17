import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Book, FileText, Bell, CreditCard, Wrench } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "Getting Started",
    icon: Book,
    articles: [
      { title: "Getting Started with GravMap", slug: "getting-started", description: "Learn the basics of GravMap and how to set up your account" },
      { title: "Uploading Your First Contract", slug: "uploading-first-contract", description: "Step-by-step guide to uploading and extracting data from your first contract" },
    ],
  },
  {
    title: "Core Features",
    icon: FileText,
    articles: [
      { title: "Understanding AI Extraction", slug: "understanding-ai-extraction", description: "How our AI extracts dates and details from your contracts" },
      { title: "Managing Your Timeline", slug: "managing-timeline", description: "Track deadlines, update status, and keep everything organized" },
    ],
  },
  {
    title: "Notifications & Team",
    icon: Bell,
    articles: [
      { title: "Setting Up Notifications", slug: "setting-up-notifications", description: "Configure email reminders and stay on top of deadlines" },
      { title: "Adding Team Members", slug: "adding-team-members", description: "Collaborate with your team on transactions" },
    ],
  },
  {
    title: "Billing & Support",
    icon: CreditCard,
    articles: [
      { title: "Billing & Subscription", slug: "billing-subscription", description: "Manage your subscription, view invoices, and upgrade plans" },
      { title: "Troubleshooting Common Issues", slug: "troubleshooting", description: "Solutions to common problems and how to get help" },
    ],
  },
];

export const metadata = {
  title: "Help Center - GravMap",
  description: "Find answers to common questions and learn how to use GravMap effectively",
};

export default function HelpPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find answers to common questions and learn how to make the most of GravMap
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { q: "How does the AI extraction work?", a: "Our AI analyzes your contract document and automatically identifies key dates, parties, and deadlines." },
              { q: "Can I edit extracted data?", a: "Yes! You can review and edit all extracted information before confirming it." },
              { q: "How many transactions can I create?", a: "Free plan includes 3 transactions. Pro plan includes unlimited transactions." },
              { q: "Can I upload scanned PDFs?", a: "Yes, our AI works with both digital and scanned PDFs." },
              { q: "How do email reminders work?", a: "You&apos;ll receive reminders at 7, 3, and 1 day before each deadline. You can customize this in settings." },
              { q: "Is my data secure?", a: "Yes, we use industry-standard encryption and secure cloud storage. Your documents are encrypted at rest and in transit." },
            ].map((faq, idx) => (
              <Card key={idx} className="p-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Articles by Category */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Help Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <Card key={category.title} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <CategoryIcon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {category.articles.map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={`/help/${article.slug}`}
                          className="block hover:bg-muted/50 -mx-3 px-3 py-2 rounded transition-colors"
                        >
                          <div className="font-medium text-sm">{article.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {article.description}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto p-8">
            <Wrench className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Need More Help?</h2>
            <p className="text-muted-foreground mb-6">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@gravmap.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90"
              >
                Contact Support
              </a>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 border border-input text-base font-medium rounded-md hover:bg-accent"
              >
                Back to Dashboard
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
