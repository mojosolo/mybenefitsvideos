#!/bin/bash

# Direct DNS update using GitHub CLI to access org secrets
set -e

echo "🚀 MyBenefitsVideos DNS Direct Fix"
echo "=================================="

# Check if gh CLI is available
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is required but not installed"
    exit 1
fi

# Try to get secrets from GitHub org
echo "🔍 Getting Cloudflare credentials from GitHub org secrets..."

# Create a temporary GitHub workflow to access secrets
TEMP_WORKFLOW="dns-fix-$(date +%s).yml"
cat > .github/workflows/$TEMP_WORKFLOW << 'EOF'
name: DNS Fix Direct
on:
  workflow_dispatch:
    inputs:
      target_type:
        description: 'Target (vercel or custom)'
        required: true
        default: 'vercel'
      target_ip:
        description: 'Custom IP (if not using vercel)'
        required: false

jobs:
  fix-dns:
    runs-on: ubuntu-latest
    steps:
      - name: Fix DNS Records
        run: |
          echo "🚀 Starting direct DNS fix for mybenefitsvideos.com"
          echo "Mode: ${{ github.event.inputs.target_type }}"
          
          # Determine target IPs based on mode
          if [ "${{ github.event.inputs.target_type }}" = "vercel" ]; then
            # Use current Vercel deployment IPs
            TARGET_IPS="216.198.79.67 64.29.17.67"
            echo "🎯 Targeting Vercel IPs: $TARGET_IPS"
          else
            TARGET_IPS="${{ github.event.inputs.target_ip }}"
            echo "🎯 Targeting custom IP: $TARGET_IPS"
          fi
          
          # Test API access first
          echo "🔑 Testing Cloudflare API access..."
          AUTH_TEST=$(curl -s -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
            -H "Authorization: Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}" \
            -H "Content-Type: application/json")
          
          echo "Auth test result:"
          echo "$AUTH_TEST" | jq '.'
          
          SUCCESS=$(echo "$AUTH_TEST" | jq -r '.success')
          if [ "$SUCCESS" != "true" ]; then
            echo "❌ API token validation failed"
            exit 1
          fi
          
          echo "✅ API token is valid!"
          
          # Get all zones
          echo "🔍 Listing all zones to find mybenefitsvideos.com..."
          ZONES_RESPONSE=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones" \
            -H "Authorization: Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}" \
            -H "Content-Type: application/json")
          
          echo "Available zones:"
          echo "$ZONES_RESPONSE" | jq -r '.result[]? | "  • \(.name) (ID: \(.id))"'
          
          # Look for the zone (might be under different name)
          ZONE_ID=$(echo "$ZONES_RESPONSE" | jq -r '.result[]? | select(.name == "mybenefitsvideos.com" or .name == "*.mybenefitsvideos.com") | .id' | head -1)
          
          if [ -z "$ZONE_ID" ]; then
            echo "❌ Cannot find zone for mybenefitsvideos.com"
            echo "Available zones are listed above"
            exit 1
          fi
          
          echo "✅ Found zone ID: $ZONE_ID"
          
          # Get current A records
          echo "📋 Current A records:"
          RECORDS_RESPONSE=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?type=A" \
            -H "Authorization: Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}" \
            -H "Content-Type: application/json")
          
          echo "$RECORDS_RESPONSE" | jq -r '.result[]? | "  • \(.name) → \(.content) (TTL: \(.ttl))"'
          
          # For Vercel deployment, update @ record to first IP and add/update www to second IP
          if [ "${{ github.event.inputs.target_type }}" = "vercel" ]; then
            # Update root domain (@) to first Vercel IP
            ROOT_RECORD_ID=$(echo "$RECORDS_RESPONSE" | jq -r '.result[]? | select(.name == "mybenefitsvideos.com") | .id' | head -1)
            if [ -n "$ROOT_RECORD_ID" ]; then
              echo "🔄 Updating root domain to 216.198.79.67..."
              UPDATE_DATA='{"type":"A","name":"mybenefitsvideos.com","content":"216.198.79.67","ttl":300}'
              curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$ROOT_RECORD_ID" \
                -H "Authorization: Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}" \
                -H "Content-Type: application/json" \
                -d "$UPDATE_DATA" | jq '.success'
            fi
            
            # Update www subdomain to second Vercel IP
            WWW_RECORD_ID=$(echo "$RECORDS_RESPONSE" | jq -r '.result[]? | select(.name == "www.mybenefitsvideos.com") | .id' | head -1)
            if [ -n "$WWW_RECORD_ID" ]; then
              echo "🔄 Updating www subdomain to 64.29.17.67..."
              UPDATE_DATA='{"type":"A","name":"www.mybenefitsvideos.com","content":"64.29.17.67","ttl":300}'
              curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$WWW_RECORD_ID" \
                -H "Authorization: Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}" \
                -H "Content-Type: application/json" \
                -d "$UPDATE_DATA" | jq '.success'
            fi
          fi
          
          echo "🎉 DNS update completed!"
          echo "⏰ Changes will propagate in 1-5 minutes"
EOF

echo "📤 Pushing temporary workflow..."
git add .github/workflows/$TEMP_WORKFLOW
git commit -m "temp: add direct DNS fix workflow"
git push origin main

echo "🚀 Running DNS fix workflow..."
gh workflow run $TEMP_WORKFLOW --field target_type=vercel

echo "⏳ Waiting for workflow to complete..."
sleep 10

# Check workflow status
LATEST_RUN=$(gh run list --workflow=$TEMP_WORKFLOW --limit=1 --json status,conclusion,url | jq -r '.[0]')
STATUS=$(echo "$LATEST_RUN" | jq -r '.status')
CONCLUSION=$(echo "$LATEST_RUN" | jq -r '.conclusion')
URL=$(echo "$LATEST_RUN" | jq -r '.url')

echo "Workflow status: $STATUS"
echo "Workflow conclusion: $CONCLUSION"
echo "View details: $URL"

# Clean up temporary workflow
echo "🧹 Cleaning up temporary workflow..."
git rm .github/workflows/$TEMP_WORKFLOW
git commit -m "cleanup: remove temporary DNS fix workflow"
git push origin main

if [ "$CONCLUSION" = "success" ]; then
    echo "✅ DNS fix completed successfully!"
    echo "🌐 Check https://mybenefitsvideos.com in a few minutes"
else
    echo "❌ DNS fix workflow failed. Check the workflow logs above."
    exit 1
fi