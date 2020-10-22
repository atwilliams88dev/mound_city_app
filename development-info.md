# Folder Info

<ul>
    <li>db - holds the db pool connection information, its part of express.js</li>
    <li>logs - from winston middleware (express) we save error logs to this folder which will be available within the docker container of web app</li>
    <li>node_modules - javascript stuff - connects with package.json files</li>
    <li>pgdata - this is docker volume that allows us to seed our postgres DB and work with data.</li>
    <li>routes - express js routes. This is similar to a controller</li>
    <li>views - template language backed by mozilla https://mozilla.github.io/nunjucks/</li>
    <li>.env file - holds environment variables</li>
    <li>.gitignore - tells git to ignore path</li>
    <li>docker-compose - allows us to network multiple docker images together</li>
    <li>Dockerfile - builds our express app</li>
    <li>index.js - root of our express app</li>
    <li>logger.js - part of winston middleware. Use logger instead console.log</li>
    <li>package.json / package.lock.json - Where we list our dependency</li>
    <li>postcss.config.js - we are using postcss with tailwind css</li>
    <li>tailwind.config.js - This is how we theme and control tailwind</li>
    <li>webpack.config.js - This is how we compile our static js files.</li>
</ul>
<br/>

# Getting Started

<ol>
    <li>Fork the starter</li>
    <li>Run npm install</li>
    <li>Run npm start</li>
    <li>You might need to run npm run initDB - this is because the docker volume contains required empty folders that are not tracked by git</li>
</ol>
<br/>

# Connecting to pg admin on Droplet

<ol>
    <li>In the browser enter enter the droplet ip address (from DO) with port 5432. example 157.230.179.224:5432</li>
    <li>login with credentials from docker compose </li>
    <li>In the droplet run docker ps to get the container id of the running postgres instance </li>
    <li>Run docker inspect <dockerContainerId> | grep IPAddress </li>
    <li>Back in the pgadmin page - use the Ip address in the Host name/address</li>
    <li>Port should be 5432</li>
    <li>Update username and password</li>
</ol>
