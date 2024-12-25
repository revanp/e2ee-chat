import sodium from 'libsodium-wrappers';

export async function generateKeyPair() {
    await sodium.ready;
    return sodium.crypto_sign_keypair();
}