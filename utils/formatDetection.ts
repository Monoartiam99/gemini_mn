import { FileFormat } from '../types';

interface FormatPattern {
  format: FileFormat;
  patterns: RegExp[];
  keywords: string[];
}

const FORMAT_PATTERNS: FormatPattern[] = [
  {
    format: FileFormat.PYTHON,
    patterns: [
      /^\s*(def\s+\w+|class\s+\w+|import\s+\w+|from\s+\w+\s+import)/m,
      /^\s*(if\s+__name__|for\s+\w+\s+in|while\s+\w+:|try:|except:|with\s+)/m,
      /:\s*$/m,
    ],
    keywords: ['def ', 'class ', 'import ', 'from ', '__name__', 'self', 'elif', 'except', 'finally', 'with', 'async def'],
  },
  {
    format: FileFormat.JAVA,
    patterns: [
      /^\s*(public|private|protected|static)\s+(class|interface|enum)\s+\w+/m,
      /^\s*(public|private|protected)?\s+static\s+void\s+main/m,
      /(extends|implements)\s+\w+/,
      /@Override|@Deprecated|@FunctionalInterface/,
    ],
    keywords: ['public ', 'private ', 'protected ', 'class ', 'interface ', 'extends', 'implements', 'void ', 'new '],
  },
  {
    format: FileFormat.CPP,
    patterns: [
      /#include\s*[<"]/,
      /using\s+namespace\s+std/,
      /(std::cout|std::cin|std::endl)/,
      /^\s*(void|int|bool|char|double|float)\s+\w+\(/m,
    ],
    keywords: ['#include', 'std::', 'namespace', 'template', 'nullptr', 'auto'],
  },
  {
    format: FileFormat.CSHARP,
    patterns: [
      /^\s*(public|private|protected|internal)\s+(class|interface|struct|enum|namespace)\s+\w+/m,
      /using\s+System/,
      /namespaces\s+\w+/,
      /(async\s+Task|IEnumerable|LINQ)/,
    ],
    keywords: ['using System', 'namespace ', 'class ', 'public ', 'async', 'await', 'var ', 'LINQ'],
  },
  {
    format: FileFormat.GO,
    patterns: [
      /^\s*package\s+\w+/m,
      /^\s*import\s*\(/m,
      /func\s+\w+\([^)]*\)/,
      /:=\s*[^=]/,
    ],
    keywords: ['package ', 'import ', 'func ', 'defer', 'go ', 'chan', 'goroutine'],
  },
  {
    format: FileFormat.RUST,
    patterns: [
      /fn\s+\w+\([^)]*\)\s*(->\s*\w+)?\s*{/,
      /let\s+(mut\s+)?\w+\s*:/,
      /&\w+|&mut\s+\w+/,
      /::[\w:]+/,
    ],
    keywords: ['fn ', 'let ', 'mut ', 'impl ', 'trait ', 'pub ', 'mod ', 'use ', 'match'],
  },
  {
    format: FileFormat.PHP,
    patterns: [
      /<\?php|<\?/,
      /\$\w+\s*=/,
      /(echo|print|var_dump|die|exit)/,
      /->\w+\(|::\w+\(/,
    ],
    keywords: ['<?php', '$', 'echo', 'function ', 'class ', 'namespace ', 'use '],
  },
  {
    format: FileFormat.RUBY,
    patterns: [
      /def\s+\w+.*$/m,
      /class\s+\w+/,
      /require\s+['"]/,
      /^\s*@\w+\s*=/m,
    ],
    keywords: ['def ', 'class ', 'require ', '@', 'attr_accessor', 'self', 'initialize', 'end'],
  },
  {
    format: FileFormat.SWIFT,
    patterns: [
      /import\s+(Foundation|UIKit|SwiftUI)/,
      /func\s+\w+\([^)]*\)\s*(->\s*\w+)?/,
      /^class\s+\w+|^struct\s+\w+|^enum\s+\w+/m,
      /guard\s+let|if\s+let/,
    ],
    keywords: ['import ', 'func ', 'class ', 'struct ', 'enum ', 'var ', 'let ', 'guard', 'self'],
  },
  {
    format: FileFormat.KOTLIN,
    patterns: [
      /^package\s+\w+/m,
      /fun\s+\w+\([^)]*\)/,
      /class\s+\w+|data\s+class\s+\w+/,
      /val\s+\w+\s*:|var\s+\w+\s*:/,
    ],
    keywords: ['fun ', 'class ', 'val ', 'var ', 'package ', 'import ', 'data class'],
  },
  {
    format: FileFormat.TYPESCRIPT,
    patterns: [
      /:\s*(string|number|boolean|any|unknown|void|never|Record|interface|type)\b/,
      /interface\s+\w+|type\s+\w+\s*=/,
      /async\s+(function|\w+\s*=>|\w+\()/,
      /export\s+(default\s+)?(class|function|interface|type|const)/,
    ],
    keywords: ['interface ', 'type ', 'async', 'await', ': string', ': number', 'generic'],
  },
  {
    format: FileFormat.JAVASCRIPT,
    patterns: [
      /(const|let|var)\s+\w+\s*=\s*(function|\([^)]*\)\s*=>|async\s*\(|class)/,
      /function\s+\w+\s*\(/,
      /import\s+.*\s+from|export\s+(default|const|function|class)/,
      /(this\.|prototype\.)/,
    ],
    keywords: ['const ', 'let ', 'var ', 'function ', 'async', 'await', 'import', 'export', 'class'],
  },
  {
    format: FileFormat.HTML,
    patterns: [
      /<!DOCTYPE\s+html/i,
      /<(html|head|body|div|span|p|a|img|div)\b/i,
      /<script|<style|<meta|<link/i,
      /\/>/,
    ],
    keywords: ['<!DOCTYPE', '<html', '<head', '<body', '<div', '<script>', '<style>'],
  },
  {
    format: FileFormat.CSS,
    patterns: [
      /[\w-]+\s*:\s*[^;]+;/,
      /\{[\s\S]*?\}/,
      /(color|background|padding|margin|display|font-size):/,
      /@media|@keyframes|@import/,
    ],
    keywords: ['color:', 'background:', 'display:', 'padding:', 'margin:', '@media', '@keyframes'],
  },
  {
    format: FileFormat.JSON,
    patterns: [
      /^\s*\{[\s\S]*\}\s*$/,
      /^\s*\[[\s\S]*\]\s*$/,
      /"[\w-]+":\s*("[^"]*"|[\d\w\[\]{}]+|true|false|null)/,
    ],
    keywords: ['"', ':', 'true', 'false', 'null'],
  },
];

export function detectCodeFormat(code: string): FileFormat | null {
  if (!code || code.trim().length === 0) {
    return null;
  }

  const scores: { format: FileFormat; score: number }[] = [];

  for (const formatInfo of FORMAT_PATTERNS) {
    let score = 0;

    // Check keywords (weighted higher)
    const keywordMatches = formatInfo.keywords.filter((keyword) =>
      code.includes(keyword)
    ).length;
    score += keywordMatches * 3;

    // Check patterns
    const patternMatches = formatInfo.patterns.filter((pattern) =>
      pattern.test(code)
    ).length;
    score += patternMatches * 2;

    if (score > 0) {
      scores.push({ format: formatInfo.format, score });
    }
  }

  if (scores.length === 0) {
    return null;
  }

  scores.sort((a, b) => b.score - a.score);
  return scores[0].format;
}

export function validateCodeFormat(code: string, selectedFormat: FileFormat): { isValid: boolean; detectedFormat: FileFormat | null; message?: string } {
  const detectedFormat = detectCodeFormat(code);

  if (!detectedFormat) {
    return {
      isValid: false,
      detectedFormat: null,
      message: 'Unable to detect code format. Please ensure the code is valid.',
    };
  }

  if (detectedFormat === selectedFormat) {
    return {
      isValid: true,
      detectedFormat,
    };
  }

  return {
    isValid: false,
    detectedFormat,
    message: `Format mismatch: Selected ${selectedFormat} but detected ${detectedFormat}. Please provide ${selectedFormat} code or select ${detectedFormat}.`,
  };
}
