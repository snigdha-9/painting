package com.edu.missouristate.painting.controllers;

import com.edu.missouristate.painting.dtos.PaintingPublishRequest;
import com.edu.missouristate.painting.models.Painting;
import com.edu.missouristate.painting.services.FileStorageService;
import com.edu.missouristate.painting.services.PaintingService;
import com.edu.missouristate.painting.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.security.Principal;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/paintings")
@Slf4j
public class PaintingController {
    private final PaintingService paintingService;
    private final UserService userService;
    private final FileStorageService fileStorageService;

    @Autowired
    public PaintingController(PaintingService paintingService, UserService userService, FileStorageService fileStorageService) {
        this.paintingService = paintingService;
        this.userService = userService;
        this.fileStorageService = fileStorageService;
    }

    @PostMapping
    public ResponseEntity<?> publish(@Valid @RequestBody PaintingPublishRequest request, Principal principal) {
        var user = this.userService.getByEmail(principal.getName()).get();

        var painting = new Painting();
        painting.setPublisher(user);
        painting.setName(request.getName());
        painting.setDescription(request.getDescription());
        painting.setUrl(request.getUrl());

        var createdPainting = this.paintingService.publish(painting);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdPainting);
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        var paintings = this.paintingService.getAll();

        return ResponseEntity.ok(paintings);
    }

    @PostMapping("/img")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/paintings/img/")
                .path(fileName)
                .toUriString();

        return ResponseEntity.ok().body(Map.entry("url", fileDownloadUri));
    }

    @GetMapping("/img/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        contentType = Optional.ofNullable(contentType).orElse("application/octet-stream");

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
