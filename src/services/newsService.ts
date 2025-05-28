import axios from 'axios';
import { Article } from '../types';
import { formatDistanceToNow } from 'date-fns';

// Mock news API key - in a real app, this would be in an environment variable
const API_KEY = 'mock-api-key';
const BASE_URL = 'https://newsapi.org/v2';

// Helper function to calculate reading time
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Format the articles coming from the API
const formatArticle = (article: any): Article => {
  return {
    id: article.url || Math.random().toString(36).substr(2, 9),
    title: article.title || 'No title available',
    description: article.description || 'No description available',
    content: article.content || article.description || 'No content available',
    url: article.url || '#',
    image: article.urlToImage || 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg',
    publishedAt: article.publishedAt || new Date().toISOString(),
    source: {
      name: article.source?.name || 'Unknown source',
      url: article.source?.url || '#',
    },
    category: article.category || 'general',
    readingTimeMinutes: calculateReadingTime(article.content || article.description || ''),
  };
};

// For demo purposes, we'll use a mock API response
const getMockNews = async (): Promise<Article[]> => {
  // Sample data for demonstration
  const mockArticles = [
    {
      title: "NASA's New Telescope Discovers Earth-like Planet",
      description: "Scientists believe they have found a planet that could potentially support life.",
      content: "NASA's newest space telescope has discovered a planet that shares many characteristics with Earth, including a similar atmosphere and the potential presence of water. Scientists are calling this a major breakthrough in the search for extraterrestrial life.",
      url: "https://example.com/nasa-discovers-earth-like-planet",
      urlToImage: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg",
      publishedAt: "2025-04-15T10:30:00Z",
      source: {
        name: "Space News",
        url: "https://example.com/space-news"
      },
      category: "science"
    },
    {
      title: "Global Tech Conference Unveils Next-Generation AI",
      description: "Leading tech companies showcased their latest AI innovations at the annual Global Tech Summit.",
      content: "The Global Tech Summit saw major announcements from industry leaders regarding advancements in artificial intelligence. Companies demonstrated AI systems capable of complex reasoning, creative content generation, and unprecedented language understanding. Experts predict these technologies will transform industries from healthcare to entertainment within the next five years.",
      url: "https://example.com/tech-conference-ai",
      urlToImage: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
      publishedAt: "2025-04-14T14:45:00Z",
      source: {
        name: "Tech Today",
        url: "https://example.com/tech-today"
      },
      category: "technology"
    },
    {
      title: "Economic Report Shows Strong Growth in Green Energy Sector",
      description: "Investments in renewable energy hit record highs according to new economic data.",
      content: "The latest economic report reveals that the green energy sector has experienced unprecedented growth over the past quarter. Solar and wind energy companies have seen their stock prices surge as governments worldwide increase funding for renewable energy initiatives. Analysts predict this trend will continue as countries work to meet ambitious climate goals.",
      url: "https://example.com/green-energy-growth",
      urlToImage: "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg",
      publishedAt: "2025-04-13T09:15:00Z",
      source: {
        name: "Financial Times",
        url: "https://example.com/financial-times"
      },
      category: "business"
    },
    {
      title: "New Study Links Exercise to Improved Mental Health",
      description: "Researchers find strong correlation between regular physical activity and reduced anxiety.",
      content: "A comprehensive study published in the Journal of Health Psychology has found that even moderate amounts of regular exercise can significantly reduce symptoms of anxiety and depression. The research, which followed over 5,000 participants for three years, showed that those who exercised at least three times per week reported 60% fewer mental health issues than those who were sedentary.",
      url: "https://example.com/exercise-mental-health",
      urlToImage: "https://images.pexels.com/photos/40751/running-runner-long-distance-fitness-40751.jpeg",
      publishedAt: "2025-04-12T16:20:00Z",
      source: {
        name: "Health Journal",
        url: "https://example.com/health-journal"
      },
      category: "health"
    },
    {
      title: "Major Film Festival Announces Diverse Lineup for 2025",
      description: "This year's festival will feature films from over 50 countries and a record number of female directors.",
      content: "The International Film Festival has announced its most diverse lineup ever for the 2025 event. The selection includes productions from over 50 countries, with 45% of films directed by women and 30% by first-time directors. Festival organizers say this reflects their commitment to showcasing a wide range of voices and perspectives in cinema.",
      url: "https://example.com/film-festival-lineup",
      urlToImage: "https://images.pexels.com/photos/65128/pexels-photo-65128.jpeg",
      publishedAt: "2025-04-11T11:50:00Z",
      source: {
        name: "Entertainment Weekly",
        url: "https://example.com/entertainment-weekly"
      },
      category: "entertainment"
    },
    {
      title: "New Legislation Aims to Protect Consumer Privacy Online",
      description: "Lawmakers propose comprehensive data protection bill to give users more control over personal information.",
      content: "A bipartisan group of legislators has introduced a new bill aimed at strengthening online privacy protections for consumers. The proposed legislation would require companies to obtain explicit consent before collecting personal data, provide clear explanations of how data will be used, and allow users to easily request deletion of their information. Tech industry representatives have expressed concerns about implementation costs.",
      url: "https://example.com/privacy-legislation",
      urlToImage: "https://images.pexels.com/photos/342520/pexels-photo-342520.jpeg",
      publishedAt: "2025-04-10T13:40:00Z",
      source: {
        name: "Politics Daily",
        url: "https://example.com/politics-daily"
      },
      category: "politics"
    }
  ];

  return mockArticles.map(formatArticle);
};

// Function to get top headlines
export const getTopHeadlines = async (category = 'general'): Promise<Article[]> => {
  try {
    // In a real implementation, we would call the actual API
    // const response = await axios.get(`${BASE_URL}/top-headlines`, {
    //   params: {
    //     country: 'us',
    //     category,
    //     apiKey: API_KEY,
    //   },
    // });
    // return response.data.articles.map(formatArticle);
    
    // For now, use mock data
    return getMockNews();
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
};

// Function to search for articles
export const searchArticles = async (query: string): Promise<Article[]> => {
  try {
    // In a real implementation, we would call the actual API
    // const response = await axios.get(`${BASE_URL}/everything`, {
    //   params: {
    //     q: query,
    //     apiKey: API_KEY,
    //   },
    // });
    // return response.data.articles.map(formatArticle);
    
    // For now, filter mock data
    const mockData = await getMockNews();
    return mockData.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) || 
      article.description.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching articles:', error);
    throw error;
  }
};

// Function to get articles by category
export const getArticlesByCategory = async (category: string): Promise<Article[]> => {
  try {
    const mockData = await getMockNews();
    return mockData.filter(article => 
      article.category.toLowerCase() === category.toLowerCase()
    );
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    throw error;
  }
};

// Function to get recommended articles based on user preferences
export const getRecommendedArticles = async (
  preferences: string[]
): Promise<Article[]> => {
  try {
    const mockData = await getMockNews();
    
    // Simple recommendation algorithm: filter by preferences
    return mockData.filter(article => 
      preferences.some(pref => 
        article.category.toLowerCase().includes(pref.toLowerCase()) ||
        article.title.toLowerCase().includes(pref.toLowerCase()) ||
        article.description.toLowerCase().includes(pref.toLowerCase())
      )
    );
  } catch (error) {
    console.error('Error getting recommended articles:', error);
    throw error;
  }
};

export const getTimeAgo = (date: string): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};