# TokenLogin — Quick User Guide

> Lunar Client token login  
> Version: **1.0.0**  
> Author: **mihirgala** (github.com/mihirgala)

This README explains **how to use the pre-built `tokenlogin.exe`**.

---

## What this does
`tokenlogin.exe` adds a Minecraft account to Lunar Client by writing an account entry into Lunar Client’s `accounts.json`.  
It does **not** require the Lunar Launcher to be open while performing the operation (but the launcher **must be closed** while running the tool).

---

## Requirements
- Windows 10 or 11 (64-bit recommended)  
- Lunar Client installed on the same Windows user account  
  (default path: `%USERPROFILE%\.lunarclient\settings\game\accounts.json`)  
- `tokenlogin.exe`

---

## Installation
1. Download `tokenlogin.exe` into any folder you control (e.g., `C:\Tools\TokenLogin`).  
2. (Optional) Keep a backup of your Lunar Client accounts file before running (explained below).

---

## Backup (recommended)
Before using the tool, back up your existing Lunar accounts file:

1. Open File Explorer.  
2. Navigate to:  
   `%USERPROFILE%\.lunarclient\settings\game\accounts.json`  
3. Copy `accounts.json` to something like `accounts.json.bak`.

This lets you restore your previous accounts if anything goes wrong.

---

## How to run
<<<<<<< HEAD
- Close **Lunar Client** and **Lunar Launcher** completely.  
- Double-click **`tokenlogin.exe`**.  
- A console window will open and prompt you for your **access token**.  
- Paste the token and press **Enter**.  
- The program will fetch your Minecraft profile, add it to Lunar Client, and display success or error messages.

---
=======
- Close Lunar Client / Launcher.
- Double-click `tokenlogin.exe`.
- The program opens a console window and prompts:
- Paste the access token and press Enter.
- The program will fetch the Minecraft profile, add it to Lunar Client, and print success/failure messages.
>>>>>>> 715f2c3752e597adc813bf26420e7377063b6584
