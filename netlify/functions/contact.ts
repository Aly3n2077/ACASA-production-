import { Handler } from '@netlify/functions';
import { storage } from '../../server/storage';
import { insertContactInquirySchema } from '../../shared/schema';
import { z } from 'zod';

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    if (event.httpMethod === 'GET') {
      const inquiries = await storage.getContactInquiries();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(inquiries),
      };
    }

    if (event.httpMethod === 'POST') {
      if (!event.body) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'Request body is required' }),
        };
      }

      const body = JSON.parse(event.body);
      const validatedData = insertContactInquirySchema.parse(body);
      const inquiry = await storage.createContactInquiry(validatedData);
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(inquiry),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          message: 'Invalid input data', 
          errors: error.errors 
        }),
      };
    }
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};