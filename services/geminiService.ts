import { ReviewType, FileFormat } from "../types";


const BASE_URL = (import.meta as any).env?.VITE_BACKEND_API_URL || 'http://localhost:8080/api/v1/review';

export async function reviewCode(code: string, type: ReviewType, format: FileFormat = FileFormat.JAVASCRIPT) {
  const formData = new FormData();
  
  
  const codeBlob = new Blob([code], { type: 'text/plain' });
  formData.append('file', codeBlob, 'test.txt'); 

  formData.append('code', code);
  formData.append('type', type);

  try {
   
    const response = await fetch(`${BASE_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server Error (${response.status}): ${errorText || response.statusText}`);
    }

    return await response.json();
    
  } catch (error: any) {
    console.error("Connection Error:", error);
    throw new Error(`Audit Failed: ${error.message}`);
  }
}