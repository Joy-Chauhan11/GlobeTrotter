import dotenv from "dotenv";
dotenv.config();
import * as PrismaPkg from "@prisma/client";

// Handle different packaging formats: some installs expose PrismaClient as a
// named export, others as a default. Try common variants.
const PrismaClientCtor =
	PrismaPkg.PrismaClient || PrismaPkg.default?.PrismaClient || PrismaPkg.default || PrismaPkg;

if (!PrismaClientCtor) {
	throw new Error("Could not locate PrismaClient constructor from @prisma/client");
}

// Ensure a single PrismaClient instance in development (avoid exhausting connections)
const globalForPrisma = globalThis;

// We must supply a driver adapter for Prisma v7+. Determine adapter from DATABASE_URL.
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
	throw new Error(
		"DATABASE_URL not set. Set DATABASE_URL in your environment or .env file."
	);
}

let adapterPackage = null;
if (dbUrl.startsWith("file:") || dbUrl.includes("sqlite")) {
	adapterPackage = "@prisma/adapter-sqlite";
} else if (dbUrl.startsWith("postgres") || dbUrl.includes("postgresql")) {
	adapterPackage = "@prisma/adapter-pg";
} else if (dbUrl.startsWith("mysql") || dbUrl.includes("mysql")) {
	adapterPackage = "@prisma/adapter-mysql";
}

if (!adapterPackage) {
	throw new Error(
		"Could not determine Prisma adapter from DATABASE_URL. Install a compatible adapter (e.g. @prisma/adapter-pg or @prisma/adapter-sqlite) and set DATABASE_URL."
	);
}

// Dynamically import the adapter and instantiate PrismaClient with it.
let prisma;
try {
	const adapterModule = await import(adapterPackage);
	// pick the first exported constructor/function from the adapter package
	const AdapterCtor = Object.values(adapterModule).find((v) => typeof v === "function");
	if (!AdapterCtor) {
		throw new Error(`No adapter constructor found in ${adapterPackage}`);
	}

	const adapter = new AdapterCtor({ connectionString: dbUrl });

	prisma = globalForPrisma.__prismaClient || new PrismaClientCtor({ adapter });
	if (process.env.NODE_ENV !== "production") globalForPrisma.__prismaClient = prisma;
} catch (err) {
	throw new Error(
		`Failed to load Prisma adapter package '${adapterPackage}'. Install it with 'npm install ${adapterPackage}' and ensure DATABASE_URL is set.\nOriginal error: ${err.message}`
	);
}

export default prisma;
