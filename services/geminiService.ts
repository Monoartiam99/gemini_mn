import { ReviewType, FileFormat } from "../types";
import { validateCodeFormat } from "../utils/formatDetection";

// Backend API endpoint - configure this based on your backend URL
const BACKEND_API_URL = ((import.meta as any).env?.VITE_BACKEND_API_URL as string) || 'http://localhost:3000/api';

export async function reviewCode(code: string, type: ReviewType, format: FileFormat = FileFormat.JAVASCRIPT) {
  // Validate that code format matches selected format
  const validation = validateCodeFormat(code, format);
  if (!validation.isValid) {
    throw new Error(validation.message || `Invalid code format: Please provide ${format} code`);
  }

  try {
    // Make POST request to backend API
    const response = await fetch(`${BACKEND_API_URL}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        type,
        format
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `Backend error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    // Validate response structure
    if (!result.summary || typeof result.score !== 'number' || !Array.isArray(result.issues)) {
      throw new Error('Invalid response format from backend');
    }
    
    return result;
  } catch (error: any) {
    console.error("Backend API Error:", error);
    
    // Check for network errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(`Audit Failed: Unable to connect to backend API at ${BACKEND_API_URL}`);
    }
    
    const message = error?.message || "Internal Analysis Error";
    throw new Error(`Audit Failed: ${message}`);
  }
}
