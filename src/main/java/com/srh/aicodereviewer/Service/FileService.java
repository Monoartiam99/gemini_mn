package com.srh.aicodereviewer.Service;

import org.springframework.ai.document.Document;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FileService {

    public String extractText(MultipartFile file , String rawCode) throws IOException
    {
        if (file!=null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();

            return new String(file.getBytes(), StandardCharsets.UTF_8);
        }
        return rawCode;
    }
}
