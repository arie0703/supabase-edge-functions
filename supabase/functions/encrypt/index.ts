import { Aes } from "https://deno.land/x/crypto@v0.10.1/aes.ts";
import {
  Cbc,
  Padding,
} from "https://deno.land/x/crypto@v0.10.1/block-modes.ts";

Deno.serve(async (req) => {
  const te = new TextEncoder();
  const { plainText } = await req.json();

  // Environment Variables
  const ENCRYPTION_SECRET = Deno.env.get("ENCRYPTION_SECRET");
  const ENCRYPTION_IV = Deno.env.get("ENCRYPTION_IV");

  const key = te.encode(ENCRYPTION_SECRET);
  const data = te.encode(plainText);
  const iv = te.encode(ENCRYPTION_IV);

  const cipher = new Cbc(Aes, key, iv, Padding.PKCS7);
  const encrypted = cipher.encrypt(data);

  const response = {
    encrypted: encrypted,
  };

  return new Response(
    JSON.stringify(response),
    { headers: { "Content-Type": "application/json" } },
  );
});
