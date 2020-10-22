# Nginx and Certs links

<ul>
    <li>HOW TO VIDEO - https://www.youtube.com/watch?v=oykl1Ih9pMg&t=967s</li>
    <li>Setting up nginx https://gist.github.com/bradtraversy/cd90d1ed3c462fe3bddd11bf8953a896</li>
    <li>Setting up ssl certs - https://certbot.eff.org/lets-encrypt/ubuntufocal-nginx</li>
</ul>

# Deployment Process

### Steps:

<ol>
    <li>Create box / droplet</li>
    <li>SSH into box / droplet</li>
    <li>Pull app into box using git clone</li>
    <li>Install NGINX on box / droplet</li>
    <li>Configure NGINX to run app on PORT 80. Use proxy_pass - see HOW TO VIDEO above.</li>
    <li>Use Certbot - https://certbot.eff.org/lets-encrypt/ubuntufocal-nginx to handle ssl </li>
</ol>
<div>
-- THE ONLY FILE YOU CHANGE FOR OUR NGINX DEPLOYMENT IS /etc/nginx/sites-available/default (the WEB has a million articles telling you something different) <br/>
-- VERIFY your nginx config by running sudo nginx -t 
</div>
<br/>

# Droplet

digital ocean droplet - select docker Its build on top of Ubuntu 20.14

# Domain Names

purchase domain names through name cheap and set custom DNS to ns1.digitalocean.com, ns2.digitalocean.com, ns3.digitalocean.com
<br/>
In DigitalOcean select "Networking" then enter domain
<br/>

- enter @ symbol then the desired droplet
  <br/>
- enter www then the desired droplet

<br/>

# Error logging.

We should use a service like https://sentry.io/welcome/

# Updating BOXES

If you have updated the database with PG Admin YOU MUST PUSH THE CODE TO GITHUB OR THE pgdata FOLDER WILL GET REPLACED!!!
