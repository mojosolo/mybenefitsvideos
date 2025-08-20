#!/usr/bin/env python3
"""
Update DNS records for mybenefitsvideos.com using Cloudflare API
This version runs locally and prompts for credentials if not in env
"""

import os
import json
import subprocess
import requests
import sys
import getpass

def get_cloudflare_credentials():
    """Get Cloudflare credentials from various sources"""
    api_token = os.environ.get('CLOUDFLARE_API_TOKEN')
    email = os.environ.get('CLOUDFLARE_EMAIL')
    
    # Try to get from Vercel if available
    if not api_token and os.path.exists('.env.local'):
        try:
            with open('.env.local', 'r') as f:
                for line in f:
                    if line.startswith('CLOUDFLARE_API_TOKEN='):
                        api_token = line.split('=', 1)[1].strip()
                    elif line.startswith('CLOUDFLARE_EMAIL='):
                        email = line.split('=', 1)[1].strip()
        except:
            pass
    
    # If still not found, provide instructions
    if not api_token or not email:
        print("Cloudflare credentials not found in environment variables.")
        print("\nBased on the GitHub secrets I can see, you have:")
        print("- CLOUDFLARE_API_TOKEN")
        print("- CLOUDFLARE_EMAIL")
        print("\nTo get these values:")
        print("1. Go to Cloudflare dashboard -> My Profile -> API Tokens")
        print("2. Or ask the user to provide them since they're in GitHub org secrets")
        print("\nManual entry (will be hidden):")
        
        if not api_token:
            api_token = getpass.getpass("Enter CLOUDFLARE_API_TOKEN: ")
        if not email:
            email = input("Enter CLOUDFLARE_EMAIL: ")
    
    return api_token, email

def get_zone_id(domain, email, api_token):
    """Get the Cloudflare zone ID for a domain"""
    url = "https://api.cloudflare.com/client/v4/zones"
    headers = {
        "X-Auth-Email": email,
        "Authorization": f"Bearer {api_token}",
        "Content-Type": "application/json"
    }
    
    params = {"name": domain}
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code != 200:
        print(f"Failed to get zone info: {response.status_code} - {response.text}")
        return None
        
    data = response.json()
    if not data["success"] or not data["result"]:
        print(f"No zone found for domain {domain}")
        return None
        
    return data["result"][0]["id"]

def list_dns_records(zone_id, email, api_token):
    """List all DNS records for a zone"""
    url = f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records"
    headers = {
        "X-Auth-Email": email,
        "Authorization": f"Bearer {api_token}",
        "Content-Type": "application/json"
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"Failed to list DNS records: {response.status_code} - {response.text}")
        return []
        
    data = response.json()
    if data["success"]:
        return data["result"]
    else:
        print(f"API error: {data['errors']}")
        return []

def update_dns_record(zone_id, record_id, record_data, email, api_token):
    """Update a DNS record"""
    url = f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records/{record_id}"
    headers = {
        "X-Auth-Email": email,
        "Authorization": f"Bearer {api_token}",
        "Content-Type": "application/json"
    }
    
    response = requests.put(url, headers=headers, json=record_data)
    
    if response.status_code != 200:
        print(f"Failed to update DNS record: {response.status_code} - {response.text}")
        return False
        
    data = response.json()
    if not data["success"]:
        print(f"API error updating record: {data.get('errors', 'Unknown error')}")
        return False
        
    return True

def main():
    domain = "mybenefitsvideos.com"
    new_ip = "76.76.21.21"
    
    print(f"=== Cloudflare DNS Update Tool ===")
    print(f"Domain: {domain}")
    print(f"Target IP: {new_ip}")
    print(f"Current IPs to replace: 172.67.133.77, 104.21.13.221, 67.205.149.138")
    print()
    
    # Get credentials
    api_token, email = get_cloudflare_credentials()
    if not api_token or not email:
        print("❌ Could not obtain Cloudflare credentials")
        return 1
    
    print(f"✅ Using Cloudflare account: {email}")
    
    # Get zone ID
    zone_id = get_zone_id(domain, email, api_token)
    if not zone_id:
        print("❌ Could not find Cloudflare zone for domain")
        return 1
        
    print(f"✅ Found zone ID: {zone_id}")
    
    # List current DNS records
    print("\n🔍 Fetching current DNS records...")
    records = list_dns_records(zone_id, email, api_token)
    a_records = [r for r in records if r["type"] == "A" and r["name"] == domain]
    
    if not a_records:
        print(f"❌ No A records found for {domain}")
        return 1
        
    print(f"📋 Found {len(a_records)} A records for {domain}:")
    for record in a_records:
        print(f"  • {record['name']} → {record['content']} (ID: {record['id'][:8]}...)")
    
    # Update each A record
    print(f"\n🔄 Updating A records to {new_ip}...")
    success_count = 0
    for record in a_records:
        current_ip = record["content"]
        if current_ip != new_ip:
            print(f"  Updating {record['name']} from {current_ip} to {new_ip}...")
            
            record_data = {
                "type": "A",
                "name": record["name"],
                "content": new_ip,
                "ttl": record.get("ttl", 1)  # Use existing TTL or default to auto
            }
            
            if update_dns_record(zone_id, record["id"], record_data, email, api_token):
                print(f"    ✅ Successfully updated!")
                success_count += 1
            else:
                print(f"    ❌ Failed to update")
        else:
            print(f"  {record['name']} already points to {new_ip} ✅")
            success_count += 1
    
    print(f"\n=== Results ===")
    print(f"✅ Successfully updated: {success_count}/{len(a_records)} records")
    
    if success_count == len(a_records):
        print(f"🎉 All DNS records for {domain} now point to {new_ip}")
        print("\n⏰ DNS changes typically take 1-5 minutes to propagate globally")
        print(f"🔍 You can verify with: dig +short {domain}")
        return 0
    else:
        print("❌ Some records failed to update")
        return 1

if __name__ == "__main__":
    sys.exit(main())