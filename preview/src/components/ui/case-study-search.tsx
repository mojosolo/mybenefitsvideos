"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CaseStudy } from "@/lib/case-studies";

interface CaseStudySearchProps {
  caseStudies: CaseStudy[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function CaseStudySearch({ 
  caseStudies, 
  searchQuery, 
  onSearchChange,
  placeholder = "Search case studies by company, industry, or challenge..."
}: CaseStudySearchProps) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce the search query to avoid excessive API calls or filtering
  const debouncedSearchQuery = useDebounce(inputValue, 300);

  // Update parent component when debounced value changes
  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      onSearchChange(debouncedSearchQuery);
      setIsSearching(false);
    }
  }, [debouncedSearchQuery, searchQuery, onSearchChange]);

  // Handle input changes
  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    setIsSearching(true);
    setShowSuggestions(true);
    setActiveSuggestion(-1);
  }, []);

  // Generate search suggestions
  useEffect(() => {
    if (inputValue.length < 2) {
      setSuggestions([]);
      return;
    }

    const query = inputValue.toLowerCase();
    const suggestionSet = new Set<string>();

    caseStudies.forEach(study => {
      // Add client names
      if (study.client.toLowerCase().includes(query)) {
        suggestionSet.add(study.client);
      }
      
      // Add industry names
      if (study.industry.toLowerCase().includes(query)) {
        suggestionSet.add(study.industry);
      }
      
      // Add challenge keywords
      const challengeWords = study.challenge.toLowerCase().split(' ');
      challengeWords.forEach(word => {
        if (word.length > 3 && word.includes(query)) {
          suggestionSet.add(`Challenge: ${word}`);
        }
      });

      // Add service types
      study.services.forEach(service => {
        if (service.toLowerCase().includes(query)) {
          suggestionSet.add(service);
        }
      });

      // Add tags
      study.tags.forEach(tag => {
        if (tag.toLowerCase().includes(query)) {
          suggestionSet.add(tag);
        }
      });
    });

    setSuggestions(Array.from(suggestionSet).slice(0, 8));
  }, [inputValue, caseStudies]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestion >= 0) {
          handleSuggestionClick(suggestions[activeSuggestion]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const cleanSuggestion = suggestion.replace('Challenge: ', '');
    setInputValue(cleanSuggestion);
    onSearchChange(cleanSuggestion);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
  };

  const clearSearch = () => {
    setInputValue('');
    onSearchChange('');
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setShowSuggestions(suggestions.length > 0)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 h-12 border-gray-200 focus:ring-2 focus:ring-oklch(240.325 100% 50%)/20 focus:border-oklch(240.325 100% 50%)"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {isSearching && (
            <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
          )}
          {inputValue && (
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                index === activeSuggestion ? 'bg-oklch(240.325 100% 50%)/5' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <Search className="h-3 w-3 text-gray-400" />
                <span className="text-gray-900">
                  {suggestion.startsWith('Challenge: ') ? (
                    <>
                      <span className="text-gray-500">Challenge: </span>
                      {suggestion.replace('Challenge: ', '')}
                    </>
                  ) : suggestion}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Search Results Count */}
      {inputValue && (
        <div className="mt-2 text-xs text-gray-500">
          Search suggestions based on company names, industries, challenges, and services
        </div>
      )}
    </div>
  );
}