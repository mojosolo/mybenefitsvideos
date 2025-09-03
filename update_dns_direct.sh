#!/bin/bash

# Direct DNS update script using Cloudflare API
# Usage: ./update_dns_direct.sh <CLOUDFLARE_API_TOKEN> <CLOUDFLARE_EMAIL>

set -e

API_TOKEN="$1"
EMAIL="$2"
DOMAIN="mybenefitsvideos.com"
NEW_IP="76.76.21.21"

if [ -z "$API_TOKEN" ] || [ -z "$EMAIL" ]; then
    echo "❌ Usage: $0 <CLOUDFLARE_API_TOKEN> <CLOUDFLARE_EMAIL>"
    echo ""
    echo "You can find these credentials in:"
    echo "- GitHub organization secrets (Mojo-Solo): CLOUDFLARE_API_TOKEN, CLOUDFLARE_EMAIL"
    echo "- Cloudflare dashboard -> My Profile -> API Tokens"
    exit 1
fi

echo "=== Cloudflare DNS Update ==="
echo "Domain: $DOMAIN"
echo "Target IP: $NEW_IP"
echo "Email: $EMAIL"
echo ""

# Get zone ID
echo "🔍 Getting zone ID for $DOMAIN..."
ZONE_RESPONSE=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=$DOMAIN" \
    -H "X-Auth-Email: $EMAIL" \
    -H "Authorization: Bearer $API_TOKEN" \
    -H "Content-Type: application/json")

ZONE_ID=$(echo "$ZONE_RESPONSE" | jq -r '.result[0].id // empty')

if [ -z "$ZONE_ID" ]; then
    echo "❌ Could not find zone for $DOMAIN"
    echo "API Response: $ZONE_RESPONSE"
    exit 1
fi

echo "✅ Zone ID: $ZONE_ID"

# Get current A records
echo ""
echo "📋 Getting current A records..."
RECORDS_RESPONSE=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?type=A&name=$DOMAIN" \
    -H "X-Auth-Email: $EMAIL" \
    -H "Authorization: Bearer $API_TOKEN" \
    -H "Content-Type: application/json")

RECORDS=$(echo "$RECORDS_RESPONSE" | jq -r '.result[]')

if [ -z "$RECORDS" ]; then
    echo "❌ No A records found for $DOMAIN"
    echo "API Response: $RECORDS_RESPONSE"
    exit 1
fi

echo "Found A records:"
echo "$RECORDS_RESPONSE" | jq -r '.result[] | "  • \(.name) → \(.content) (ID: \(.id[0:8])...)"'

# Update each A record
echo ""
echo "🔄 Updating A records to $NEW_IP..."
SUCCESS_COUNT=0
TOTAL_COUNT=0

while IFS= read -r RECORD; do
    if [ -z "$RECORD" ]; then continue; fi
    
    RECORD_ID=$(echo "$RECORD" | jq -r '.id')
    CURRENT_IP=$(echo "$RECORD" | jq -r '.content')
    RECORD_NAME=$(echo "$RECORD" | jq -r '.name')
    TTL=$(echo "$RECORD" | jq -r '.ttl')
    
    TOTAL_COUNT=$((TOTAL_COUNT + 1))
    
    if [ "$CURRENT_IP" = "$NEW_IP" ]; then
        echo "  ✅ $RECORD_NAME already points to $NEW_IP"
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
        continue
    fi
    
    echo "  🔄 Updating $RECORD_NAME from $CURRENT_IP to $NEW_IP..."
    
    UPDATE_DATA=$(jq -n \
        --arg type "A" \
        --arg name "$RECORD_NAME" \
        --arg content "$NEW_IP" \
        --argjson ttl "$TTL" \
        '{type: $type, name: $name, content: $content, ttl: $ttl}')
    
    UPDATE_RESPONSE=$(curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
        -H "X-Auth-Email: $EMAIL" \
        -H "Authorization: Bearer $API_TOKEN" \
        -H "Content-Type: application/json" \
        -d "$UPDATE_DATA")
    
    SUCCESS=$(echo "$UPDATE_RESPONSE" | jq -r '.success')
    
    if [ "$SUCCESS" = "true" ]; then
        echo "    ✅ Successfully updated!"
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    else
        echo "    ❌ Failed to update"
        echo "    Error: $(echo "$UPDATE_RESPONSE" | jq -r '.errors[]?.message // "Unknown error"')"
    fi
    
done <<< "$(echo "$RECORDS_RESPONSE" | jq -c '.result[]')"

echo ""
echo "=== Results ==="
echo "✅ Successfully updated: $SUCCESS_COUNT/$TOTAL_COUNT records"

if [ $SUCCESS_COUNT -eq $TOTAL_COUNT ]; then
    echo "🎉 All DNS records for $DOMAIN now point to $NEW_IP"
    echo ""
    echo "⏰ DNS changes typically take 1-5 minutes to propagate globally"
    echo "🔍 You can verify with: dig +short $DOMAIN"
    
    # Quick verification
    echo ""
    echo "🔍 Quick DNS check:"
    dig +short $DOMAIN 2>/dev/null || echo "  (dig not available)"
    
    exit 0
else
    echo "❌ Some records failed to update"
    exit 1
fi