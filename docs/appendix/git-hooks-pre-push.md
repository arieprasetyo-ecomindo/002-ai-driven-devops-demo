# Appendix: Native Git Pre-Push Hook

Use native Git hooks (no Husky) to block pushes when unit tests fail.

## 1. Configure Hook Path

Run this once from repo root:

```bash
git config core.hooksPath .githooks
```

## 2. Hook Script

Tracked file: `.githooks/pre-push`

```sh
#!/bin/sh

set -eu

echo "Running unit tests before push..."
cd app
npm run test:unit
```

## 3. Demo Flow

1. Break a unit test intentionally.
2. Run `git push` and show it is blocked.
3. Fix the test.
4. Run `git push` again and show success.
