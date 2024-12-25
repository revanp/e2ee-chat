import sodium from 'libsodium-wrappers';
import { c } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';

export async function generateKeyPair() {
    await sodium.ready;
    return sodium.crypto_kx_keypair();
}

export async function encryptMessage(message: string, key: Uint8Array) {
    const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
    const ciphertext = sodium.crypto_secretbox_easy(message, nonce, key);

    return { ciphertext, nonce };
}

export async function decryptMessage(cipherText: Uint8Array, nonce: Uint8Array, key: Uint8Array) {
    const decrypted = sodium.crypto_secretbox_open_easy(cipherText, nonce, key);
    return new TextDecoder().decode(decrypted);
}