# TokenLogin — Quick User Guide

> Lunar Client token login  
> Version: **1.0.0**  
> Author: **mihirgala** (github.com/mihiirgala)

This README explains **only how to use the pre-built `tokenlogin.exe`**. The source code is not included with this release.

---

## What this does
`tokenlogin.exe` adds a Minecraft account to your Lunar Client by writing an account entry into Lunar Client’s `accounts.json`. It does **not** require the Lunar Launcher to be open while performing the operation (but the launcher should be closed while running the tool).

---

## Requirements
- Windows 10 or 11 (64-bit recommended)  
- Lunar Client installed on the same Windows user account (default path: `%USERPROFILE%\.lunarclient\settings\game\accounts.json`)  
- `tokenlogin.exe` (this executable)

---

## Installation
1. Download `tokenlogin.exe` and `icon.ico` (if provided) into a folder you control (e.g., `C:\Tools\TokenLogin`).
2. (Optional) Keep a backup of your Lunar Client accounts file before running (explained below).

---

## Backup (recommended)
Before using the tool, back up your existing Lunar accounts file:

1. Open File Explorer.
2. Navigate to:
3. Copy `accounts.json` to something like `accounts.json.bak`.

This lets you restore your previous accounts if anything goes wrong.

---

## How to run

- Close Lunar Client / Launcher.
- Double-click `tokenlogin.exe`.
- The program opens a console window and prompts:
- Paste the access token and press Enter.
- The program will fetch the Minecraft profile, add it to Lunar Client, and print success/failure messages.
