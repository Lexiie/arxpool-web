export interface EncryptedPayload {
  ciphertext: string;
  nonce: string;
}

export function encryptMessage(message: string): EncryptedPayload {
  const nonce = generateNonce();
  const combined = `${nonce}::${message}`;
  return {
    ciphertext: encodeBase64(combined),
    nonce
  };
}

function generateNonce() {
  return Math.random().toString(36).slice(2, 10);
}

function encodeBase64(value: string) {
  if (typeof window === "undefined") {
    return Buffer.from(value).toString("base64");
  }
  return window.btoa(unescape(encodeURIComponent(value)));
}
