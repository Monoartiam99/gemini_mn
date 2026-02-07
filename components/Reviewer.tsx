import React, { useState, useEffect, useRef } from 'react';
import { reviewCode } from '../services/geminiService';
import { ReviewType, ReviewResponse, FileFormat } from '../types';
import Prism from 'prismjs';

// Import Prism components for syntax highlighting
import 'https://esm.sh/prismjs@1.29.0/components/prism-javascript';
import 'https://esm.sh/prismjs@1.29.0/components/prism-typescript';
import 'https://esm.sh/prismjs@1.29.0/components/prism-css';
import 'https://esm.sh/prismjs@1.29.0/components/prism-json';

const STORAGE_KEY = 'veilux_code_draft';

// Supported coding file extensions
const CODING_FILE_EXTENSIONS: { [key: string]: FileFormat } = {
  // JavaScript/TypeScript
  '.js': FileFormat.JAVASCRIPT,
  '.jsx': FileFormat.JAVASCRIPT,
  '.ts': FileFormat.TYPESCRIPT,
  '.tsx': FileFormat.TYPESCRIPT,
  // Web
  '.html': FileFormat.HTML,
  '.css': FileFormat.CSS,
  '.json': FileFormat.JSON,
  // Python
  '.py': FileFormat.PYTHON,
  // Java
  '.java': FileFormat.JAVA,
  // C++
  '.cpp': FileFormat.CPP,
  '.cc': FileFormat.CPP,
  '.cxx': FileFormat.CPP,
  '.h': FileFormat.CPP,
  '.hpp': FileFormat.CPP,
  // C#
  '.cs': FileFormat.CSHARP,
  // Go
  '.go': FileFormat.GO,
  // Rust
  '.rs': FileFormat.RUST,
  // PHP
  '.php': FileFormat.PHP,
  // Ruby
  '.rb': FileFormat.RUBY,
  // Swift
  '.swift': FileFormat.SWIFT,
  // Kotlin
  '.kt': FileFormat.KOTLIN,
  '.kts': FileFormat.KOTLIN,
};

const severityStyles = {
  critical: {
    border: 'border-red-500/20',
    hoverBorder: 'hover:border-red-500/50',
    tag: 'bg-red-500/10 border-red-500/30 text-red-400',
    suggestion: 'bg-red-500/5 border-red-500/20 hover:bg-red-500/[0.08] hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]'
  },
  warning: {
    border: 'border-yellow-500/20',
    hoverBorder: 'hover:border-yellow-500/50',
    tag: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    suggestion: 'bg-yellow-500/5 border-yellow-500/20 hover:bg-yellow-500/[0.08] hover:border-yellow-500/60 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]'
  },
  info: {
    border: 'border-indigo-500/20',
    hoverBorder: 'hover:border-indigo-500/50',
    tag: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
    suggestion: 'bg-indigo-500/5 border-indigo-500/20 hover:bg-indigo-500/[0.08] hover:border-indigo-500/60 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]'
  }
};

