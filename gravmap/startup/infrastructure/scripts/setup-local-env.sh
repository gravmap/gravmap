#!/bin/bash
# Setup script for local development environment
# Usage: ./setup-local-env.sh

set -e

echo "🚀 Setting up Gravmap local development environment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo -e "${YELLOW}Warning: .env.local already exists${NC}"
    read -p "Do you want to overwrite it? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 1
    fi
    # Backup existing file
    cp .env.local ".env.local.backup.$(date +%Y%m%d_%H%M%S)"
    echo -e "${GREEN}✓ Backed up existing .env.local${NC}"
fi

# Copy example file
if [ -f ".env.local.example" ]; then
    cp .env.local.example .env.local
    echo -e "${GREEN}✓ Created .env.local from example${NC}"
else
    echo -e "${RED}✗ .env.local.example not found${NC}"
    exit 1
fi

# Check required tools
echo ""
echo "Checking required tools..."

check_tool() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓ $1 is installed${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠ $1 is not installed${NC}"
        return 1
    fi
}

# Check Node.js
if check_tool node; then
    NODE_VERSION=$(node -v)
    echo "  Version: $NODE_VERSION"
fi

# Check npm
if check_tool npm; then
    NPM_VERSION=$(npm -v)
    echo "  Version: $NPM_VERSION"
fi

# Check Supabase CLI (optional)
check_tool supabase

# Install dependencies
echo ""
read -p "Do you want to install npm dependencies? (Y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    echo "Installing dependencies..."
    npm install
    echo -e "${GREEN}✓ Dependencies installed${NC}"
fi

# Interactive environment variable setup
echo ""
echo "========================================="
echo "Environment Variable Setup"
echo "========================================="
echo ""
echo "Please provide the following values (press Enter to skip optional ones):"
echo ""

# Supabase
echo "--- Supabase Configuration ---"
read -p "Supabase Project URL: " SUPABASE_URL
read -p "Supabase Anon Key: " SUPABASE_ANON_KEY
read -p "Supabase Service Role Key: " SUPABASE_SERVICE_KEY

if [ ! -z "$SUPABASE_URL" ]; then
    sed -i "s|https://your-project-id.supabase.co|$SUPABASE_URL|g" .env.local
fi
if [ ! -z "$SUPABASE_ANON_KEY" ]; then
    sed -i "s|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.\.\.|$SUPABASE_ANON_KEY|g" .env.local
fi
if [ ! -z "$SUPABASE_SERVICE_KEY" ]; then
    sed -i "s|SUPABASE_SERVICE_ROLE_KEY=.*|SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_KEY|g" .env.local
fi

# OpenAI
echo ""
echo "--- OpenAI Configuration ---"
read -p "OpenAI API Key: " OPENAI_KEY
if [ ! -z "$OPENAI_KEY" ]; then
    sed -i "s|sk-proj-xxxxx|$OPENAI_KEY|g" .env.local
fi

# Stripe (optional for development)
echo ""
echo "--- Stripe Configuration (Optional for Development) ---"
read -p "Stripe Publishable Key: " STRIPE_PUB
read -p "Stripe Secret Key: " STRIPE_SECRET
if [ ! -z "$STRIPE_PUB" ]; then
    sed -i "s|pk_test_xxxxx|$STRIPE_PUB|g" .env.local
fi
if [ ! -z "$STRIPE_SECRET" ]; then
    sed -i "s|sk_test_xxxxx|$STRIPE_SECRET|g" .env.local
fi

# Generate random cron secret
CRON_SECRET=$(openssl rand -base64 32)
sed -i "s|your-random-secret-here-change-this|$CRON_SECRET|g" .env.local
echo -e "${GREEN}✓ Generated CRON_SECRET${NC}"

# Setup git hooks
echo ""
read -p "Do you want to setup git hooks for linting? (Y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    # Create pre-commit hook
    mkdir -p .git/hooks
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# Pre-commit hook to run linter
npm run lint
EOF
    chmod +x .git/hooks/pre-commit
    echo -e "${GREEN}✓ Git hooks installed${NC}"
fi

# Summary
echo ""
echo "========================================="
echo -e "${GREEN}✅ Local setup complete!${NC}"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Review and update .env.local with any missing values"
echo "2. Run database migrations: npm run db:migrate (if configured)"
echo "3. Start development server: npm run dev"
echo ""
echo "Documentation:"
echo "- README.md for project overview"
echo "- .env.local.example for all available variables"
echo ""
