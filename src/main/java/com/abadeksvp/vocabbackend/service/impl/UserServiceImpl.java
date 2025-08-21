package com.abadeksvp.vocabbackend.service.impl;

import com.abadeksvp.vocabbackend.exceptions.ApiException;
import com.abadeksvp.vocabbackend.mapping.mapper.SignUpRequestAndUserMapper;
import com.abadeksvp.vocabbackend.mapping.mapper.UserToUserResponseMapper;
import com.abadeksvp.vocabbackend.model.api.SignUpRequest;
import com.abadeksvp.vocabbackend.model.api.UserResponse;
import com.abadeksvp.vocabbackend.model.db.User;
import com.abadeksvp.vocabbackend.repository.UserRepository;
import com.abadeksvp.vocabbackend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final SignUpRequestAndUserMapper createUserRequestToUser;
    private final UserToUserResponseMapper userToUserResponse;

    public UserServiceImpl(UserRepository userRepository,
                           SignUpRequestAndUserMapper createUserRequestToUser,
                           UserToUserResponseMapper userToUserResponse) {
        this.userRepository = userRepository;
        this.createUserRequestToUser = createUserRequestToUser;
        this.userToUserResponse = userToUserResponse;
    }

    @Override
    public UserResponse signUp(SignUpRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new ApiException(MessageFormat.format("User with username {0} already exists.", request.getUsername()), HttpStatus.CONFLICT);
        }
        User newUser = createUserRequestToUser.map(request);
        User createdUser = userRepository.save(newUser);
        return userToUserResponse.map(createdUser);
    }

    @Override
    public Optional<UserResponse> findByUserName(String username) {
        return userRepository.findByUsername(username)
                .map(userToUserResponse::map);
    }

}
