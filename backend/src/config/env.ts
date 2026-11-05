import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("5000"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  FIREBASE_PROJECT_ID: z.string().min(1),
  FIREBASE_PRIVATE_KEY: z.string().min(1),
  FIREBASE_CLIENT_EMAIL: z.string().email(),
  // Web API key from Firebase console → Project Settings → General
  // Required for verifying user passwords via the Identity Toolkit REST API
  FIREBASE_API_KEY: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  ACCESS_TOKEN_EXPIRES_IN: z.string().default("15m"),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default("7d"),
  ALLOWED_ORIGINS: z.string().default("http://localhost:3000"),
  LOGIN_RATE_LIMIT_WINDOW_MS: z.string().default("900000"),
  LOGIN_RATE_LIMIT_MAX: z.string().default("10"),
});

let parsedEnv: z.infer<typeof envSchema>;

try {
  parsedEnv = envSchema.parse(process.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    console.error("\n❌ Environment configuration error in backend/.env:");
    err.issues.forEach((issue) => {
      console.error(`   • ${issue.path.join(".")}: ${issue.message}`);
    });
    console.error("\nPlease check your backend/.env file and restart the server.\n");
    process.exit(1);
  }
  throw err;
}

export const env = parsedEnv;

