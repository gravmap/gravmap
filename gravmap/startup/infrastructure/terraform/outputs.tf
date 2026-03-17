# Outputs for Gravmap Infrastructure

output "deployment_info" {
  value = {
    project_id      = vercel_project.gravmap.id
    project_name    = vercel_project.gravmap.name
    deployment_url  = "https://${vercel_project.gravmap.name}.vercel.app"
    environment     = var.environment
  }
  description = "Deployment information"
}

output "configuration_summary" {
  value = {
    supabase_project = var.supabase_project_ref
    stripe_configured = var.stripe_secret_key != ""
    email_configured  = var.resend_api_key != ""
    ai_configured     = var.openai_api_key != ""
  }
  description = "Configuration status summary"
}

output "next_steps" {
  value = <<EOT
    🎉 Infrastructure deployed successfully!

    Next steps:
    1. Configure your custom domain (if applicable)
    2. Set up Stripe webhooks pointing to: ${var.app_url}/api/stripe/webhook
    3. Configure email domain in Resend
    4. Run database migrations
    5. Test the deployment

    Documentation:
    - /startup/infrastructure/docs/DEPLOYMENT.md
    - /startup/infrastructure/docs/MONITORING.md
  EOT
  description = "Next steps after deployment"
}
