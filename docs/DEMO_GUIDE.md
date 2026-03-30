# AI-Driven DevOps Demo Runbook

A step-by-step presenter guide for demonstrating GitHub Copilot, Git hooks, GitHub Actions, and CodeQL using this Vue + Vite demo app.

## Demo Goal
Show how AI assistance + local quality gates + cloud security checks work together in a realistic developer workflow.

## Suggested Total Duration
45 to 70 minutes (depending on CI queue time).

## Pre-Demo Checklist (Do This First)
1. Open a terminal at repository root.
2. Run:
   ```bash
   nvm use node
   ```
3. Verify hook path:
   ```bash
   git config --get core.hooksPath
   ```
4. If empty, set it once:
   ```bash
   git config core.hooksPath .githooks
   ```
5. Install app dependencies (if not already installed):
   ```bash
   cd app && npm install
   ```
6. Optional quick confidence check:
   ```bash
   cd .. && .githooks/pre-push
   ```

## Appendix Index
- Native Git pre-push hook: [appendix/git-hooks-pre-push.md](appendix/git-hooks-pre-push.md)
- Manual vulnerable demo snippet: [appendix/vulnerability-demo-snippet.md](appendix/vulnerability-demo-snippet.md)
- Security scanning workflow: [appendix/security-workflow.md](appendix/security-workflow.md)
- CodeQL workflow: [appendix/codeql-workflow.md](appendix/codeql-workflow.md)

---

## Demo Item 1: Copilot Instructions Checklist

**Estimated Duration**: 4 to 6 minutes

**Objective**
Show how project instructions shape Copilot responses.

**Step-by-Step**
1. Open `.github/copilot-instructions.md`.
2. Explain project context rules (Vue app, security demo, nvm usage).
3. Ask Copilot: "What does this app do?"
4. Point out that Copilot answers with project-specific context.
5. Optionally edit one instruction and ask again.

**Success Check**
Copilot response reflects repository-specific instructions.

---

## Demo Item 2: Git Hooks (Native, No Husky)

**Estimated Duration**: 8 to 12 minutes

**Objective**
Show that local pre-push checks automatically block bad pushes.

**Step-by-Step**
1. Show `.githooks/pre-push`.
2. Confirm hooks path once:
   ```bash
   git config --get core.hooksPath
   ```
3. Make a small UI change in `app/src/App.vue` (example: add a timer for next slide change).
4. Stage and commit the change.
5. Push to trigger the hook:
   ```bash
   git push
   ```
6. (Optional) Introduce a failing test, push again, and show push is blocked.
7. Fix test and push successfully.

**Success Check**
Push is blocked when tests fail and allowed when tests pass.

**Reference**
[appendix/git-hooks-pre-push.md](appendix/git-hooks-pre-push.md)

---

## Demo Item 3: Committing Hard-Coded Keys (Security Anti-Pattern)

**Estimated Duration**: 6 to 8 minutes

**Objective**
Intentionally introduce vulnerable code in a demo branch to trigger security tooling.

**Step-by-Step**
1. Open [appendix/vulnerability-demo-snippet.md](appendix/vulnerability-demo-snippet.md).
2. Create `app/src/config.js` and paste the snippet.
3. Explain why this is dangerous:
   - Exposed credentials in source code
   - Secrets persist in Git history
   - Potential unauthorized service access
4. Commit and push this change only on demo branch.

**Success Check**
Vulnerable code is visible in branch history and ready for scanning demos.

---

## Demo Item 4: VSCode Commit Message Generation

**Estimated Duration**: 3 to 5 minutes

**Objective**
Show Copilot-generated commit messages based on staged changes.

**Step-by-Step**
1. Reuse your latest staged change (UI timer or vulnerability snippet commit).
2. Open Source Control (Cmd+Shift+G / Ctrl+Shift+G).
3. Click the Copilot sparkle button in commit input.
4. Review generated message.
5. Commit using the generated message (or edited version).

**Success Check**
Commit message is contextual and descriptive without manual drafting.

---

## Demo Item 5: Git Hooks and GitHub Actions

**Estimated Duration**: 6 to 10 minutes

**Objective**
Compare local checks (hooks) versus cloud-enforced checks (Actions).

