terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 1.0"
    }
  }

  # Backend configuration for storing state
  # Uncomment and configure based on your preference:
  # backend "local" {
  #   path = "terraform.tfstate"
  # }
  # OR use remote state (recommended):
  # backend "s3" {
  #   bucket = "your-terraform-state-bucket"
  #   key    = "gravmap/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

provider "vercel" {
  api_token = var.vercel_api_token
  team_id   = var.vercel_team_id != "" ? var.vercel_team_id : null
}

# Vercel Project
resource "vercel_project" "gravmap" {
  name      = var.vercel_project_name
  framework = "nextjs"

  # Git repository (uncomment and configure)
  # git_repository = {
  #   type              = "github"
  #   repo              = "yourusername/gravmap"
  #   production_branch = "main"
  # }

  # Root directory (if not at repository root)
  # root_directory = "."

  # Build command
  build_command    = "npm run build"
  output_directory = ".next"

  # Install command
  install_command = "npm install"

  # Environment variables
  environment = [
    {
      key    = "NEXT_PUBLIC_SUPABASE_URL"
      value  = var.supabase_url
      target = ["production", "preview"]
    },
    {
      key    = "NEXT_PUBLIC_SUPABASE_ANON_KEY"
      value  = var.supabase_anon_key
      target = ["production", "preview"]
    },
    {
      key    = "SUPABASE_SERVICE_ROLE_KEY"
      value  = var.supabase_service_role_key
      target = ["production", "preview"]
    },
    {
      key    = "NEXT_PUBLIC_APP_URL"
      value  = var.app_url
      target = ["production", "preview"]
    },
    {
      key    = "OPENAI_API_KEY"
      value  = var.openai_api_key
      target = ["production", "preview"]
    },
    {
      key    = "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
      value  = var.stripe_publishable_key
      target = ["production", "preview"]
    },
    {
      key    = "STRIPE_SECRET_KEY"
      value  = var.stripe_secret_key
      target = ["production", "preview"]
    },
    {
      key    = "STRIPE_WEBHOOK_SECRET"
      value  = var.stripe_webhook_secret
      target = ["production", "preview"]
    },
    {
      key    = "NEXT_PUBLIC_STRIPE_PRICE_FREE"
      value  = var.stripe_price_free
      target = ["production", "preview"]
    },
    {
      key    = "NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY"
      value  = var.stripe_price_pro_monthly
      target = ["production", "preview"]
    },
    {
      key    = "NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY"
      value  = var.stripe_price_pro_yearly
      target = ["production", "preview"]
    },
    {
      key    = "RESEND_API_KEY"
      value  = var.resend_api_key
      target = ["production", "preview"]
    },
    {
      key    = "EMAIL_FROM"
      value  = var.email_from
      target = ["production", "preview"]
    },
    {
      key    = "CRON_SECRET"
      value  = var.cron_secret
      target = ["production", "preview"]
    },
    {
      key    = "NODE_ENV"
      value  = "production"
      target = ["production"]
    }
  ]

  # Sensitivity settings (secrets won't be shown in Vercel dashboard)
  environment_sensitive = [
    "SUPABASE_SERVICE_ROLE_KEY",
    "OPENAI_API_KEY",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "RESEND_API_KEY",
    "CRON_SECRET"
  ]
}

# Custom domain (configure as needed)
# resource "vercel_project_domain" "gravmap" {
#   project_id = vercel_project.gravmap.id
#   domain     = "gravmap.com"
# }

# Output project details
output "project_id" {
  value = vercel_project.gravmap.id
}

output "project_name" {
  value = vercel_project.gravmap.name
}

output "vercel_url" {
  value = "https://${vercel_project.gravmap.name}.vercel.app"
}
