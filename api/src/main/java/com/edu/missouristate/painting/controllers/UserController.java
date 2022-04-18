package com.edu.missouristate.painting.controllers;

import com.edu.missouristate.painting.dtos.UserResponse;
import com.edu.missouristate.painting.models.User;
import com.edu.missouristate.painting.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
@Slf4j
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> getUsers() {
        var users = this.userService.getAll();

        return ResponseEntity.ok().body(users.stream().map(UserController::createUserResponse));
    }

    @GetMapping("me")
    public ResponseEntity<?> getUser(Principal principal) {
        var user = this.userService.getByEmail(principal.getName());

        UserResponse userResponse = null;
        if (user.isPresent()) {
            userResponse = createUserResponse(user.get());
        }

        return ResponseEntity.ok().body(userResponse);
    }

    private static UserResponse createUserResponse(User user) {
        var userResponse = new UserResponse();
        userResponse.setFirstName(user.getFirstName());
        userResponse.setEmail(user.getEmail());
        userResponse.setLastName(user.getLastName());
        userResponse.setId(user.getId());

        return userResponse;
    }
}