**Step-by-Step**
1. Recap local pre-push hook from Item 2.
2. Show `.github/workflows/security.yml` (create if needed from appendix template).
3. Explain differences:
   - Git hooks: local, fast feedback, optional setup per clone
   - GitHub Actions: server-side, auditable, enforced on push/PR
4. Push and show GitHub Actions run.

**Success Check**
Audience understands defense-in-depth: local + cloud gates.

**Reference**
[appendix/security-workflow.md](appendix/security-workflow.md)

---

## Demo Item 6: CodeQL (JavaScript Quality)

**Estimated Duration**: 10 to 15 minutes

**Objective**
Show semantic security analysis and real findings in GitHub Security tab.

**Step-by-Step**
1. In GitHub, go to Settings -> Security -> Code security and analysis.
2. Ensure CodeQL is enabled.
3. Show that `.github/workflows/codeql.yml` already exists.
4. Push the vulnerable demo branch changes.
5. Wait for CodeQL job completion.
6. Open Security -> Code scanning alerts.
7. Review findings (hard-coded secrets / SQL injection if snippet was added).

**Success Check**
At least one meaningful CodeQL/security alert is visible.

**Reference**
[appendix/codeql-workflow.md](appendix/codeql-workflow.md)

---

## Demo Item 7: PR Description

**Estimated Duration**: 4 to 6 minutes

**Objective**
Show AI-assisted PR documentation.

**Step-by-Step**
1. Create branch (if not already):
   ```bash
   git checkout -b demo/fix-security-issues
   ```
2. Make remediation changes.
3. Push and open a pull request.
4. Ask Copilot in GitHub to generate PR description.

**Success Check**
PR description clearly summarizes problem, changes, and impact.

---

## Demo Item 8: Copilot Reviewer

**Estimated Duration**: 4 to 7 minutes

**Objective**
Show AI-assisted pull request review.

**Step-by-Step**
1. In PR, trigger Copilot review (`@copilot review` or review button).
2. Walk through comments/suggestions.
3. Apply one suggestion live if relevant.

**Success Check**
Copilot provides actionable review feedback on quality/security.

---

## Demo Item 9: GitHub Issues (Security Hardening)

**Estimated Duration**: 5 to 7 minutes

**Objective**
Show traceability from security findings to tracked work.

**Step-by-Step**
1. Create issue: "Security Hardening: Remove Hard-Coded Secrets".
2. Add problem statement, current state, proposed solution, acceptance criteria.
3. Link issue to PR that fixes vulnerabilities.

**Success Check**
Issue, remediation PR, and security findings are connected.

---

## Demo Item 10: Copilot Space (Optional)

**Estimated Duration**: 8 to 12 minutes

**Objective**
Show cloud dev environment + AI collaboration.

**Step-by-Step**
1. Create GitHub Codespace from main.
2. Start app and open Copilot chat.
3. Ask for explanation + improvement request.
4. Apply one suggestion in the Codespace.

**Success Check**
Audience sees end-to-end cloud development with AI context.

---

## Tips for Smooth Delivery
1. Keep a backup branch with known good state.
2. Prepare one failing-test scenario in advance for Item 2.
3. Expect CI delay; narrate what is happening while waiting.
4. Keep vulnerable snippet only on demo branch.
5. End with cleanup and credential-rotation reminder.

## Post-Demo Cleanup
1. Remove `app/src/config.js` from branch history going forward.
2. Revert demo-only insecure code.
3. Confirm CodeQL findings are resolved in remediation branch.
4. Close loop: issue, PR, and final status update.

## Troubleshooting
**App does not start**
- Run `nvm use node`
- Run `cd app && npm install`
- Check for port conflict on 5173

**Hook does not run on push**
- Check: `git config --get core.hooksPath`
- Ensure output is `.githooks`
- Ensure `.githooks/pre-push` is executable

**CodeQL not showing findings yet**
- Wait for workflow completion
- Confirm vulnerable snippet exists in branch
- Verify CodeQL enabled in repo settings

## Resources
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [CodeQL Documentation](https://codeql.github.com)
- [Vue.js 3 Documentation](https://vuejs.org)
- [Vite Documentation](https://vitejs.dev)

**Last Updated**: March 30, 2026  
**App Version**: 1.0.0  
**Demo Difficulty**: Intermediate
