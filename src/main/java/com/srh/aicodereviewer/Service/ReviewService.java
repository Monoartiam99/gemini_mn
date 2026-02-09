package com.srh.aicodereviewer.Service;

import com.srh.aicodereviewer.DTO.ReviewResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    private  final ChatClient chatClient;

    public ReviewService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public ReviewResponse analyzeCode(String codeContent) {
        return chatClient.prompt()
                .system("""
                    You are a Senior Code Auditor. 
                    Analyze the provided code for security, efficiency, and best practices.
                    
                    OUTPUT REQUIREMENTS:
                    1. Calculate a numeric 'score' (0.0 to 100.0) based on quality.
                    2. Provide a 'summary' of your findings.
                    3. List specific 'issues' with 'description' and 'suggestion' (the fix).
                    4. Return the response strictly as a JSON object matching the ReviewResponse schema.
                    """)
                .user(u -> u.text("Please review this code and return JSON:\n\n" + codeContent))
                .call()
                .entity(ReviewResponse.class);
    }
}
