/**
 * Utility class for the AES-128/256 encryption.
 *
 *   - AES-128/256
 *   - CBC mode
 *   - PKCS#5 Padding
 *   - Base64 Encoding
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare namespace AesPkcs5 {
    /**
     * Encrypt data
     *
     * @param data Target data
     * @param key Key value of the encryption.
     * @param iv Initializer Vector for the encryption
     * @return Encrypted data
     */
    function encrypt(data: string, key: string, iv: string): string;
    /**
     * Decrypt data.
     *
     * @param data Target data
     * @param key Key value of the decryption.
     * @param iv Initializer Vector for the decryption
     * @return Decrypted data.
     */
    function decrypt(data: string, key: string, iv: string): string;
}
