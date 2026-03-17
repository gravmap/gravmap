# GitHub Repository Setup Guide

This guide will help you create a GitHub repository for GravMap and push your code.

## Prerequisites

- [ ] GitHub account
- [ ] Git installed on your machine
- [ ] GravMap code ready to push

## Step 1: Initialize Git Repository

If you haven't already initialized git:

```bash
# Navigate to your project directory
cd gravmap

# Initialize git repository
git init

# Check current status
git status
```

## Step 2: Create .gitignore

Ensure you have a proper `.gitignore` file:

```bash
# Check if .gitignore exists
cat .gitignore
```

It should include:
```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/

# Production
build/
dist/

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

## Step 3: Create GitHub Repository

### Option A: Using GitHub Website

1. Go to [github.com/new](https://github.com/new)
2. Fill in repository details:
   - **Repository name**: `gravmap`
   - **Description**: "AI-powered real estate transaction management platform"
   - **Visibility**: Public or Private
   - **Initialize**: 
     - ❌ Don't add README (we have one)
     - ❌ Don't add .gitignore (we have one)
     - ❌ Don't choose a license (we have one)
3. Click "Create repository"

### Option B: Using GitHub CLI

```bash
# Install GitHub CLI (if not installed)
# macOS: brew install gh
# Windows: winget install GitHub.cli
# Linux: https://github.com/cli/cli/blob/trunk/docs/install_linux.md

# Login to GitHub
gh auth login

# Create repository
gh repo create gravmap --public --source=. --remote=origin

# Push to GitHub
git push -u origin main
```

## Step 4: Commit Your Code

```bash
# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: GravMap v1.0

- Complete Next.js 14 application
- Supabase integration with RLS
- OpenAI contract extraction
- Stripe payment integration
- Email notifications with Resend
- Onboarding flow
- Help documentation
- Production-ready deployment setup"

# View commit
git log
```

## Step 5: Connect to Remote Repository

```bash
# Add remote repository (if you created via website)
git remote add origin https://github.com/YOUR_USERNAME/gravmap.git

# Verify remote
git remote -v

# Push to GitHub
git push -u origin main
```

## Step 6: Verify Repository

1. Go to `https://github.com/YOUR_USERNAME/gravmap`
2. Check that all files are uploaded
3. Verify README.md is displayed correctly
4. Check that `.env.local` is NOT in the repository (important!)

## Step 7: Add Repository Topics

Add topics to help others find your project:

1. Go to your repository on GitHub
2. Click the ⚙️ gear icon next to "About"
3. Add topics:
   - `nextjs`
   - `react`
   - `typescript`
   - `supabase`
   - `stripe`
   - `openai`
   - `real-estate`
   - `transaction-management`
   - `ai`

## Step 8: Create GitHub Actions (Optional)

Create `.github/workflows/ci.yml` for continuous integration:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Build
      run: npm run build
      env:
        NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
        NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
        OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

## Step 9: Add Branch Protection (Optional)

Protect your main branch:

1. Go to Settings → Branches
2. Click "Add branch protection rule"
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
5. Click "Create"

## Step 10: Add Issue Templates (Optional)

Create `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug report
about: Create a report to help us improve
title: ''
labels: bug
assignees: ''
---

## Describe the bug
A clear description of what the bug is.

## To Reproduce
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

## Expected behavior
What you expected to happen.

## Screenshots
If applicable, add screenshots.

## Environment
- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]

## Additional context
Add any other context about the problem here.
```

Create `.github/ISSUE_TEMPLATE/feature_request.md`:

```markdown
---
name: Feature request
about: Suggest an idea for this project
title: ''
labels: enhancement
assignees: ''
---

## Is your feature request related to a problem?
A clear description of what the problem is.

## Describe the solution you'd like
A clear description of what you want to happen.

## Describe alternatives you've considered
Any alternative solutions or features you've considered.

## Additional context
Add any other context or screenshots about the feature request here.
```

## Step 11: Add Pull Request Template (Optional)

Create `.github/pull_request_template.md`:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Describe your testing process

## Checklist:
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
```

## Security Checklist

Before pushing, verify:

- [ ] No `.env.local` file in repository
- [ ] No API keys in code (only `NEXT_PUBLIC_*` variables)
- [ ] No production secrets in code
- [ ] `.gitignore` includes all sensitive files
- [ ] No user data in test files

## Troubleshooting

### "fatal: remote origin already exists"

```bash
# Remove existing remote
git remote remove origin

# Add again
git remote add origin https://github.com/YOUR_USERNAME/gravmap.git
```

### "Updates were rejected because the remote contains work"

```bash
# Force push (⚠️ only if you're sure)
git push -f origin main

# Or pull and merge first
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### "Permission denied (publickey)"

```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/YOUR_USERNAME/gravmap.git

# Or setup SSH keys
# https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

## Next Steps

After pushing to GitHub:

1. **Deploy to Vercel**: Connect your GitHub repo to Vercel
2. **Set up secrets**: Add environment variables in GitHub Actions
3. **Enable discussions**: For community support
4. **Add a license**: If not already added (MIT recommended)

## Useful Git Commands

```bash
# View status
git status

# View history
git log --oneline

# View changes
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all changes
git checkout -- .

# Create and switch to new branch
git checkout -b feature/new-feature

# Merge branch
git checkout main
git merge feature/new-feature
```

---

**Need help?** Check GitHub's documentation: https://docs.github.com
