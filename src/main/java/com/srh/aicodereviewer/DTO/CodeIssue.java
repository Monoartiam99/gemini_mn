package com.srh.aicodereviewer.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CodeIssue {
    private int line;
    private String type;
    private String severity;
    private String description;
    private String suggestion;


}
