package com.edu.missouristate.painting.services;

import com.edu.missouristate.painting.configuration.JwtTokenUtil;
import com.edu.missouristate.painting.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;

    private UserService usersService;
    private JwtTokenUtil jwtTokenUtil;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager, UserService usersService, JwtTokenUtil jwtTokenUtil, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.usersService = usersService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String signIn(User _user) {
        Authentication authenticate = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(_user.getEmail(), _user.getPassword()));

        org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) authenticate.getPrincipal();

        return this.jwtTokenUtil.generateToken(user);
    }

    @Override
    public User signUp(User _user) {
        User user = _user.withPassword(this.passwordEncoder.encode(_user.getPassword()));
        return this.usersService.create(user);
    }
}
