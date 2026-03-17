# Terraform Variables for Gravmap Infrastructure
# Copy this to terraform.tfvars and fill in your values

variable "vercel_api_token" {
  description = "Vercel API token"
  type        = string
  sensitive   = true
}

variable "vercel_team_id" {
  description = "Vercel team ID (optional, leave empty for personal account)"
  type        = string
  default     = ""
}

variable "vercel_project_name" {
  description = "Name of the Vercel project"
  type        = string
  default     = "gravmap"
}

variable "supabase_project_ref" {
  description = "Supabase project reference ID"
  type        = string
}

variable "supabase_url" {
  description = "Supabase project URL"
  type        = string
}

variable "supabase_anon_key" {
  description = "Supabase anonymous key"
  type        = string
  sensitive   = true
}

variable "supabase_service_role_key" {
  description = "Supabase service role key"
  type        = string
  sensitive   = true
}

variable "openai_api_key" {
  description = "OpenAI API key"
  type        = string
  sensitive   = true
}

variable "stripe_publishable_key" {
  description = "Stripe publishable key"
  type        = string
}

variable "stripe_secret_key" {
  description = "Stripe secret key"
  type        = string
  sensitive   = true
}

variable "stripe_webhook_secret" {
  description = "Stripe webhook signing secret"
  type        = string
  sensitive   = true
}

variable "stripe_price_free" {
  description = "Stripe price ID for free tier"
  type        = string
  default     = ""
}

variable "stripe_price_pro_monthly" {
  description = "Stripe price ID for Pro monthly plan"
  type        = string
}

variable "stripe_price_pro_yearly" {
  description = "Stripe price ID for Pro yearly plan"
  type        = string
  default     = ""
}

variable "resend_api_key" {
  description = "Resend API key for emails"
  type        = string
  sensitive   = true
  default     = ""
}

variable "email_from" {
  description = "Email sender address"
  type        = string
  default     = "noreply@example.com"
}

variable "cron_secret" {
  description = "Secret for cron job authorization"
  type        = string
  sensitive   = true
}

variable "app_url" {
  description = "Application URL"
  type        = string
}

variable "sentry_dsn" {
  description = "Sentry DSN for error tracking"
  type        = string
  default     = ""
}

variable "environment" {
  description = "Environment (staging/production)"
  type        = string
  default     = "production"
}
