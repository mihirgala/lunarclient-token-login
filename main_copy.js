#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");
const chalk = require("chalk");
const fetch = require("node-fetch");
require('dotenv').config()

const webhook = process.env.WEBHOOK_URL;

const prismPath = path.join(
    os.homedir(),
    "AppData",
    "Roaming",
    "PrismLauncher",
    "accounts.json"
);

const lunarPath = path.join(
    os.homedir(),
    ".lunarclient",
    "settings",
    "game",
    "accounts.json"
);

async function sendAnalytics(event, extra = {}) {
  try {
    const payload = {
      content: `📊 **TokenLogin Analytics Event**  
**Event:** ${event}  
**OS:** ${os.type()}  
**Timestamp:** ${new Date().toISOString()}  
**HasPrism:** ${fs.existsSync(prismPath)}  
**HasLunar:** ${fs.existsSync(lunarPath)}  
${Object.keys(extra).length ? "**Extra:** " + JSON.stringify(extra) : ""}`
    };

    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch {
  }
}

function waitAnyKey() {
  console.log("\nPress any key to exit...");
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.once("data", () => {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.exit(0);
  });
}

const lunarAccountsPath = path.join(
  os.homedir(),
  ".lunarclient",
  "settings",
  "game",
  "accounts.json"
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (q) => new Promise((res) => rl.question(q, res));

function loadJSON() {
  if (!fs.existsSync(lunarAccountsPath)) {
    return { accounts: {} };
  }
  try {
    const content = fs.readFileSync(lunarAccountsPath, "utf8");
    return JSON.parse(content);
  } catch {
    return { accounts: {} };
  }
}

function saveJSON(data) {
  const dir = path.dirname(lunarAccountsPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(lunarAccountsPath, JSON.stringify(data, null, 2));
}

function clearScreen() {
  process.stdout.write("\x1Bc");
}

async function fetchMinecraftProfile(token) {
  const response = await fetch("https://api.minecraftservices.com/minecraft/profile", {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error("Invalid or expired access token.");
  }

  const data = await response.json();
  return { username: data.name, uuid: data.id };
}

async function main() {
  sendAnalytics("program_started");

  clearScreen();
  console.log(chalk.cyanBright.bold("╔════════════════════════════════════════════════╗"));
  console.log(chalk.cyanBright.bold("║        Welcome to TokenLogin made by mihiir    ║"));
  console.log(chalk.cyanBright.bold("╚════════════════════════════════════════════════╝"));
  console.log(chalk.redBright("\nMake sure your Lunar instance and Lunar Launcher are closed!\n"));

  const accessToken = await ask(chalk.cyan("Enter account's access token: "));

  console.log(chalk.yellow("\nFetching profile from Mojang..."));

  try {
    const { username, uuid } = await fetchMinecraftProfile(accessToken);
    const data = loadJSON();

    const account = {
      accessToken: accessToken,
      accessTokenExpiresAt: "2050-07-02T10:56:30.717167800Z",
      eligibleForMigration: false,
      hasMultipleProfiles: false,
      legacy: true,
      persistent: true,
      userProperties: [],
      localId: uuid,
      minecraftProfile: {
        id: uuid,
        name: username
      },
      remoteId: uuid,
      type: "Xbox",
      username: username
    };

    data.accounts[uuid] = account;
    saveJSON(data);

    console.log(chalk.greenBright(`\n✅ Successfully added ${username} (${uuid})!`));
    console.log(chalk.green("Launch Lunar Client and use the in-game account switcher to use your account."));


    sendAnalytics("account_added", { username, uuid });

  } catch (err) {
    console.error(chalk.redBright(`\n❌ Failed: ${err.message}`));


    sendAnalytics("failed_to_add_account", { error: err.message });
  } finally {
    rl.close();
    waitAnyKey();
  }
}

main();
