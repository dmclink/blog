# Description
Frontend for dmclink/blog-server. Provides a web based interface to write/edit/comment on blog posts.

# Setup
Go change the BASE_URL in config/axios.js to your backend API's url address or localhost if running on same machine.
Currently configured for hosting on github pages including deploy/predeploy scripts in package.json. If forking this to deploy your own, you may need to replace those scripts with ones relevant to your hosting platform.
Make sure vite.config.js "base" matches your gh repo name and "homepage" in package.json matches your url where your site will be hosted (including gh repo name if using gh-pages).

# Stack
- React
