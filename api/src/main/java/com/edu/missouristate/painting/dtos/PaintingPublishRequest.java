package com.edu.missouristate.painting.dtos;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class PaintingPublishRequest {
    @NotEmpty
    private String name;
    @NotEmpty
    private String description;
    @NotEmpty
    private String url;
}
