# GravMap Setup Guide

Complete these steps to finish the Day 1 setup.

## 1. Create GitHub Repository

**Via Web UI:**
1. Go to https://github.com/organizations/gravmapco/repositories/new
2. Repository name: `gravmap`
3. Description: `GravMap - Your platform for mapping and visualizing gravitational data`
4. Visibility: Public
5. Do NOT initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

**Then push the code:**
```bash
cd /home/hazbean/.openclaw/workspace/gravmap
git remote add origin https://github.com/gravmapco/gravmap.git
git branch -M main
git push -u origin main
```

## 2. Set Up Supabase

1. Go to https://supabase.com
2. Create a new project or use existing
3. Get your credentials from Project Settings > API:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Update `.env.local`:
```bash
nano /home/hazbean/.openclaw/workspace/gravmap/.env.local
```

## 3. Deploy to Vercel

**Via Web UI (Recommended):**
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select `gravmapco/gravmap`
4. Configure:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next` (auto-detected)
5. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"
7. Wait for deployment to complete (~2 minutes)
8. Your app will be live at `gravmap.vercel.app` or similar

**Via CLI (Alternative):**
```bash
cd /home/hazbean/.openclaw/workspace/gravmap
vercel login
vercel --prod
```

## 4. Verify Everything Works

1. Visit your Vercel deployment URL
2. Check that the landing page loads
3. Verify navigation works
4. Test responsive design on mobile

## 5. Next Steps

After Day 1 setup is complete:
- [ ] Set up Supabase database schema
- [ ] Implement authentication flows
- [ ] Create dashboard page
- [ ] Add protected routes middleware
- [ ] Set up CI/CD with GitHub Actions

## Troubleshooting

**Build fails on Vercel:**
- Check that all dependencies are in package.json
- Verify Node.js version (18+ required)
- Check build logs for specific errors

**Environment variables not working:**
- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new environment variables
- Check Vercel project settings > Environment Variables

**Styles not loading:**
- Verify Tailwind CSS is configured correctly
- Check that globals.css is imported in layout.tsx
- Clear browser cache and rebuild

## Status Checklist

- [x] Next.js 14 initialized
- [x] TypeScript configured
- [x] Tailwind CSS with custom theme
- [x] Shadcn/UI components installed
- [x] Core dependencies added
- [x] Supabase client setup
- [x] Layout and navigation created
- [x] Landing page built
- [x] Code committed locally
- [ ] GitHub repository created (manual)
- [ ] Vercel deployment (manual)

---

**Build Log:** `/home/hazbean/.openclaw/workspace/startup/build-log/day1.md`
