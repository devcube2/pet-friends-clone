package util;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CubeCrypto {
	// 내부 정적 클래스를 활용한 LazyHolder 방식 (메인 클래스 로딩시 생성)
	private static class SingletonHolder {
		private static final CubeCrypto INSTANCE = new CubeCrypto();
	}

	private CubeCrypto() {
	}

	// getInstance() 메서드를 통해 싱글턴 객체 반환
	public static CubeCrypto getInstance() {
		return SingletonHolder.INSTANCE;
	}

	public String encrypt(String data, byte[] key, byte[] iv) throws NoSuchAlgorithmException, NoSuchPaddingException,
			InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException,
			IllegalArgumentException, Exception {		
		SecretKey secretKey = new SecretKeySpec(key, "AES");
		IvParameterSpec ivSpec = new IvParameterSpec(iv);

		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivSpec);

		byte[] encryptedBytes = cipher.doFinal(data.getBytes());

		return Base64.getEncoder().encodeToString(encryptedBytes);
	}

	public String decrypt(String data, byte[] key, byte[] iv) {
		try {
			SecretKey secretKey = new SecretKeySpec(key, "AES");
			IvParameterSpec ivSpec = new IvParameterSpec(iv);

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, secretKey, ivSpec);

			byte[] decodedBytes = Base64.getDecoder().decode(data);
			byte[] decryptedBytes = cipher.doFinal(decodedBytes);

			return new String(decryptedBytes);
		} catch (NoSuchAlgorithmException e) {
			log.error("No Such Algorithm: " + e.getMessage());
		} catch (NoSuchPaddingException e) {
			log.error("No Such Padding: " + e.getMessage());
		} catch (InvalidKeyException e) {
			log.error("Invalid Key: " + e.getMessage());
		} catch (InvalidAlgorithmParameterException e) {
			log.error("Invalid Algorithm Parameter: " + e.getMessage());
		} catch (IllegalBlockSizeException e) {
			log.error("Illegal Bloack Size: " + e.getMessage());
		} catch (BadPaddingException e) {
			log.error("Bad Padding: " + e.getMessage());
		} catch (IllegalArgumentException e) {
			log.error("Illegal Argument: " + e.getMessage());
		} catch (Exception e) {
			log.error("Etc Error: " + e.getMessage());
			e.printStackTrace();
		}

		return null;
	}
	
	public String makeSafePassword(String password, String salt) {
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");

			// password + salt 를 조합하여 bytes 배열로 넣어준후, sha256 해시 byte 배열을 받는다.
			byte[] hashBytes = digest.digest((password + salt).getBytes());

			// 바이트 배열을 Base64 인코딩한 문자열로 리턴한다.
			return Base64.getEncoder().encodeToString(hashBytes);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace(); 
			return null;
		}
	}
	
	// 패스워드가 일치하면 true , 불일치하면 false
	public boolean compareHash(String password, String salt, String hashString) {
		return makeSafePassword(password, salt).equals(hashString); 
	}
}