const Reviewer: React.FC = () => {
  const [code, setCode] = useState<string>(() => localStorage.getItem(STORAGE_KEY) || '');
  const [type, setType] = useState<ReviewType>(ReviewType.FULL);
  const [format, setFormat] = useState<FileFormat>(FileFormat.JAVASCRIPT);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ReviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const codeRef = useRef(code);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem(STORAGE_KEY, codeRef.current);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Trigger Prism highlighting whenever the result changes or loading finishes
  useEffect(() => {
    if (result && !loading) {
      // Small timeout to ensure DOM is ready and styled
      const timer = setTimeout(() => {
        Prism.highlightAll();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [result, loading]);

  const handleReview = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await reviewCode(code, type, format);
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during the audit.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Get file extension
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

    // Check if file is a supported coding file
    if (!CODING_FILE_EXTENSIONS[fileExtension]) {
      setFileError(`❌ Unsupported file format: ${fileExtension}. Only coding files are accepted (${Object.keys(CODING_FILE_EXTENSIONS).join(', ')})`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Check file size (max 1MB)
    if (file.size > 1024 * 1024) {
      setFileError('❌ File size exceeds 1MB limit');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Read file content
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        setCode(content);
        setFormat(CODING_FILE_EXTENSIONS[fileExtension]);
        setFileError(null);
        setError(null);
        setResult(null);
        
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (err) {
        setFileError('❌ Error reading file');
      }
    };
    
    reader.onerror = () => {
      setFileError('❌ Error reading file');
      if (fileInputRef.current) fileInputRef.current.value = '';
    };

    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 space-y-10">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-3xl font-display font-bold tracking-tight text-white uppercase italic">WORKSPACE</h2>
              <div className="flex flex-wrap p-1.5 bg-white/5 border border-white/10 rounded-sm">
                {(Object.values(ReviewType)).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`px-4 py-2 text-[8px] font-black tracking-[0.2em] uppercase transition-all rounded-sm ${
                      type === t ? 'bg-white text-black' : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* File Format Selector */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <label className="text-[9px] font-black tracking-[0.2em] uppercase text-gray-400">File Format</label>
              <div className="flex gap-3">
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as FileFormat)}
                  className="px-4 py-2 text-[8px] font-black tracking-[0.2em] uppercase rounded-sm bg-black/5 border border-black/10 text-white hover:border-black/30 transition-all focus:outline-none"
                >
                  {(Object.values(FileFormat)).map((fmt) => (
                    <option key={fmt} value={fmt}>
                      {fmt}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 text-[8px] font-black tracking-[0.2em] uppercase rounded-sm bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-600/30 hover:border-indigo-500/50 transition-all focus:outline-none"
                  title="Upload a coding file"
                >
                  📁 UPLOAD FILE
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  accept={Object.keys(CODING_FILE_EXTENSIONS).join(',')}
                  className="hidden"
                  aria-label="Upload coding file"
                />
              </div>
            </div>

            {/* File Upload Error Message */}
            {fileError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-sm text-red-400 text-[9px] font-mono">
                {fileError}
              </div>
            )}

            
          </div>

          <div className="iso-card rounded-xl overflow-hidden border-white/10 group relative">
            <textarea
              className="w-full h-[550px] bg-transparent p-8 font-mono text-[13px] resize-none focus:outline-none placeholder:text-gray-800 text-indigo-100/60 leading-relaxed"
              placeholder="// Insert your code snippets here for heuristic analysis..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <div className="p-6 bg-white/[0.03] border-t border-white/5 flex justify-end items-center gap-6">
              <span className="text-[9px] text-gray-600 font-mono tracking-[0.2em] uppercase">Status: {code.length > 0 ? 'Draft Saved' : 'Ready'}</span>
              <button
                onClick={handleReview}
                disabled={loading || !code.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-20 text-white px-8 py-4 rounded-sm text-[10px] font-black tracking-[0.3em] uppercase transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
              >
                {loading ? 'ANALYZING...' : 'RUN_AUDIT'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-10">
          <h2 className="text-3xl font-display font-bold tracking-tight text-white uppercase italic">DIAGNOSTIC REPORT</h2>
          <div className={`iso-card rounded-xl p-10 min-h-[615px] flex flex-col transition-all border-white/10 ${loading ? 'relative overflow-hidden' : ''}`}>
            
            {loading && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-12">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <div className="absolute inset-0 border border-indigo-500/20 rounded-full animate-[ping_4s_infinite]" />
                  <div className="absolute inset-6 border border-indigo-500/30 rounded-full animate-[ping_4s_infinite_0.8s]" />
                  <div className="relative z-10 w-16 h-16 border-2 border-indigo-500 rounded-sm rotate-45 animate-[spin_3s_linear_infinite] shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                    <div className="absolute inset-1.5 border border-indigo-400/40" />
                  </div>
                </div>
                <div className="text-center relative z-10">
                  <p className="text-label animate-pulse">Scanning Code Structure</p>
                </div>
              </div>
            )}

            {error && (
              <div className="m-auto p-8 border border-red-500/20 bg-red-500/5 rounded-xl text-center max-w-sm">
                <div className="text-red-400 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
                <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">Protocol Failure</h3>
                <p className="text-gray-500 text-[11px] leading-relaxed uppercase">{error}</p>
                <button 
                  onClick={handleReview}
                  className="mt-6 text-[9px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300"
                >
                  Retry_Analysis
                </button>
              </div>
            )}

            {!result && !loading && !error && (
              <div className="m-auto text-center opacity-30">
                <div className="w-20 h-20 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p className="text-label text-gray-400">Awaiting_Input_Submission</p>
              </div>
            )}

            {result && (
              <div className="space-y-12 animate-in fade-in duration-700">
                <div className="flex items-center justify-between border-b border-white/10 pb-10">
                  <div>
                    <div className="text-label text-gray-500 mb-2">QUALITY_SCORE</div>
                    <div className="text-7xl font-display font-bold tracking-tighter italic">{result.score}<span className="text-indigo-500 text-3xl">.00</span></div>
                  </div>
                  <div className={`px-6 py-3 border text-[10px] font-black tracking-[0.3em] uppercase rounded-sm ${
                    result.score >= 80 ? 'border-green-500/30 text-green-400 bg-green-500/5' : 'border-red-500/30 text-red-400 bg-red-500/5'
                  }`}>
                    {result.score >= 80 ? 'LEVEL_OPTIMAL' : 'CRITICAL_ACTION'}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="text-label text-gray-600">PRIMARY_FINDINGS</div>
                  {result.issues.map((issue, idx) => {
                    const style = severityStyles[issue.severity as keyof typeof severityStyles] || severityStyles.info;
                    return (
                      <div key={idx} className={`bg-white/[0.01] border ${style.border} p-8 rounded-xl ${style.hoverBorder} transition-all duration-500 group`}>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-white uppercase text-sm tracking-tight">{issue.title}</h4>
                          <span className={`text-[8px] font-black px-2.5 py-1 border ${style.tag} uppercase tracking-[0.2em] rounded-sm`}>{issue.severity}</span>
                        </div>
                        <p className="text-[14px] text-gray-500 mb-6 leading-relaxed font-light">{issue.description}</p>
                        
                        {/* Enhanced Code Block with Prism Syntax Highlighting */}
                        <div className={`relative rounded-lg overflow-hidden border transition-all duration-500 ${style.suggestion}`}>
                          <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/5">
                            <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Optimized_Snippet</div>
                            <button 
                              onClick={() => handleCopy(issue.suggestion, idx)}
                              className="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-400 hover:text-white transition-colors"
                            >
                              {copiedIndex === idx ? 'COPIED' : 'COPY'}
                            </button>
                          </div>
                          <div className="p-4 overflow-x-auto max-h-[300px]">
                            <pre className="!m-0 !p-0 !bg-transparent"><code className="language-javascript !text-[12px]">{issue.suggestion}</code></pre>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviewer;
