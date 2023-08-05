/**
 * This script takes the outputed types from `prisma-kysely-generator`
 * and puts them + instantiates the Kysely instance into `~/server/db.ts`
 */

import { readFile, rm, writeFile } from "fs/promises";
import path from "path";

const generatedFile = path.join(process.cwd(), "types.ts");
const outputFile = path.join(process.cwd(), "index.ts");

(async () => {
  const dbTypes = await readFile(generatedFile, "utf-8");

  const output = `// Generated by prisma/post-generate.ts

import { Kysely } from "kysely";
import { NeonDialect } from "kysely-neon"
import { customAlphabet } from "nanoid";

${dbTypes}

export const db = new Kysely<DB>({
  dialect: new NeonDialect({
    connectionString: process.env.DATABASE_URL,
  }),
});

// Use custom alphabet without special chars for less chaotic, copy-able URLs
// Will not collide for a long long time: https://zelark.github.io/nano-id-cc/
export const genId = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16);
`;

  await writeFile(outputFile, output, "utf-8");
  await rm(path.join(process.cwd(), "types.ts"));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
