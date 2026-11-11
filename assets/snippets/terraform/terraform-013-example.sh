terraform init
# Inspect and commit the provider selections and checksums.
git diff -- .terraform.lock.hcl
git add .terraform.lock.hcl
