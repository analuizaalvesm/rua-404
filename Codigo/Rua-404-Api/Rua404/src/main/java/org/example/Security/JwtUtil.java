package org.example.Security;

import java.util.Date;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtUtil {

    private static final String SECRET_KEY = "seu_segredo_aqui"; // Troque por uma chave mais segura

    public static String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 horas
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
    public static String generateAdmToken(String email){
        return Jwts.builder() .setSubject(email)
        .claim("role", "ADMIN") 
        .setIssuedAt(new Date(System.currentTimeMillis())) 
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) 
        .signWith(SignatureAlgorithm.HS256, SECRET_KEY) .compact();
    }
}
