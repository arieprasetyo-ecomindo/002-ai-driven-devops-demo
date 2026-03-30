# Appendix: Security Scanning Workflow

Create `.github/workflows/security.yml` with the following content:

```yaml
name: Security Scanning

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run secret scanning
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./app
          base: ${{ github.event.repository.default_branch }}
          head: HEAD

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '24.4.0'

      - name: Install dependencies
        run: cd app && npm ci

      - name: Run linting
        run: cd app && npm run lint
        continue-on-error: true
```
