#!/bin/bash

echo "🔐 GitHub Secrets Update Script for Cloudflare DNS"
echo "=================================================="

echo ""
echo "Current status of GitHub organization secrets:"
echo "CLOUDFLARE_API_TOKEN: placeholder detected (temp_clo...lder)"
echo "CLOUDFLARE_EMAIL: placeholder detected"
echo ""

echo "⚠️  IMPORTANT: You need REAL Cloudflare credentials to fix DNS automation"
echo ""
echo "📋 Steps to get real credentials:"
echo "1. Go to: https://dash.cloudflare.com/profile/api-tokens"
echo "2. Create Custom Token with permissions:"
echo "   - Zone:Read for mybenefitsvideos.com" 
echo "   - Zone:Edit for mybenefitsvideos.com"
echo "3. Get your Cloudflare account email"
echo ""

read -p "Do you have your real Cloudflare credentials ready? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Please get your real Cloudflare credentials first, then run this script again."
    exit 1
fi

echo ""
echo "🔐 Please enter your REAL Cloudflare credentials:"
echo ""

read -p "Cloudflare Email: " CLOUDFLARE_EMAIL
if [[ -z "$CLOUDFLARE_EMAIL" ]]; then
    echo "❌ Email cannot be empty"
    exit 1
fi

read -p "Cloudflare API Token: " -s CLOUDFLARE_API_TOKEN
echo
if [[ -z "$CLOUDFLARE_API_TOKEN" ]]; then
    echo "❌ API Token cannot be empty"
    exit 1
fi

echo ""
echo "📤 Updating GitHub organization secrets..."

# Update the secrets
if gh secret set CLOUDFLARE_EMAIL --org Mojo-Solo --body "$CLOUDFLARE_EMAIL"; then
    echo "✅ CLOUDFLARE_EMAIL updated successfully"
else
    echo "❌ Failed to update CLOUDFLARE_EMAIL"
    exit 1
fi

if gh secret set CLOUDFLARE_API_TOKEN --org Mojo-Solo --body "$CLOUDFLARE_API_TOKEN"; then
    echo "✅ CLOUDFLARE_API_TOKEN updated successfully"
else
    echo "❌ Failed to update CLOUDFLARE_API_TOKEN"  
    exit 1
fi

echo ""
echo "🧪 Testing authentication with new credentials..."

# Set environment variables for local test
export CLOUDFLARE_EMAIL="$CLOUDFLARE_EMAIL"
export CLOUDFLARE_API_TOKEN="$CLOUDFLARE_API_TOKEN"

# Run local authentication test
if python test_cloudflare_auth.py; then
    echo ""
    echo "🎉 SUCCESS! Authentication test passed with real credentials"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Run DNS update workflow:"
    echo "   gh workflow run 'Update DNS Records for mybenefitsvideos.com' --repo mojosolo/mybenefitsvideos -f target_ip='64.29.17.67'"
    echo ""
    echo "2. Or run locally:"
    echo "   python update_dns.py"
    echo ""
    echo "3. Verify results:"
    echo "   dig +short mybenefitsvideos.com"
else
    echo ""
    echo "❌ Authentication test failed. Please check your credentials and try again."
    echo "   - Verify the API token has Zone:Read and Zone:Edit permissions"
    echo "   - Ensure mybenefitsvideos.com is in your Cloudflare account"  
    echo "   - Try regenerating the API token if needed"
    exit 1
fi