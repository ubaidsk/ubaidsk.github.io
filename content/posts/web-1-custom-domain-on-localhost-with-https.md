---
ShowBreadCrumbs: true
ShowCodeCopyButtons: true
ShowPostNavLinks: true
ShowToc: true
TocOpen: false
author: Ubaid Shaikh
categories:
- web
date: '2025-05-25'
tags:
- web
- tls
- domain
- openssl
title: 'Custom Domain on Localhost with HTTPS'
---

We all run our webservers on localhost during development. Have you wondered how we can add custom domain and serve the site over https? In this blog post, we will see how to set this up in Windows and WSL (version 2). I believe the steps would be similar for MacOS and Linux. Let's get started.

# Prerequisites

Before we begin, make sure you have:

1. **Python and Flask installed**: `pip install flask`
2. **OpenSSL installed**: In WSL, run `sudo apt-get install openssl`
3. **Administrator privileges** on Windows (for editing hosts file and installing certificates)
4. Basic understanding of web servers and HTTP/HTTPS concepts

# TLDR: High level steps

1. **Add custom domain mapping** in your system's hosts file. This redirects your custom domain to localhost.
2. **Generate a self-signed certificate** using OpenSSL. This provides SSL/TLS encryption for HTTPS.
3. **Trust the certificate** in your system's certificate store to avoid browser warnings.
4. **Configure your web server** to use the certificate and serve content over HTTPS.

# Step 0: Boot up some server

Let's start any webserver. I like to use python's flask for this. You are free to use other approaches like `nginx`.

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, Custom Domain!"

if __name__ == '__main__':
    # For HTTP testing (before certificates)
    app.run(host='0.0.0.0', port=5000, debug=True)

    # For HTTPS (after generating certificates - replace the above line with this)
    # app.run(host='0.0.0.0', port=5000, debug=True, ssl_context=('server.crt', 'server.key'))
```

Run the app using `python main.py` (assuming the above code is stored in a file named `main.py`).

**Note:** After generating certificates in Step 2, you'll comment out the HTTP line and uncomment the HTTPS line to switch to HTTPS mode.

# Step 1: Adding domain mapping in our hosts file

We need to define our custom domain in the Windows hosts file. Open the hosts file in `C:\Windows\System32\drivers\etc\hosts` and add the following line:

```bash
# Custom entries
127.0.0.1 nanosexample.com
```

The `hosts` file can only be edited with admin permissions. Run PowerShell as administrator and run notepad from inside it to edit the `hosts` file:

```bash
notepad C:\Windows\System32\drivers\etc\hosts
```

In this case, my custom domain is named `nanosexample.com`.

Now when we hit `http://nanosexample.com:5000` it should serve our Flask webpage. Note that we are serving our site over `http` and not yet `https`.

# Step 2: Generating the certificates

We can use the following one-liner to generate the key and certificate:

```bash
openssl req -x509 -newkey rsa:4096 -sha256 -days 365 -nodes \
  -keyout server.key -out server.crt -subj "/CN=nanosexample.com" \
  -addext "subjectAltName=DNS:nanosexample.com,DNS:*.nanosexample.com"
```

This command generates a new RSA key and a self-signed certificate with a validity of 365 days. The `-nodes` option means that the private key will not be encrypted (no passphrase required). The `-subj` option specifies the subject name for the certificate, and the `-addext` option adds the Subject Alternative Name (SAN) extension to the certificate.

I got the approach from [here](https://stackoverflow.com/questions/10175812/how-can-i-generate-a-self-signed-ssl-certificate-using-openssl/41366949#41366949).

Note: You can also rather generate a certificate signing request (CSR) and get it signed by a trusted CA. This is the recommended approach for production environments.

# Optional: Copy the certificate to Windows

Since I use WSL for my development, I need to copy my generated certificate to a Windows directory so I can install it in the Windows certificate store.

```bash
# Create the directory if it doesn't exist
mkdir -p /mnt/c/Users/Ubaid/Desktop/cert

# Copy the certificate
cp server.crt /mnt/c/Users/Ubaid/Desktop/cert
```

# Step 3: Trusting your generated certificate

>⚠️ **Security Warning**: This step will configure your certificate as trusted by your system. This could be potentially dangerous as it bypasses browser security warnings. You should remove the certificate from your trusted store as soon as you're done with your experimentation.

>💡 **Important**: Never install untrusted certificates in production environments or on machines you don't control.

Open your certificate in Windows Explorer, right click and select install certificate. Use the option of installing it in personal store. Then press `Windows + R` and type `certmgr.msc` to open the certificate manager. You should see your certificate in the personal store. Now you need to right click copy and paste it in the trusted root certification authorities store. This will make your certificate trusted by the system.

## Cleaning up (Important!)

**Remember to remove the certificate when done:**

Use `certmgr.msc` to remove the certificate from "Trusted Root Certification Authorities" when you're finished with your development. You can just right click on the installed certificate and select delete from the context menu.

# Step 4: Update Your Flask App for HTTPS

Now that you have certificates, update your Flask app to use them. Simply comment out the HTTP line and uncomment the HTTPS line:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, Custom Domain with HTTPS!"

if __name__ == '__main__':
    # For HTTP testing (comment this out when using HTTPS)
    # app.run(host='0.0.0.0', port=5000, debug=True)

    # For HTTPS (uncomment this line)
    app.run(host='0.0.0.0', port=5000, debug=True, ssl_context=('server.crt', 'server.key'))
```

# Final Directory Structure

After completing all the steps, your project directory should look like this:

```
my-https-project/
├── main.py              # Your Flask application
├── server.key           # Private key (generated by OpenSSL)
└── server.crt           # SSL certificate (generated by OpenSSL)
```

**Note:** The certificate (`server.crt`) will also be installed in the Windows certificate store. It will also be copied to your Windows directory in case of WSL (e.g., `C:\Users\Ubaid\Desktop\cert\server.crt`).

# Result

1. Start your Flask app with HTTPS: `python main.py`
2. Open `https://nanosexample.com:5000` in your browser
3. You should see your Flask app running with a trusted HTTPS certificate
4. The browser should show a secure lock icon (🔒) in the address bar

## Why This Works

1. **Hosts file**: Maps `nanosexample.com` to `127.0.0.1` (localhost)
2. **Self-signed certificate**: Provides SSL/TLS encryption for HTTPS
3. **Trust store**: Prevents browser security warnings
4. **Flask SSL context**: Configures the web server to use HTTPS with your certificates
