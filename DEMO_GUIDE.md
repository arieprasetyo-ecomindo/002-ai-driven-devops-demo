# AI-Driven DevOps Demo Guide

A comprehensive guide for presenters to demonstrate all features using this Vue.js + Vite demo application.

## Demo Overview
This guide walks you through 10 key demonstrations of GitHub's AI-driven DevOps features using the included Vue.js application that displays random pictures and quotes. The app is intentionally created with security vulnerabilities to showcase GitHub's detection and remediation capabilities.

---

## Demo Item 1: VSCode Commit Message Generation

**Objective**: Show how GitHub Copilot generates commit messages automatically.

### Steps:
1. Start the dev server: `npm run dev` in the `app/` directory
2. Make a small code change (e.g., update a comment or add a variable in `src/App.vue`). Or a medium one, eg. add a countdown timer until next image/quote.
3. Go to VS Code Source Control (Ctrl+Shift+G / Cmd+Shift+G)
4. Stage the changes
5. Open the Commit Input box
6. With Copilot extension enabled, you should see a "✨" button to generate a commit message
7. Click the button and Copilot will suggest a descriptive commit message based on your changes
8. Review and confirm the message

**Talking Points**:
- Copilot understands your code changes and generates contextual commit messages
- Uses component-level context (Vue setup, API calls, etc.)
- Saves time and ensures consistency in commit messages

---

## Demo Item 2: Copilot Instructions Checklist

**Objective**: Demonstrate the `.copilot-instructions.md` file and how it guides AI assistants.

### Steps:
1. Open `.copilot-instructions.md` in the `.github/` directory
2. Show the instructions to AI assistants about the project
3. Ask Copilot a question about the codebase (e.g., "What does this app do?")
4. Highlight how Copilot uses these instructions for context
5. Modify the instructions and ask another question to show how it affects responses

**Talking Points**:
- `.copilot-instructions.md` provides context to AI assistants
- Helps ensure consistent, project-aware responses
- Can include coding standards, frameworks, and project-specific guidelines
- Located at project root for easy discovery

---

## Demo Item 3: Git Hooks

**Objective**: Demonstrate local git hooks that run before commits.

### Steps:
1. Create a `.husky/` directory in the `app/` folder (or demonstrate if already present)
2. Show pre-commit hooks that run linting/formatting:
   ```bash
   mkdir -p app/.husky
   ```
3. Create a pre-commit hook:
   ```bash
   cat > app/.husky/pre-commit << 'EOF'
   #!/bin/sh
   echo "Running pre-commit checks..."
   npm run lint
   EOF
   chmod +x app/.husky/pre-commit
   ```
4. Attempt to commit with linting errors to show the hook executes
5. Explain how this prevents bad code from being committed

**Talking Points**:
- Git hooks run automatically on developer machines
- Catch issues early before code reaches the repository
- Examples: linting, formatting, security checks
- Saves time by preventing CI/CD failures

---

## Demo Item 4: Committing Hard-Coded Keys (Security Anti-Pattern)

**Objective**: Show the security vulnerability of hard-coded credentials.

### Steps:
1. Open `src/config.js` in VS Code
2. Point out the hard-coded API keys:
   - AWS Access Key
   - AWS Secret Key
   - Database Password
   - GitHub Token
3. Explain why this is dangerous:
   - Anyone with repository access can see credentials
   - Credentials in git history are permanent and recoverable
   - Risk of unauthorized access to services
4. This file is intentionally included to demonstrate what GitHub's tools detect

**Talking Points**:
- Hard-coded secrets are a critical security risk
- Once committed, they remain in git history even if deleted
- GitHub Actions and CodeQL will flag these in subsequent demos
- Best practice: Use environment variables and GitHub Secrets

---

## Demo Item 5: Git Hooks & GitHub Actions

**Objective**: Compare local checks (git hooks) vs. cloud-based checks (GitHub Actions).

### Steps:
1. Show the git hook from Demo Item 3 (local machine)
2. Create/show `.github/workflows/security.yml`:
   ```bash
   mkdir -p app/.github/workflows
   ```
