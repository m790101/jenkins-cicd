import { sampleSize } from "lodash"
import * as crypto from 'crypto-js';
/**
 * 產生指定長度隨機英文字串
 * @param length 字串長度
 * @returns Random string
 */
export const getRandomString = (length: number) => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const randomChars = sampleSize(characters, length)
    return randomChars.join("")
  }

  /**
 * 隨機產生長度為32字串，由英數字組成 (為AES Key使用)
 */
export const genSessionCode = (): string => {
    const range = "abcdefghijklmnopqrstuvwxyz1234567890".split("")
    let key = ""
    for (let i = 0; i < 32; i++) {
      const randomBuffer = new Uint32Array(1)
      window.crypto.getRandomValues(randomBuffer)
      const randomNumber = randomBuffer[0] / (0xffffffff + 1)
      key += range[Math.floor(randomNumber * range.length)]
    }
    return key
  }

  /**
 * aes加密，將加密過後的資料轉成base64url給後端
 */
export const encryptUsingAES256 = (
    data: string,
    aesKey: string,
    iv: string
  ): string => {
    const base64Key = btoa(aesKey)
    const base64Iv = btoa(iv)
    const encKey = crypto.enc.Base64.parse(base64Key) // to WordArray
    const encIv = crypto.enc.Base64.parse(base64Iv) // to WordArray
  
    const encrypted = crypto.AES.encrypt(data, encKey, {
      keySize: 256 / 8,// 256 bits / 8 = 32 bytes
      iv: encIv, //base64 wordArray
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    })
  
    return encrypted.toString()
  }

    /**
     * aes解密，將base64url的資料解密
     * @param data base64url的資料
     * @param aesKey aes key
     * @param iv iv
     * @returns 解密後的資料
     * @throws {Error} 解密失敗
     * @throws {Error} 解密失敗
        */
    export const decryptUsingAES256 = ( data: string, aesKey: string, iv: string): string => { 
        const base64Key = btoa(aesKey)
        const base64Iv = btoa(iv)
        const encKey = crypto.enc.Base64.parse(base64Key) // to WordArray
        const encIv = crypto.enc.Base64.parse(base64Iv) // to WordArray
        try {
          const decrypted = crypto.AES.decrypt(data, encKey, {
            keySize: 256 / 8,// 256 bits / 8 = 32 bytes
            iv: encIv, //base64 wordArray
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7,
          })
          return decrypted.toString(crypto.enc.Utf8)
        } catch (error) {
          throw new Error("解密失敗")
        }
      }
