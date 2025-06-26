import React, { useState } from 'react';
import { Code, Lightbulb, Copy, Loader2, AlertCircle } from 'lucide-react';

const AICodeExplainer = () => {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKey] = useState('YOUR_GEMINI_API_KEY_HERE'); // Replace with your actual API key

  const explainCode = async () => {
    if (!code.trim()) {
      setError('Please paste some code to explain');
      return;
    }

    if (!apiKey.trim()) {
      setError('API key not configured. Please contact the developer.');
      return;
    }

    setLoading(true);
    setError('');
    setExplanation('');

    try {
      // Import Gemini AI dynamically
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      
      console.log('Initializing Gemini AI...');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Please explain the following code in detail. Break it down line by line if it's complex, explain what it does, how it works, and any important concepts or patterns used:

\`\`\`
${code}
\`\`\`

Please provide:
1. A brief overview of what the code does
2. Line-by-line explanation for complex parts
3. Key concepts or patterns used
4. Any potential improvements or considerations`;

      console.log('Sending request to Gemini...');
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Response received:', text);
      setExplanation(text);
    } catch (err) {
      console.error('Detailed error:', err);
      
      // More specific error messages
      if (err.message?.includes('API_KEY_INVALID')) {
        setError('Invalid API key. Please check your Gemini API key.');
      } else if (err.message?.includes('PERMISSION_DENIED')) {
        setError('Permission denied. Please check your API key permissions.');
      } else if (err.message?.includes('QUOTA_EXCEEDED')) {
        setError('API quota exceeded. Please check your usage limits.');
      } else if (err.message?.includes('billing')) {
        setError('Billing issue. Please check your Google Cloud billing setup.');
      } else {
        setError(`Error: ${err.message || 'Failed to explain code. Please try again.'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const clearAll = () => {
    setCode('');
    setExplanation('');
    setError('');
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="text-center py-4 px-4 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Code className="w-6 h-6 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">AI Code Explainer</h1>
          <Lightbulb className="w-6 h-6 text-yellow-500" />
        </div>
        <p className="text-gray-600 text-sm">
          Paste your code and get detailed explanations powered by Google Gemini AI
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 min-h-0">
        {/* Code Input Section */}
        <div className="bg-white rounded-lg shadow-md flex flex-col min-h-0">
          <div className="flex items-center justify-between p-4 pb-2">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Your Code
            </h2>
            <button
              onClick={() => copyToClipboard(code)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Copy code"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 px-4 pb-2 min-h-0">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="w-full h-full p-3 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>
          
          <div className="flex gap-3 p-4 pt-2">
            <button
              onClick={explainCode}
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Explaining...
                </>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4" />
                  Explain Code
                </>
              )}
            </button>
            
            <button
              onClick={clearAll}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Explanation Section */}
        <div className="bg-white rounded-lg shadow-md flex flex-col min-h-0">
          <div className="flex items-center justify-between p-4 pb-2">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Explanation
            </h2>
            {explanation && (
              <button
                onClick={() => copyToClipboard(explanation)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Copy explanation"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex-1 px-4 pb-4 overflow-y-auto min-h-0">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 mb-4">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
                  <p className="text-gray-500">Analyzing your code...</p>
                </div>
              </div>
            )}

            {explanation && !loading && (
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-md">
                  {explanation}
                </pre>
              </div>
            )}

            {!explanation && !loading && !error && (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Paste your code and click "Explain Code" to get started</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-2 text-gray-500 text-xs bg-white/30">
        <p>Powered by Google Gemini AI • Built with Vite + React</p>
      </div>
    </div>
  );
};

export default AICodeExplainer;