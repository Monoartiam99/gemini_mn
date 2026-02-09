package com.srh.aicodereviewer;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {
@Bean
    public ChatClient chatClient(ChatClient.Builder builder)
    {
        return builder
                .defaultSystem("""
             You are a Senior Full-Stack Engineer and Security Researcher.
             Your task is to review code for bugs, security vulnerabilities, and\s
             performance bottlenecks.
       Always provide your feedback in a structured JSON format\s
       that matches the provided DTO schema.
       Be concise, professional, and provide refactored code snippets\s
        for critical issues.
       """)
                .build();
    }
}
