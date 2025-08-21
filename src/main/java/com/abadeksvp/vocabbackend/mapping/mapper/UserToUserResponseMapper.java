package com.abadeksvp.vocabbackend.mapping.mapper;

import com.abadeksvp.vocabbackend.mapping.mapper.Mapper;
import com.abadeksvp.vocabbackend.model.api.UserResponse;
import com.abadeksvp.vocabbackend.model.db.User;
import org.springframework.stereotype.Service;

@Service
public class UserToUserResponseMapper implements Mapper<User, UserResponse> {

    @Override
    public UserResponse map(User user) {
        return UserResponse.builder()
                .id(user.getId().toString())
                .username(user.getUsername())
                .build();
    }
}
