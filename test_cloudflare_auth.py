#!/usr/bin/env python3
"""
Test Cloudflare API authentication and list available zones
This helps debug authentication issues before running full DNS updates
"""

import os
import requests
import json
import sys

def test_auth_with_bearer_token(email, api_token):
    """Test authentication using Bearer token format (for API tokens)"""
    print("🔐 Testing authentication with Bearer token format...")
    
    url = "https://api.cloudflare.com/client/v4/zones"
    headers = {
        "X-Auth-Email": email,
        "Authorization": f"Bearer {api_token}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.get(url, headers=headers)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if data["success"]:
                zones = data["result"]
                print(f"✅ Authentication successful! Found {len(zones)} zones:")
                for zone in zones:
                    print(f"  • {zone['name']} (ID: {zone['id'][:8]}...)")
                    
                # Look for mybenefitsvideos.com specifically
                target_zone = next((z for z in zones if z['name'] == 'mybenefitsvideos.com'), None)
                if target_zone:
                    print(f"🎯 Found target domain: mybenefitsvideos.com (ID: {target_zone['id']})")
                    return target_zone['id']
                else:
                    print("❌ mybenefitsvideos.com not found in available zones")
                    return None
            else:
                print(f"❌ API returned success=false: {data.get('errors', 'Unknown error')}")
                return None
        else:
            print(f"❌ HTTP Error {response.status_code}")
            try:
                error_data = response.json()
                print(f"Error details: {json.dumps(error_data, indent=2)}")
            except:
                print(f"Raw response: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Request failed: {e}")
        return None

def test_auth_with_global_key(email, api_key):
    """Test authentication using Global API Key format (legacy)"""
    print("🔐 Testing authentication with Global API Key format...")
    
    url = "https://api.cloudflare.com/client/v4/zones"
    headers = {
        "X-Auth-Email": email,
        "X-Auth-Key": api_key,
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.get(url, headers=headers)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            print("✅ Global API Key authentication successful!")
            return True
        else:
            print(f"❌ Global API Key authentication failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Request failed: {e}")
        return False

def get_current_dns_records(zone_id, email, api_token):
    """Get current DNS records for the domain"""
    print("📋 Getting current DNS records...")
    
    url = f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records"
    headers = {
        "X-Auth-Email": email,
        "Authorization": f"Bearer {api_token}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            if data["success"]:
                records = data["result"]
                a_records = [r for r in records if r["type"] == "A"]
                print(f"Current A records ({len(a_records)} found):")
                for record in a_records:
                    print(f"  • {record['name']} → {record['content']} (TTL: {record.get('ttl', 'auto')})")
                return a_records
        
        print(f"❌ Failed to get DNS records: {response.status_code}")
        return []
    except Exception as e:
        print(f"❌ Failed to get DNS records: {e}")
        return []

def main():
    print("🚀 Cloudflare Authentication Tester")
    print("=" * 50)
    
    # Try to get credentials from environment
    api_token = os.environ.get('CLOUDFLARE_API_TOKEN', '').strip()
    email = os.environ.get('CLOUDFLARE_EMAIL', '').strip()
    
    if not api_token or not email:
        print("❌ Missing credentials in environment variables")
        print("Please set CLOUDFLARE_API_TOKEN and CLOUDFLARE_EMAIL")
        print()
        print("You can set them temporarily like this:")
        print('export CLOUDFLARE_API_TOKEN="your_token_here"')
        print('export CLOUDFLARE_EMAIL="your_email_here"')
        print("python test_cloudflare_auth.py")
        return 1
    
    print(f"📧 Email: {email}")
    print(f"🔑 API Token: {api_token[:8]}...{api_token[-4:]} (length: {len(api_token)})")
    print()
    
    # Test Bearer token authentication (recommended for API tokens)
    zone_id = test_auth_with_bearer_token(email, api_token)
    
    if zone_id:
        print()
        # Get current DNS records
        current_records = get_current_dns_records(zone_id, email, api_token)
        
        print()
        print("🎯 Vercel target IPs:")
        print("  • 64.29.17.67")
        print("  • 216.198.79.67")
        
        print()
        print("✅ Authentication test completed successfully!")
        print("You can now run the DNS update with confidence.")
        return 0
    else:
        print()
        print("🔄 Trying Global API Key format as fallback...")
        if test_auth_with_global_key(email, api_token):
            print("⚠️  Global API Key works, but you should use API Token format in scripts")
        else:
            print("❌ Both authentication methods failed")
            
        print()
        print("🛠️  Troubleshooting steps:")
        print("1. Verify the API token has 'Zone:Read' and 'Zone:Edit' permissions")
        print("2. Check that the token is for the correct Cloudflare account")
        print("3. Ensure the domain 'mybenefitsvideos.com' is in your Cloudflare account")
        print("4. Try regenerating the API token if it's old")
        
        return 1

if __name__ == "__main__":
    sys.exit(main())