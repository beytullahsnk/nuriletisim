import bcrypt from "bcryptjs";
import readline from "node:readline/promises";

async function main() {
  const arg = process.argv[2];
  let password = arg;

  if (!password) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    password = (await rl.question("Yeni admin şifresi: ")).trim();
    rl.close();
  }

  if (!password || password.length < 6) {
    console.error("Şifre en az 6 karakter olmalı.");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);
  console.log("\nADMIN_PASSWORD_HASH=" + hash + "\n");
  console.log("Bu satırı .env.local dosyasına ekleyin.");
}

main();
