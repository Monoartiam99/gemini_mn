package com.srh.aicodereviewer.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {
   private double score;
   private String verdict;
   private String summary;
   private List<CodeIssue> issues= new ArrayList<>();
}
