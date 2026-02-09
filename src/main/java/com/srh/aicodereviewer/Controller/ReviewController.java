package com.srh.aicodereviewer.Controller;

import com.srh.aicodereviewer.DTO.ReviewResponse;
import com.srh.aicodereviewer.Service.FileService;
import com.srh.aicodereviewer.Service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/review")
@RequiredArgsConstructor
public class ReviewController {

    private final FileService fileService;
    private final ReviewService reviewService;
    @PostMapping(value = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ReviewResponse> reviewCode(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "code", required = false) String code) throws IOException {

        // Logic: Ensure at least one input is provided
        if ((file == null || file.isEmpty()) && (code == null || code.isBlank())) {
            throw new IllegalArgumentException("Please provide either a file or direct code.");
        }

        String finalCode = fileService.extractText(file, code);
        return ResponseEntity.ok(reviewService.analyzeCode(finalCode));
    }
}