3. Create a workflow file (see **Appendix: Example Workflow** below)
4. Explain the differences:
   - Git Hooks: Run locally, fast feedback, developer-controlled
   - GitHub Actions: Run on every push/PR, enforced checks, audit trail
5. Commit changes and show the Actions running in GitHub

**Talking Points**:
- Defense in depth with multiple checkpoints
- Git hooks catch issues early
- GitHub Actions enforce rules at the repository level
- Can't bypass GitHub Actions (unlike local hooks)
- Creates audit trail for compliance

---

## Demo Item 6: CodeQL (JavaScript Quality)

**Objective**: Demonstrate GitHub's CodeQL static analysis for security vulnerabilities.

### Steps:
1. Go to your GitHub repository Settings
2. Navigate to Security → Code Security and Analysis
3. Enable CodeQL (if not already enabled)
4. Create `.github/workflows/codeql-analysis.yml` (example in Appendix)
5. Push code changes to trigger CodeQL
6. Wait for the scan to complete (usually 1-2 minutes)
7. Go to Security tab → Code Scanning alerts
8. Show the detected issues:
   - Hard-coded secrets from `src/config.js`
   - Potential SQL injection in `queryDatabase()` function
   - Any other vulnerabilities CodeQL finds

**Talking Points**:
- CodeQL performs semantic code analysis
- Identifies security vulnerabilities without executing code
- Creates detailed alerts with severity levels
- Provides remediation suggestions
- Integrates with pull request reviews

---

## Demo Item 7: PR Description

**Objective**: Show how to Copilot can help write effective pull request descriptions.

### Steps:
1. Create a feature branch: `git checkout -b demo/fix-security-issues`
2. Make improvements to the code (fix security issues found by CodeQL)
3. Push the branch to GitHub
4. Create a Pull Request 
5. Ask Copilot in GitHub to write the PR description

**Talking Points**:
- Clear descriptions help reviewers understand intent
- Helps track what was changed and why
- Creates better code review discussions
- Documents decision-making for future reference

---

## Demo Item 8: Copilot Reviewer

**Objective**: Show how GitHub Copilot can review pull requests for code quality and security.

### Steps:
1. In the Pull Request created in Demo Item 7, add a comment
2. Mention Copilot or use the Copilot review feature:
   - Look for "Review with Copilot" button/option
   - Or comment: `@copilot review`
3. Copilot analyzes the PR and provides:
   - Code quality suggestions
   - Security issue identification
   - Performance recommendations
4. Review the feedback provided by Copilot
5. Show how suggestions can be applied

**Talking Points**:
- Copilot acts as an additional reviewer
- Catches common mistakes and anti-patterns
- Provides suggestions based on best practices
- Doesn't replace human review but augments it
- Scalable way to maintain code quality

---

## Demo Item 9: GitHub Issues (Security Hardening)

**Objective**: Demonstrate creating and tracking security improvements via GitHub Issues.

### Steps:
1. Go to your repository's Issues tab
2. Create a new issue titled: "Security Hardening: Remove Hard-Coded Secrets"
3. Add detailed description:
   ```
   ## Problem
   The application contains hard-coded secrets that pose a security risk.
   
   ## Current State
   - src/config.js contains exposed API keys
   - Database credentials are visible in code
   - GitHub token is committed to repository
   
   ## Proposed Solution
   1. Move all secrets to environment variables
   2. Create .env.example with placeholder values
   3. Update CI/CD to inject secrets at runtime
   4. Rotate any exposed credentials
   
   ## Acceptance Criteria
   - No secrets in public code
   - CodeQL scan shows no credential exposure
   - All tests pass
   - Security team approves changes
   ```
4. Lock and reference the PR that fixes this issue
5. Show how issues provide traceability for security work

**Talking Points**:
- GitHub Issues provide centralized tracking
- Security improvements documented and traceable
- Links between issues and code changes
- Enables audit trails for compliance
- Facilitates team coordination on security

---

## Demo Item 10: Copilot Space (Optional Advanced Feature)

**Objective**: Demonstrate Copilot Space for collaborative development with AI assistance.

