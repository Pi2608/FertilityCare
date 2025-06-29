package hsf302.com.hiemmuon.utils;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.net.URLEncoder;
import java.util.*;

public class VNPayUtil {

    private static final String HMAC_SHA512 = "HmacSHA512";

    /**
     * Generate HMAC SHA512 hash
     * @param key Secret key for HMAC
     * @param data Data to be hashed
     * @return Hexadecimal string representation of the hash
     * @throws RuntimeException if hashing fails
     */
    public static String hmacSHA512(String key, String data) {
        if (key == null || key.isEmpty()) {
            throw new IllegalArgumentException("Key cannot be null or empty");
        }
        if (data == null) {
            throw new IllegalArgumentException("Data cannot be null");
        }

        try {
            Mac hmac512 = Mac.getInstance(HMAC_SHA512);
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), HMAC_SHA512);
            hmac512.init(secretKey);
            byte[] bytes = hmac512.doFinal(data.getBytes(StandardCharsets.UTF_8));

            StringBuilder sb = new StringBuilder(2 * bytes.length);
            for (byte b : bytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("HMAC SHA512 algorithm not available", e);
        } catch (InvalidKeyException e) {
            throw new RuntimeException("Invalid key for HMAC SHA512", e);
        } catch (Exception e) {
            throw new RuntimeException("Error while generating HMAC SHA512", e);
        }
    }

    /**
     * Create hash data from sorted parameters (for VNPay signature verification)
     * @param params Map of parameters
     * @return URL-encoded query string for hashing
     */
    public static String createHashData(Map<String, String> params) {
        if (params == null || params.isEmpty()) {
            return "";
        }

        List<String> fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();

        for (String field : fieldNames) {
            String value = params.get(field);
            if (value != null && !value.isEmpty()) {
                if (hashData.length() > 0) {
                    hashData.append('&');
                }
                hashData.append(field).append('=').append(URLEncoder.encode(value, StandardCharsets.UTF_8));
            }
        }

        return hashData.toString();
    }

    /**
     * Create query string from parameters (for VNPay URL)
     * @param params Map of parameters
     * @return URL-encoded query string
     */
    public static String createQueryString(Map<String, String> params) {
        return createHashData(params); // Same logic for query string
    }

    /**
     * Verify VNPay signature
     * @param params All parameters from VNPay callback
     * @param secretKey VNPay secret key
     * @return true if signature is valid, false otherwise
     */
    public static boolean verifySignature(Map<String, String> params, String secretKey) {
        if (params == null || !params.containsKey("vnp_SecureHash")) {
            return false;
        }

        String vnp_SecureHash = params.get("vnp_SecureHash");

        // Create a copy without signature fields
        Map<String, String> paramsToHash = new HashMap<>(params);
        paramsToHash.remove("vnp_SecureHash");
        paramsToHash.remove("vnp_SecureHashType");

        String hashData = createHashData(paramsToHash);
        String calculatedHash = hmacSHA512(secretKey, hashData);

        return calculatedHash.equals(vnp_SecureHash);
    }

    /**
     * Generate secure hash for VNPay parameters
     * @param params Parameters to hash
     * @param secretKey VNPay secret key
     * @return Generated hash
     */
    public static String generateSecureHash(Map<String, String> params, String secretKey) {
        String hashData = createHashData(params);
        return hmacSHA512(secretKey, hashData);
    }
}