set -e
r.js -o build.js
aws s3 sync /web s3://innerground.dance