### Steps:
1. Create a GitHub Codespace from the repository:
   - Click Code → Codespaces → Create codespace on main
2. Once the Codespace loads, open VS Code terminal
3. Start the app: `npm run dev`
4. Use Copilot chat in the Codespace:
   - Press Ctrl+I or use the Copilot panel
   - Ask questions like: "How does the quote fetching work?"
   - Ask for improvements: "Add error handling to the quote fetch"
   - Request explanations: "Explain the CSS grid layout"
5. Copilot provides responses with full repository context
6. Test implementing suggestions directly in the browser-based IDE

**Talking Points**:
- Codespacess provide cloud-based development environments
- Pre-configured with all dependencies
- Copilot has full context of the repository
- Enables remote pair programming with AI
- Works in browser - no local setup required
- Great for onboarding and quick development

---

## Running the Application Locally

### Prerequisites:
- Node.js v18+ (use `nvm use 24.4.0` or compatible version)
- npm 11+
- Git

### Steps:
1. Navigate to the app directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open browser to http://localhost:5173/

5. Verify the app shows:
   - A random picture (640x300)
   - A random quote below the picture
   - Updates every 5 seconds

### Build for production:
```bash
npm run build
```

---

## Appendix: Example GitHub Actions Workflows

### Example 1: Security Scanning Workflow
Create `.github/workflows/security.yml`:
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

### Example 2: CodeQL Analysis Workflow
Create `.github/workflows/codeql.yml`:
```yaml
name: CodeQL

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    
    strategy:
      fail-fast: false
      matrix:
        language: [ 'javascript' ]
    
    steps:
    - name: Checkout repository
      uses: actions/checkout@v4
    
    - name: Initialize CodeQL
      uses: github/codeql-action/init@v3
      with:
        languages: ${{ matrix.language }}
    
    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '24.4.0'
    
    - name: Build
      run: cd app && npm ci && npm run build
      continue-on-error: true
    
    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v3
```

---

## Tips for Successful Demo

1. **Practice beforehand**: Run through all steps at least once
2. **Have backup slides**: In case CodeQL scans are slow
3. **Explain the flow**: Walk through the architecture of what's happening
4. **Show real issues**: Point out the intentional vulnerabilities and why they're bad
5. **Engage audience**: Ask questions about what they see
6. **Have a plan B**: If waiting for CI/CD, show recorded results
7. **Emphasize benefits**: Save time, catch bugs, improves security
8. **Remove secrets afterward**: Delete the exposed credentials after demo
9. **Make it iterative**: Show how fixes lead to better security
10. **Highlight collaboration**: Show how AI, automation, and humans work together

---

## Post-Demo Cleanup

✅ **Do NOT commit the hard-coded secrets to main branch**

After your demo:
1. Clean up the demo branch
2. Remove exposed credentials
3. Ensure CodeQL has cleared the findings
4. Document lessons learned
5. Share demo insights with team

---

## Questions & Troubleshooting

**Q: The app won't start**
- A: Ensure Node.js 24.4.0+ is installed: `node --version`
- A: Run `npm install` in the app directory
- A: Check for port 5173 conflicts

**Q: CodeQL isn't finding vulnerabilities**
- A: Wait for the scan to complete (1-2 minutes)
- A: Ensure the config.js file is present with hard-coded secrets
- A: Check that CodeQL is enabled in repository settings

**Q: Copilot suggestions aren't appearing**
- A: Ensure Copilot extension is installed
- A: Check that you have Copilot subscription active
- A: Try restarting VS Code

**Q: GitHub Actions aren't running**
- A: Ensure workflow files are in `.github/workflows/`
- A: Check that workflows are enabled in repository settings
- A: Push to a branch and create a PR to trigger workflows

---

## Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [CodeQL Documentation](https://codeql.github.com)
- [Vue.js 3 Documentation](https://vuejs.org)
- [Vite Documentation](https://vitejs.dev)

---

**Last Updated**: March 26, 2026
**App Version**: 1.0.0
**Demo Difficulty**: Intermediate
