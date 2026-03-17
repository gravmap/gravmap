#!/bin/bash

# Stripe Product Creation Script for GravMap
# Run this after installing Stripe CLI and logging in with `stripe login`

echo "🚀 Creating GravMap products in Stripe..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Creating Starter Plan...${NC}"
STARTER_MONTHLY=$(stripe products create \
  --name="Starter" \
  --description="Perfect for solo agents" \
  --default-price-data[currency]=usd \
  --default-price-data[unit_amount]=4900 \
  --default-price-data[recurring][interval]=month \
  --metadata[tier]=starter \
  | grep -o 'price_[^"]*' | head -1)

echo -e "${GREEN}✓ Starter Monthly Price ID: ${STARTER_MONTHLY}${NC}"

STARTER_YEARLY=$(stripe prices create \
  --product=$(stripe products list --limit=1 --query="name:'Starter'" | grep -o 'prod_[^"]*' | head -1) \
  --currency=usd \
  --unit-amount=47000 \
  --recurring[interval]=year \
  | grep -o 'price_[^"]*' | head -1)

echo -e "${GREEN}✓ Starter Yearly Price ID: ${STARTER_YEARLY}${NC}"

echo -e "${BLUE}Creating Professional Plan...${NC}"
PRO_MONTHLY=$(stripe products create \
  --name="Professional" \
  --description="For producing agents" \
  --default-price-data[currency]=usd \
  --default-price-data[unit_amount]=9900 \
  --default-price-data[recurring][interval]=month \
  --metadata[tier]=professional \
  | grep -o 'price_[^"]*' | head -1)

echo -e "${GREEN}✓ Professional Monthly Price ID: ${PRO_MONTHLY}${NC}"

PRO_YEARLY=$(stripe prices create \
  --product=$(stripe products list --limit=1 --query="name:'Professional'" | grep -o 'prod_[^"]*' | head -1) \
  --currency=usd \
  --unit-amount=95000 \
  --recurring[interval]=year \
  | grep -o 'price_[^"]*' | head -1)

echo -e "${GREEN}✓ Professional Yearly Price ID: ${PRO_YEARLY}${NC}"

echo -e "${BLUE}Creating Team Plan...${NC}"
TEAM_MONTHLY=$(stripe products create \
  --name="Team" \
  --description="For growing teams" \
  --default-price-data[currency]=usd \
  --default-price-data[unit_amount]=19900 \
  --default-price-data[recurring][interval]=month \
  --metadata[tier]=team \
  | grep -o 'price_[^"]*' | head -1)

echo -e "${GREEN}✓ Team Monthly Price ID: ${TEAM_MONTHLY}${NC}"

TEAM_YEARLY=$(stripe prices create \
  --product=$(stripe products list --limit=1 --query="name:'Team'" | grep -o 'prod_[^"]*' | head -1) \
  --currency=usd \
  --unit-amount=191000 \
  --recurring[interval]=year \
  | grep -o 'price_[^"]*' | head -1)

echo -e "${GREEN}✓ Team Yearly Price ID: ${TEAM_YEARLY}${NC}"

echo ""
echo -e "${GREEN}✅ All products created successfully!${NC}"
echo ""
echo "Add these to your .env.local:"
echo ""
echo "NEXT_PUBLIC_STRIPE_PRICE_STARTER_MONTHLY=${STARTER_MONTHLY}"
echo "NEXT_PUBLIC_STRIPE_PRICE_STARTER_YEARLY=${STARTER_YEARLY}"
echo "NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_MONTHLY=${PRO_MONTHLY}"
echo "NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_YEARLY=${PRO_YEARLY}"
echo "NEXT_PUBLIC_STRIPE_PRICE_TEAM_MONTHLY=${TEAM_MONTHLY}"
echo "NEXT_PUBLIC_STRIPE_PRICE_TEAM_YEARLY=${TEAM_YEARLY}"
