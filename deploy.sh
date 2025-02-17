#!/bin/bash

# Build the project
npm run build

# Move to the build directory
cd dist/public

# Create a .nojekyll file to bypass Jekyll processing
touch .nojekyll

# Create a copy of index.html as 404.html for client-side routing
cp index.html 404.html

# Create CNAME file if you have a custom domain
# echo "yourdomain.com" > CNAME

# If deploying to a GitHub Pages project page (https://<username>.github.io/<repository>)
# Add this to your repository
