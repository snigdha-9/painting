package com.edu.missouristate.painting.configuration;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.stream.Collectors;

@Component
@Slf4j
public class JwtTokenUtil {
    private final int expireIn;
    private Algorithm algorithm;

    @Autowired
    public JwtTokenUtil(Environment env) {
        expireIn = Integer.parseInt(env.getProperty("spring.jwt.expireIn"));

        this.algorithm = Algorithm.HMAC256(env.getProperty("spring.jwt.secret").getBytes());
    }

    public boolean validate(String token) {
        var jwt = JWT.decode(token);
        algorithm.verify(jwt);

        if (jwt.getExpiresAt().before(Calendar.getInstance().getTime())) {
            log.info("accessToken: {} has expired", token);
            return false;
        }

        return true;
    }

    public String generateToken(User user) {
        return JWT.create().withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + expireIn * 1000))
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(this.algorithm);
    }

    public String getEmail(String token) {
        var jwt = JWT.decode(token);
        return jwt.getSubject();
    }
}
