# Setting Up DNS for GitHub Pages

This guide will help you configure your domain registrar's DNS settings to point to your GitHub Pages site.

## GitHub Pages IP Addresses

GitHub Pages uses the following IP addresses for A records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

## DNS Configuration Steps

### 1. Set Up A Records

Create A records for your apex domain (e.g., `cendekiapp.com`) pointing to the GitHub Pages IP addresses:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

### 2. Set Up CNAME Record for WWW Subdomain

Create a CNAME record for the `www` subdomain:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | yourusername.github.io. | 3600 |

Replace `yourusername` with your actual GitHub username.

### 3. Verify Domain Ownership

GitHub may ask you to verify domain ownership by adding a TXT record:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| TXT | _github-pages-challenge-yourusername | verification-code-provided-by-github | 3600 |

### 4. Wait for DNS Propagation

DNS changes can take up to 24 hours to propagate globally. You can check propagation status using DNS lookup tools like [dnschecker.org](https://dnschecker.org/).

### 5. Enable HTTPS

After DNS propagation is complete:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Ensure "Enforce HTTPS" is checked

## Troubleshooting

If your custom domain is not working, check:

1. Confirm DNS records are correctly configured
2. Verify the CNAME file in your repository contains only your domain name
3. Check GitHub Pages settings to ensure your custom domain is set
4. Look for any error messages in GitHub Pages settings

For further help, consult the [GitHub Pages documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site). 