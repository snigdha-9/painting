package com.edu.missouristate.painting.controllers;

import com.edu.missouristate.painting.dtos.UserLoginRequest;
import com.edu.missouristate.painting.dtos.UserRegisterRequest;
import com.edu.missouristate.painting.dtos.UserResponse;
import com.edu.missouristate.painting.models.User;
import com.edu.missouristate.painting.services.AuthService;
import com.edu.missouristate.painting.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {
    private AuthService authService;
    private UserService userService;

    @Autowired
    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/register") // Map ONLY POST Requests
    @ResponseBody
    public ResponseEntity<?> signUp(@Valid @RequestBody UserRegisterRequest userRequest) {
        try {
            User user = new User();
            user.setEmail(userRequest.getEmail());
            user.setFirstName(userRequest.getFirstName());
            user.setPassword(userRequest.getPassword());
            user.setLastName(userRequest.getLastName());

            var createdUser = this.authService.signUp(user);
            log.info("User created {} with success", createdUser);

            UserResponse userResponse = new UserResponse();
            userResponse.setId(createdUser.getId());
            userResponse.setEmail(createdUser.getEmail());
            userResponse.setLastName(createdUser.getLastName());
            userResponse.setFirstName(createdUser.getFirstName());

            return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
        } catch (DataIntegrityViolationException exception) {
            log.error(exception.toString());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
        }
    }

    @PostMapping("login") // Map ONLY POST Requests
    @ResponseBody
    public ResponseEntity<?> signIn(@Valid @RequestBody UserLoginRequest userLoginRequest) {
        User user = new User();
        user.setEmail(userLoginRequest.getEmail());
        user.setPassword(userLoginRequest.getPassword());

        String accessToken = this.authService.signIn(user);
        log.info("User {} logged with success", user.getEmail());

        return ResponseEntity.ok().body(Map.entry("accessToken", accessToken));
    }
}
