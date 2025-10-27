/**
 * Quiz Data Loader - High Performance Quiz System
 * Loads quiz data dynamically from separate JSON files
 */

class QuizLoader {
  constructor() {
    this.cache = new Map();
    this.loadingPromises = new Map();
  }

  /**
   * Load quiz data for a specific language
   * @param {string} language - The programming language (python, javascript, java, etc.)
   * @param {string} difficulty - The difficulty level (basic, intermediate, advanced)
   * @param {string} topic - The specific topic (optional)
   * @returns {Promise<Object>} Quiz data object
   */
  async loadQuiz(language, difficulty = 'basic', topic = null) {
    const cacheKey = topic ? `${language}-${difficulty}-${topic}` : `${language}-${difficulty}`;
    
    // Return cached data if available
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Return existing promise if already loading
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey);
    }

    // Create new loading promise
    const loadingPromise = this.fetchQuizData(language, difficulty, topic);
    this.loadingPromises.set(cacheKey, loadingPromise);

    try {
      const quizData = await loadingPromise;
      this.cache.set(cacheKey, quizData);
      this.loadingPromises.delete(cacheKey);
      return quizData;
    } catch (error) {
      this.loadingPromises.delete(cacheKey);
      throw error;
    }
  }

  /**
   * Fetch quiz data from JSON file
   * @param {string} language - The programming language
   * @param {string} difficulty - The difficulty level
   * @returns {Promise<Object>} Quiz data
   */
  async fetchQuizData(language, difficulty = 'basic', topic = null) {
    try {
      let response;
      
      // Try different file patterns in order
      if (topic) {
        // Try topic-specific file: language-difficulty-topic.json
        response = await fetch(`quiz-data/${language}-${difficulty}-${topic}.json`);
      }
      
      if (!response || !response.ok) {
        // Try language-difficulty.json
        response = await fetch(`quiz-data/${language}-${difficulty}.json`);
      }
      
      if (!response.ok) {
        // Try old format: language.json
        response = await fetch(`quiz-data/${language}.json`);
      }
      
      if (!response.ok) {
        throw new Error(`Failed to load ${language} quiz: ${response.status}`);
      }

      const quizData = await response.json();
      
      // Validate quiz data structure
      this.validateQuizData(quizData, language);
      
      return quizData;
    } catch (error) {
      console.error(`Error loading ${language} quiz:`, error);
      
      // Return fallback data if main file fails
      return this.getFallbackData(language);
    }
  }

  /**
   * Validate quiz data structure
   * @param {Object} quizData - Quiz data to validate
   * @param {string} language - Language name for error reporting
   */
  validateQuizData(quizData, language) {
    if (!quizData || typeof quizData !== 'object') {
      throw new Error(`Invalid quiz data format for ${language}`);
    }

    if (!quizData.title || !quizData.questions || !Array.isArray(quizData.questions)) {
      throw new Error(`Missing required fields in ${language} quiz data`);
    }

    if (quizData.questions.length === 0) {
      throw new Error(`No questions found in ${language} quiz`);
    }

    // Validate each question
    quizData.questions.forEach((question, index) => {
      if (!question.question || !question.options || !Array.isArray(question.options)) {
        throw new Error(`Invalid question format at index ${index} in ${language} quiz`);
      }

      if (typeof question.correct !== 'number' || question.correct < 0 || question.correct >= question.options.length) {
        throw new Error(`Invalid correct answer index at question ${index} in ${language} quiz`);
      }
    });
  }

  /**
   * Get fallback data if main quiz file fails to load
   * @param {string} language - The programming language
   * @returns {Object} Fallback quiz data
   */
  getFallbackData(language) {
    const fallbackQuestions = {
      python: {
        title: "Python Programming Quiz",
        description: "Basic Python programming questions",
        questions: [
          {
            question: "What is Python?",
            options: ["A snake", "A programming language", "A game", "A book"],
            correct: 1,
            explanation: "Python is a high-level programming language."
          }
        ]
      },
      javascript: {
        title: "JavaScript Quiz",
        description: "Basic JavaScript questions",
        questions: [
          {
            question: "What is JavaScript used for?",
            options: ["Web development", "Coffee making", "Snake charming", "Book writing"],
            correct: 0,
            explanation: "JavaScript is primarily used for web development."
          }
        ]
      }
    };

    return fallbackQuestions[language] || {
      title: `${language.charAt(0).toUpperCase() + language.slice(1)} Quiz`,
      description: `Test your ${language} knowledge`,
      questions: [
        {
          question: `What is ${language}?`,
          options: ["A programming language", "A food", "A place", "A person"],
          correct: 0,
          explanation: `${language} is a programming language.`
        }
      ]
    };
  }

  /**
   * Preload quiz data for better performance
   * @param {Array<string>} languages - Array of language names to preload
   */
  async preloadQuizzes(languages) {
    const preloadPromises = languages.map(language => 
      this.loadQuiz(language).catch(error => {
        console.warn(`Failed to preload ${language} quiz:`, error);
      })
    );

    await Promise.allSettled(preloadPromises);
    console.log('Quiz preloading completed');
  }

  /**
   * Get available quiz languages
   * @returns {Array<string>} Array of available language names
   */
  getAvailableLanguages() {
    return ['python', 'javascript', 'java', 'cpp', 'html', 'c'];
  }

  /**
   * Get available difficulty levels
   * @returns {Array<string>} Array of available difficulty levels
   */
  getAvailableDifficulties() {
    return ['basic', 'intermediate', 'advanced'];
  }

  /**
   * Clear cache (useful for development/testing)
   */
  clearCache() {
    this.cache.clear();
    this.loadingPromises.clear();
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache statistics
   */
  getCacheStats() {
    return {
      cachedQuizzes: Array.from(this.cache.keys()),
      cacheSize: this.cache.size,
      loadingQuizzes: Array.from(this.loadingPromises.keys())
    };
  }
}

// Create global instance
window.quizLoader = new QuizLoader();

// Preload popular quizzes for better performance
document.addEventListener('DOMContentLoaded', () => {
  // Preload the most popular quizzes
  window.quizLoader.preloadQuizzes(['python', 'javascript', 'java']);
});