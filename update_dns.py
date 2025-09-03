#!/usr/bin/env python3
"""
Update DNS records for mybenefitsvideos.com using Cloudflare API
"""

import os
import json
import subprocess
import requests
import sys

def get_github_secret(secret_name, org="Mojo-Solo"):
    """Get a secret from GitHub organization secrets"""
    try:
        # Try to get the secret via gh CLI
        result = subprocess.run(
            ["gh", "api", f"/orgs/{org}/actions/secrets/{secret_name}"],
            capture_output=True,
            text=True,
            check=True
        )
        # This won't give us the actual value for security reasons
        print(f"Secret {secret_name} exists but value is protected")
        return None
    except subprocess.CalledProcessError as e:
        print(f"Could not access secret {secret_name}: {e}")
        return None

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
    return data["success"]

def main():
    # For now, let's try with environment variables or prompt for credentials
    api_token = os.environ.get('CLOUDFLARE_API_TOKEN')
    email = os.environ.get('CLOUDFLARE_EMAIL')
    
    if not api_token or not email:
        print("Cloudflare credentials not found in environment.")
        print("Please set CLOUDFLARE_API_TOKEN and CLOUDFLARE_EMAIL environment variables.")
        print("You can get these from the GitHub secrets or Cloudflare dashboard.")
        
        # Try to help user get the values
        print("\nTo get the credentials:")
        print("1. Go to Cloudflare dashboard -> My Profile -> API Tokens")
        print("2. Or check the GitHub organization secrets for Mojo-Solo")
        
        return 1
    
    domain = "mybenefitsvideos.com"
    # Vercel IP addresses for mybenefitsvideos.vercel.app
    new_ips = ["64.29.17.67", "216.198.79.67"]
    
    print(f"Updating DNS records for {domain} to point to Vercel IPs: {', '.join(new_ips)}")
    
    # Get zone ID
    zone_id = get_zone_id(domain, email, api_token)
    if not zone_id:
        return 1
        
    print(f"Found zone ID: {zone_id}")
    
    # List current DNS records
    records = list_dns_records(zone_id, email, api_token)
    a_records = [r for r in records if r["type"] == "A" and (r["name"] == domain or r["name"] == f"www.{domain}")]
    
    print(f"Found {len(a_records)} A records for {domain}:")
    for record in a_records:
        print(f"  {record['name']} -> {record['content']} (ID: {record['id']})")
    
    # Update A records to point to Vercel IPs
    # We'll update records to use both IPs, or pick one per record
    success_count = 0
    target_ips = new_ips.copy()
    
    for i, record in enumerate(a_records):
        # Use round-robin assignment of IPs to records
        target_ip = target_ips[i % len(target_ips)]
        
        if record["content"] not in new_ips:
            print(f"Updating {record['name']} from {record['content']} to {target_ip}")
            
            record_data = {
                "type": "A",
                "name": record["name"],
                "content": target_ip,
                "ttl": record.get("ttl", 1)  # Use existing TTL or default to auto
            }
            
            if update_dns_record(zone_id, record["id"], record_data, email, api_token):
                print(f"  ✅ Successfully updated {record['name']}")
                success_count += 1
            else:
                print(f"  ❌ Failed to update {record['name']}")
        else:
            print(f"Record {record['name']} already points to Vercel IP {record['content']}")
            success_count += 1
    
    print(f"\nCompleted: {success_count}/{len(a_records)} records updated successfully")
    
    return 0 if success_count == len(a_records) else 1

if __name__ == "__main__":
    sys.exit(main())