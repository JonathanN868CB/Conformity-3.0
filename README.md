# Conformity 3.0 Prototype

Local-first front-end prototype of a premium digital aircraft conformity binder experience built with React + TypeScript + Vite.

## Local run (Windows / PowerShell)

You only need Node.js and npm. You do **not** need Netlify, a backend, or a database for this prototype.

### 1) Install Node.js (one-time)
- Install Node.js 20 LTS from: https://nodejs.org
- Verify:

```powershell
node -v
npm -v
```

### 2) Open PowerShell and go to the project folder
If the path contains spaces or dashes, wrap it in quotes:

```powershell
cd "C:\Users\dmo\OneDrive - Desert Jet\Documents\Conformity 3.0"
```

Alternative (more explicit):

```powershell
Set-Location -LiteralPath "C:\Users\dmo\OneDrive - Desert Jet\Documents\Conformity 3.0"
```

Check you are in the right folder:

```powershell
pwd
```


### PowerShell execution policy error (`npm.ps1 cannot be loaded`)
If you see this error, PowerShell is blocking script execution. Use one of these options:

**Option A (recommended, per-session only):**

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm install
```

This only affects the current PowerShell window and resets when you close it.

**Option B (current user profile):**

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Then restart PowerShell and run:

```powershell
npm install
npm run dev
```

**Option C (avoid PowerShell scripts):**
Use Command Prompt instead:

```cmd
npm install
npm run dev
```


### npm ENOENT (`Could not read package.json`)
This means your current folder does not contain the project files yet.

Run these checks:

```powershell
pwd
Get-ChildItem
Test-Path .\package.json
```

If `package.json` is missing (`False`), do one of the following:

1) **Go to the correct folder** (where this repo was saved/cloned):

```powershell
Set-Location -LiteralPath "C:\path\to\the\actual\Conformity-3.0"
```

2) **Clone/download the repo into your current folder**, then run:

```powershell
npm install
npm run dev
```

Quick fix for OneDrive path confusion:
- In File Explorer, open the folder you expect to use.
- Verify `package.json` is visible in that folder.
- Click the path bar, copy the exact path, then in PowerShell:

```powershell
# Replace with a real path. Do NOT type angle brackets.
Set-Location -LiteralPath "C:\Users\dmo\OneDrive - Desert Jet\Documents\Conformity-3.0"
Test-Path .\package.json
```

Only run npm commands after `Test-Path .\package.json` returns `True`.


Find `package.json` anywhere under Documents:

```powershell
Get-ChildItem "$HOME\Documents" -Filter package.json -File -Recurse -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty FullName
```

If you only see `package-lock.json` and no `package.json`, the project files were never copied/cloned to that folder.
In that case, clone/download the repo first, then rerun `npm install`.

### 3) Install dependencies
From the project folder:

```powershell
npm install
```

### 4) Start dev server

```powershell
npm run dev
```

Vite is configured to use `http://localhost:5170`.

## Build preview (optional)

```powershell
npm run build
npm run preview
```

Preview also runs on `http://localhost:5170`.

## Connect your local terminal to these changes

This AI session edits files in a separate workspace. Your PowerShell folder only sees those changes after you sync via Git.

### Option A: Pull from your remote repo (recommended)

1. In PowerShell, make sure this folder is a Git repo:

```powershell
git status
```

2. If it is **not** a repo, clone it first:

```powershell
git clone <your-repo-url> .
```

3. Fetch and switch to the branch with the latest changes:

```powershell
git fetch --all
git checkout work
git pull origin work
```

4. Confirm files exist before npm commands:

```powershell
Test-Path .\package.json
```

### Option B: Download the branch zip
- Download the `work` branch ZIP from your Git host.
- Extract it into your local folder.
- Confirm `package.json` exists, then run npm commands.

### Run the app after syncing

```powershell
npm install
npm run dev
```

Open `http://localhost:5170`.
