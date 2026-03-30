# AI-Driven DevOps Demo Guide

A comprehensive guide for presenters to demonstrate all features using this Vue.js + Vite demo application.

## Demo Overview
This guide walks you through 10 key demonstrations of GitHub's AI-driven DevOps features using the included Vue.js application that displays random pictures and quotes. The app is intentionally created with security vulnerabilities to showcase GitHub's detection and remediation capabilities.

## Appendix Index
- Native Git pre-push hook: [appendix/git-hooks-pre-push.md](appendix/git-hooks-pre-push.md)
- Manual vulnerable demo snippet: [appendix/vulnerability-demo-snippet.md](appendix/vulnerability-demo-snippet.md)
- Security scanning workflow: [appendix/security-workflow.md](appendix/security-workflow.md)
- CodeQL workflow: [appendix/codeql-workflow.md](appendix/codeql-workflow.md)

---

## Demo Item 1: Copilot Instructions Checklist

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

## Demo Item 2: Git Hooks

**Objective**: Demonstrate native Git hooks that run before push while making a small UI change.

### Steps:
1. Show the native hook script in `.githooks/pre-push`
2. Configure local hooks path once:
   ```bash
   git config core.hooksPath .githooks
   ```
3. Make a small UI change in `app/src/App.vue` (example: add a timer for next slide change)
4. Stage and commit the UI change
5. Confirm unit tests run before push:
   ```bash
   git push
   ```
6. Demonstrate a failing test blocks push, then fix test and push again
7. Refer to [appendix/git-hooks-pre-push.md](appendix/git-hooks-pre-push.md)

**Talking Points**:
- Git hooks run automatically on developer machines
- Catch issues early before code reaches the repository
- Works naturally with everyday changes like a small UI update
- Example here: pre-push runs all unit tests (`npm run test:unit`)
- Saves time by preventing CI/CD failures

---

## Demo Item 3: Committing Hard-Coded Keys (Security Anti-Pattern)

**Objective**: Show the security vulnerability of hard-coded credentials.

### Steps:
1. Open [appendix/vulnerability-demo-snippet.md](appendix/vulnerability-demo-snippet.md)
2. Copy the snippet into `app/src/config.js` manually during the demo
3. Explain why hard-coded credentials are dangerous:
   - Anyone with repository access can see credentials
   - Credentials in git history are permanent and recoverable
   - Risk of unauthorized access to services
4. Commit intentionally in a demo branch only, then show how scanning tools detect it

**Talking Points**:
- Hard-coded secrets are a critical security risk
- Once committed, they remain in git history even if deleted
- GitHub Actions and CodeQL can flag these in subsequent demos
- Best practice: Use environment variables and GitHub Secrets

---

## Demo Item 4: VSCode Commit Message Generation

**Objective**: Show how GitHub Copilot generates commit messages automatically.

### Steps:
1. Reuse the latest change you just made (for example, the UI timer change from Demo Item 2)
2. Go to VS Code Source Control (Ctrl+Shift+G / Cmd+Shift+G)
3. Stage the changes
4. Open the Commit Input box
5. With Copilot extension enabled, use the "✨" button to generate a commit message
6. Review and confirm the message

**Talking Points**:
- Copilot understands your code changes and generates contextual commit messages
- Uses component-level context (Vue setup, API calls, etc.)
- Saves time and ensures consistency in commit messages

---

## Demo Item 5: Git Hooks & GitHub Actions

**Objective**: Compare local checks (git hooks) vs. cloud-based checks (GitHub Actions).

### Steps:
1. Show the git hook from Demo Item 2 (local machine)
2. Create/show `.github/workflows/security.yml`
3. Use this appendix as the template: [appendix/security-workflow.md](appendix/security-workflow.md)
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
4. Show that `.github/workflows/codeql.yml` is already present in the repository
5. Push code changes to trigger CodeQL
6. Wait for the scan to complete (usually 1-2 minutes)
7. Go to Security tab → Code Scanning alerts
8. Show the detected issues:
   - Hard-coded secrets from the demo snippet, if intentionally added
   - Potential SQL injection from the demo snippet function, if intentionally added
   - Any other vulnerabilities CodeQL finds
9. Workflow reference: [appendix/codeql-workflow.md](appendix/codeql-workflow.md)

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
   - app/src/config.js may contain exposed API keys (if demo snippet was added)
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
- A: Add the temporary demo snippet from [appendix/vulnerability-demo-snippet.md](appendix/vulnerability-demo-snippet.md)
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

**Last Updated**: March 30, 2026
**App Version**: 1.0.0
**Demo Difficulty**: Intermediate
