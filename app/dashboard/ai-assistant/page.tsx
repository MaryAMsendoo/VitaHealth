'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send,
  User,
  AlertTriangle,
  Zap,
  Stethoscope,
  Heart,
  Pill
} from 'lucide-react'

interface ChatMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  isMedicalAdvice?: boolean
  sources?: string[]
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your VitaHealth Medical Assistant. I can help answer common health questions using verified medical information. Remember, I provide general information only - always consult healthcare professionals for medical advice.",
      timestamp: new Date(),
      isMedicalAdvice: true,
      sources: ["Medical Knowledge Base"]
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [usageCount, setUsageCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // quick actions with medical categories
  const quickActions = [
    {
      icon: Heart,
      title: 'Common Symptoms',
      questions: [
        'Headache relief tips',
        'Cold and flu care',
        'Sore throat remedies',
        'Fever management',
        'Stomach issues'
      ]
    },
    {
      icon: Stethoscope,
      title: 'First Aid & Care',
      questions: [
        'Minor burn treatment',
        'Sprain and strain care',
        'Allergy management',
        'Stress relief techniques'
      ]
    },
    {
      icon: Pill,
      title: 'Wellness',
      questions: [
        'Better sleep habits',
        'Healthy eating tips',
        'Exercise guidelines',
        'Mental wellness'
      ]
    }
  ]

  // medical knowledge base
  const medicalKnowledgeBase = {
    headache: {
      response: `Headache Management

Self-Care Tips:
• Rest in a quiet, dark room
• Stay hydrated with water
• Apply cool compress to forehead and temples
• Practice relaxation techniques
• Consider OTC pain relievers (use as directed)

When to Seek Medical Care:
• Severe, sudden headache
• Headache with fever, stiff neck, or confusion
• Headache after head injury
• Headache with vision changes or weakness
• Headaches that worsen or change pattern`,
      keywords: ['headache', 'head pain', 'migraine', 'head throbbing', 'head pressure'],
      sources: ["Mayo Clinic", "NHS Guidelines"]
    },

    cold: {
      response: `Cold & Flu Management

Symptom Relief:
• Rest to support immune system
• Hydrate with water, broth, herbal tea
• Use humidifier for congestion
• Gargle warm salt water for sore throat
• OTC medications for specific symptoms

Recovery Timeline:
• Most colds: 7-10 days
• Flu: 1-2 weeks for full recovery

Warning Signs (Seek Medical Care):
• Difficulty breathing
• High fever lasting more than 3 days
• Symptoms worsening after improvement
• Severe headache or body aches`,
      keywords: ['cold', 'flu', 'cough', 'runny nose', 'congestion', 'sneezing', 'fever'],
      sources: ["CDC Guidelines", "WHO Recommendations"]
    },

    fever: {
      response: `Fever Management

Home Care:
• Rest and increase fluid intake
• Light clothing and light bedding
• Lukewarm sponge bath if uncomfortable
• OTC fever reducers (follow package directions)

Seek Immediate Medical Care For:
• Fever in infants under 3 months
• Fever over 104°F (40°C)
• Fever lasting more than 3 days
• Fever with rash, stiff neck, or confusion
• Difficulty breathing`,
      keywords: ['fever', 'temperature', 'hot', 'sweating', 'chills'],
      sources: ["AAP Guidelines", "NHS Fever Management"]
    },
  }

  const callMedicalAI = async (question: string): Promise<{ response: string, sources?: string[] }> => {
    try {
      // Get conversation context (last 6 messages for context)
      const recentMessages = messages.slice(-6);
      const conversationContext = recentMessages.map(msg => 
        `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join('\n');

      // First, check if question is health-related WITH context
      if (!isHealthRelatedQuestion(question, conversationContext)) {
        return {
          response: "I specialize in health and medical information only. Please ask questions related to health, symptoms, wellness, medications, or medical conditions. For other topics, you might want to consult other appropriate resources.",
          sources: ["Medical Assistant Scope"]
        };
      }

      // Emergency detection
      const emergencyKeywords = [
        'heart attack', 'stroke', 'suicide', 'chest pain', 'bleeding heavily',
        'can\'t breathe', 'emergency', '911', 'urgent', 'dying', 'severe pain',
        'unconscious', 'choking', 'seizure', 'overdose', 'chest pressure',
        'arm pain', 'face drooping', 'speech difficulty'
      ];

      const lowerQuestion = question.toLowerCase();
      const isEmergency = emergencyKeywords.some(keyword =>
        lowerQuestion.includes(keyword)
      );

      if (isEmergency) {
        return {
          response: "MEDICAL EMERGENCY DETECTED\n\nPlease call emergency services (911) immediately or go to the nearest hospital. Do not wait for AI assistance.\n\nCommon emergency signs:\n• Chest pain or pressure\n• Difficulty breathing\n• Sudden weakness or numbness\n• Severe bleeding\n• Suicidal thoughts\n• Loss of consciousness",
          sources: ["Emergency Medical Protocols"]
        };
      }

      // Check our enhanced medical knowledge base
      for (const [condition, data] of Object.entries(medicalKnowledgeBase)) {
        if (data.keywords.some(keyword => lowerQuestion.includes(keyword))) {
          return {
            response: data.response,
            sources: data.sources
          };
        }
      }

      // If not in our knowledge base, use Mistral AI with conversation context
      const apiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;

      if (!apiKey) {
        // Fallback to enhanced local responses
        return getEnhancedMedicalResponse(question, conversationContext);
      }

      // Prepare conversation history for the AI
      const aiMessages = [
        {
          role: 'system',
          content: `You are a medical information assistant that ONLY answers health-related questions.

STRICT RULES:
1. ONLY answer questions about: health, medicine, symptoms, diseases, medications, wellness, fitness, nutrition, mental health, medical conditions
2. If question is NOT health-related, respond: "I specialize in health and medical information only. Please ask health-related questions."
3. Use simple, clean text without markdown
4. Use bullet points with • instead of numbered lists
5. Keep responses concise and practical
6. Do not add repetitive disclaimers
7. Never use asterisks, hashes, or markdown symbols
8. MAINTAIN CONVERSATION CONTEXT - understand follow-up questions based on previous messages

HEALTH-RELATED TOPICS ONLY:
• Symptoms and illnesses
• Medications and treatments  
• Preventive care
• Mental health
• Nutrition and diet
• Exercise and fitness
• Medical conditions
• First aid and emergencies
• Wellness and lifestyle

For any other topics, politely decline.`
        }
      ];

      // Add conversation history (last 4 exchanges for context)
      const historyMessages = messages.slice(-8); // Last 4 exchanges
      historyMessages.forEach(msg => {
        aiMessages.push({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        });
      });

      // Add current question
      aiMessages.push({
        role: 'user',
        content: question
      });

      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'mistral-medium',
          messages: aiMessages,
          max_tokens: 500,
          temperature: 0.3,
        })
      });

      if (!response.ok) {
        throw new Error(`Mistral API error: ${response.status}`);
      }

      const data = await response.json();
      let aiResponse = data.choices[0]?.message?.content ||
        "I'd like to help with your health question. For personalized medical advice, please consult a healthcare professional.";

      // Clean up the response - remove markdown and redundant text
      aiResponse = cleanAIResponse(aiResponse);

      return {
        response: aiResponse,
        sources: ["Medical AI", "Healthcare Knowledge"]
      };

    } catch (error) {
      console.error('Medical AI error:', error);
      // Fallback to our comprehensive local medical knowledge
      return getEnhancedMedicalResponse(question);
    }
  };

  // Updated function to detect health-related questions with context
    // Updated function to detect health-related questions with context
  const isHealthRelatedQuestion = (question: string, context?: string): boolean => {
    const lowerQuestion = question.toLowerCase();
    const lowerContext = context?.toLowerCase() || '';

    // Health-related keywords
    const healthKeywords = [
      // Symptoms and conditions
      'headache', 'fever', 'pain', 'sick', 'ill', 'disease', 'infection', 'virus', 'bacteria',
      'cough', 'cold', 'flu', 'fever', 'sore throat', 'stomach', 'nausea', 'vomit', 'diarrhea',
      'rash', 'itch', 'burn', 'cut', 'bleed', 'bruise', 'swell', 'inflam', 'infection',
      'allergy', 'asthma', 'breath', 'chest', 'heart', 'blood', 'pressure', 'sugar', 'diabetes',
      'cancer', 'tumor', 'head', 'neck', 'back', 'arm', 'leg', 'joint', 'bone', 'muscle',
      'skin', 'eye', 'ear', 'nose', 'throat', 'dental', 'tooth', 'teeth', 'mental', 'anxiety',
      'depression', 'stress', 'sleep', 'insomnia', 'fatigue', 'tired', 'weak', 'dizzy',

      // Medical terms
      'medicine', 'medication', 'pill', 'drug', 'prescription', 'treatment', 'therapy',
      'doctor', 'hospital', 'clinic', 'nurse', 'patient', 'diagnosis', 'symptom',
      'prevent', 'prevention', 'vaccine', 'immunization', 'health', 'wellness',
      'fitness', 'exercise', 'diet', 'nutrition', 'vitamin', 'mineral', 'supplement',

      // Body parts and systems
      'body', 'organ', 'brain', 'lung', 'liver', 'kidney', 'stomach', 'intestine',
      'nerve', 'bone', 'muscle', 'skin', 'hair', 'nail', 'immune', 'digestive',
      'respiratory', 'cardiovascular', 'nervous', 'endocrine',

      // Procedures and care
      'surgery', 'operation', 'recovery', 'rehab', 'physical therapy', 'first aid',
      'emergency', 'ambulance', 'paramedic', 'checkup', 'exam', 'test', 'scan', 'xray',

      // Wellness and prevention
      'healthy', 'unhealthy', 'weight', 'diet', 'exercise', 'fitness', 'yoga', 'meditation',
      'sleep', 'rest', 'hydration', 'water', 'nutrition', 'food', 'diet', 'calorie',
      'mental health', 'wellbeing', 'lifestyle', 'habit',

      // Follow-up words that indicate context continuation
      'also', 'too', 'what about', 'how about', 'and', 'what if', 'can i', 'should i',
      'will it', 'does it', 'is it', 'are they', 'would it'
    ];

    // Emergency words (always health-related)
    const emergencyWords = [
      'heart attack', 'stroke', 'suicide', 'emergency', '911', 'dying', 'severe pain',
      'unconscious', 'choking', 'seizure', 'overdose', 'bleeding heavily'
    ];

    // Check for emergency words first
    const isEmergency = emergencyWords.some(word => lowerQuestion.includes(word));
    if (isEmergency) return true;

    // Check if this is a follow-up question in a health context
    const isFollowUpInHealthContext = context ? (
      (lowerContext.includes('health') || 
       lowerContext.includes('medical') || 
       lowerContext.includes('symptom') ||
       lowerContext.includes('treatment') ||
       lowerContext.includes('medicine') ||
       lowerContext.includes('doctor') ||
       lowerContext.includes('hospital'))
      && (
        lowerQuestion.includes('also') ||
        lowerQuestion.includes('too') ||
        lowerQuestion.includes('what about') ||
        lowerQuestion.includes('how about') ||
        lowerQuestion.includes('and ') ||
        lowerQuestion.includes('?') ||
        lowerQuestion.length < 20 // Short questions are likely follow-ups
      )
    ) : false;

    // Check for health-related keywords
    const hasHealthKeywords = healthKeywords.some(keyword => lowerQuestion.includes(keyword));

    // Also check for question patterns that indicate health concerns
    const healthQuestionPatterns = [
      /what.*(do|take).*(headache|fever|pain|sick)/i,
      /how.*(treat|relieve|manage).*(pain|symptom)/i,
      /should.*(see|consult).*(doctor|hospital)/i,
      /(symptom|sign).*(of|for).*/i,
      /(medicine|medication).*(for|to).*/i,
      /(prevent|avoid).*(disease|illness)/i,
      /(healthy|unhealthy).*(food|diet|habit)/i,
      /(exercise|fitness).*(for|to).*/i,
      /(mental|stress|anxiety|depression).*(help|relief)/i
    ];

    const hasHealthPattern = healthQuestionPatterns.some(pattern => pattern.test(question));

    return hasHealthKeywords || hasHealthPattern || isFollowUpInHealthContext;
  };

  // Clean AI responses from markdown and redundant text
  const cleanAIResponse = (response: string): string => {
    let cleaned = response;

    // Remove markdown symbols
    cleaned = cleaned.replace(/\*\*/g, '');
    cleaned = cleaned.replace(/#{1,6}\s?/g, '');
    cleaned = cleaned.replace(/---+/g, '');
    cleaned = cleaned.replace(/\*\*/g, '');
    cleaned = cleaned.replace(/\*/g, '');

    // Remove common disclaimer patterns
    const disclaimerPatterns = [
      /Disclaimer:.*?(?=\n\n|$)/gi,
      /This information is for general educational purposes only.*?(?=\n\n|$)/gi,
      /⚠️ IMPORTANT DISCLAIMER:.*?(?=\n\n|$)/gi,
      /Always consult a healthcare provider.*?(?=\n\n|$)/gi,
      /This is general health information\..*?(?=\n\n|$)/gi,
      /Sources:.*?(?=\n\n|$)/gi,
      /Medical Disclaimer:.*?(?=\n\n|$)/gi
    ];

    disclaimerPatterns.forEach(pattern => {
      cleaned = cleaned.replace(pattern, '');
    });

    // Clean up numbering and convert to bullet points
    cleaned = cleaned.replace(/\d+\.\s/g, '• ');
    cleaned = cleaned.replace(/\n\s*\d+\.\s/g, '\n• ');

    // Clean up extra whitespace
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
    cleaned = cleaned.trim();

    return cleaned;
  };

  const getEnhancedMedicalResponse = (question: string, context?: string): { response: string, sources?: string[] } => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('pregnancy') || lowerQuestion.includes('prevent') ||
      lowerQuestion.includes('birth control')) {
      return {
        response: `Understanding Pregnancy Prevention

Available Methods:
• Barrier methods: Condoms, diaphragms
• Hormonal methods: Birth control pills, patches, injections
• Long-acting options: IUDs, implants
• Permanent methods: Sterilization procedures

It's best to discuss these options with a healthcare provider who can help you choose based on your health needs and lifestyle.`,
        sources: ["Reproductive Health Guidelines"]
      };
    }

    if (lowerQuestion.includes('anxiety') || lowerQuestion.includes('stress')) {
      return {
        response: `Managing Anxiety & Stress

Quick relief techniques:
• Deep breathing exercises
• Short walk or light stretching
• Talking to someone supportive

Long-term strategies:
• Regular physical activity
• Consistent sleep schedule
• Mindfulness practices
• Balanced nutrition

If anxiety significantly affects your daily life, consider speaking with a mental health professional.`,
        sources: ["Mental Health Resources"]
      };
    }

    // General medical advice
    return {
      response: `Health Information

I understand you're asking about health concerns. Here's some general information that might help:

For your question, I recommend focusing on basic wellness practices like adequate rest, balanced nutrition, and staying hydrated. If you have specific symptoms or concerns, consulting a healthcare provider would be the best approach for personalized guidance.`,
      sources: ["General Health Information"]
    };
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    // Usage limit check
    if (usageCount >= 50) {
      alert('Daily usage limit reached. Please try again tomorrow.');
      return;
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Call Medical AI
      const { response: aiResponse, sources } = await callMedicalAI(input)

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        isMedicalAdvice: true,
        sources: sources
      }
      setMessages(prev => [...prev, assistantMessage])
      setUsageCount(prev => prev + 1)
    } catch (error) {
      console.error('Medical AI error:', error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm currently experiencing technical difficulties. For health concerns, please consult a healthcare professional directly.",
        timestamp: new Date(),
        isMedicalAdvice: true
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="h-screen w-auto flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 md:p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-[#2E37A4] to-[#0E9384] rounded-full flex items-center justify-center">
            <Stethoscope className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Medical Assistant</h1>
            <p className="text-gray-600 text-sm flex items-center gap-1">
              <Zap className="w-4 h-4 text-green-500" />
              Powered by Medical AI • Evidence-Based Information
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full">
        {/* Chat Area - Full width on all screens */}
        <div className="flex-1 flex flex-col bg-white min-h-0">
          {/* Messages Area - Improved scrolling */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'assistant' && (
                  <div className="w-8 h-8 bg-[#2E37A4] rounded-full flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] md:max-w-[70%] rounded-lg p-4 ${message.type === 'user'
                    ? 'bg-[#2E37A4] text-white'
                    : 'bg-gray-100 text-gray-900'
                    }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                  {/* Sources */}
                  {message.sources && (
                    <div className="mt-2 text-xs text-gray-500">
                      <div className="font-medium mb-1">Sources:</div>
                      <div className="flex flex-wrap gap-1">
                        {message.sources.map((source, index) => (
                          <span key={index} className="bg-gray-200 px-2 py-1 rounded">
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {message.isMedicalAdvice && (
                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                      <div className="flex items-start gap-1">
                        <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Medical Disclaimer:</strong> This is general health information only. Always consult healthcare professionals for medical advice, diagnosis, or treatment.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-[#2E37A4] rounded-full flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Fixed at bottom */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask a medical question..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="px-4 md:px-6 py-3 bg-gradient-to-r from-[#2E37A4] to-[#0E9384] text-white rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span className="hidden md:inline">Send</span>
              </button>
            </div>

            {/* Quick Questions - Now appears below input on ALL screen sizes */}
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Questions</h3>

            <div className='flex flex-col items-center'>
              <div className="border-t max-w-80 md:max-w-200 border-gray-100 pt-3">
                <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
                  {quickActions.flatMap(category => category.questions).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="flex-shrink-0 px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-xs text-gray-700 whitespace-nowrap hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}