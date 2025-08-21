package com.abadeksvp.vocabbackend.model.api.paging;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PagingDto {
    private long size;
    private long totalElements;
    private long totalPages;
    private long number;
}
