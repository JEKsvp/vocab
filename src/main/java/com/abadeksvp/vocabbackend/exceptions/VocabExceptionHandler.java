package com.abadeksvp.vocabbackend.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.text.MessageFormat;
import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
@Slf4j
public class VocabExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatusCode status,
                                                                  WebRequest request) {
        List<String> messages = ex.getFieldErrors().stream()
                .map(fieldError -> MessageFormat.format("Validation error. Field: {0}; message: {1}.", fieldError.getField(), fieldError.getDefaultMessage()))
                .collect(Collectors.toList());
        ErrorResponse body = ErrorResponse.builder()
                .messages(messages)
                .build();
        return new ResponseEntity<>(body, headers, status);
    }


    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse> handleApiException(ApiException ex) {
        ErrorResponse apiError = new ErrorResponse(List.of(ex.getMessage()));
        log.info("ApiException occurred", ex);
        return new ResponseEntity<>(apiError, ex.getHttpStatus());
    }
}
