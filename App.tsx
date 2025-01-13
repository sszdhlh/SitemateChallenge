import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

// API Configuration
const API_KEY = '75cacf83350b4811932d41f621c65b53'; // Replace with your API Key
const BASE_URL = 'https://newsapi.org/v2';

// Function to fetch news sources
const fetchSources = async (category?: string, language?: string, country?: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines/sources`, {
      params: {
        category,
        language,
        country,
        apiKey: API_KEY,
      },
    });
    return response.data.sources; // Return the list of sources
  } catch (error) {
    throw error; // Propagate the error
  }
};

interface Source {
  url: string | undefined;
  id: string;
  name: string;
  description: string;
  category: string;
  language: string;
  country: string;
}

const App = () => {
  const [query, setQuery] = useState(''); // Search query
  const [results, setResults] = useState<Source[]>([]); // News sources results
  const [loading, setLoading] = useState(false); // Loading state
  const [category, setCategory] = useState<string>(''); // Category
  const [language, setLanguage] = useState<string>(''); // Language
  const [country, setCountry] = useState<string>(''); // Country

  // Function to fetch news sources when filters are applied
  const fetchNews = async () => {
    if (!query.trim()) {
      Alert.alert('Error', 'Search query cannot be empty!');
      return;
    }

    setLoading(true);
    try {
      const sources = await fetchSources(category, language, country);
      setResults(sources); // Set the sources based on selected filters
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch sources. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Reset search results when the query is cleared
  useEffect(() => {
    if (!query.trim()) {
      setResults([]); // Clear results when query is empty
    }
  }, [query]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>News Search</Text>

      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Search news..."
        value={query}
        onChangeText={setQuery}
      />

      {/* Category Picker */}
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="All Categories" value="" />
        <Picker.Item label="General" value="general" />
        <Picker.Item label="Business" value="business" />
        <Picker.Item label="Entertainment" value="entertainment" />
        <Picker.Item label="Health" value="health" />
        <Picker.Item label="Science" value="science" />
        <Picker.Item label="Sports" value="sports" />
        <Picker.Item label="Technology" value="technology" />
      </Picker>

      {/* Language Picker */}
      <Picker
        selectedValue={language}
        style={styles.picker}
        onValueChange={(itemValue) => setLanguage(itemValue)}
      >
        <Picker.Item label="All Languages" value="" />
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Spanish" value="es" />
        <Picker.Item label="French" value="fr" />
        <Picker.Item label="German" value="de" />
        <Picker.Item label="Chinese" value="zh" />
        <Picker.Item label="Arabic" value="ar" />
      </Picker>

      {/* Country Picker */}
      <Picker
        selectedValue={country}
        style={styles.picker}
        onValueChange={(itemValue) => setCountry(itemValue)}
      >
        <Picker.Item label="All Countries" value="" />
        <Picker.Item label="United States" value="us" />
        <Picker.Item label="United Kingdom" value="gb" />
        <Picker.Item label="Australia" value="au" />
        <Picker.Item label="Canada" value="ca" />
        <Picker.Item label="China" value="cn" />
      </Picker>

      {/* Search Button */}
      <Button title="Search" onPress={fetchNews} disabled={loading} />

      {/* Loading Indicator */}
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        // Display Results
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => Alert.alert('Source URL', item.url)}>
              <View style={styles.result}>
                <Text style={styles.title}>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

// Styles for the App
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8, borderRadius: 4 },
  picker: { height: 50, marginBottom: 10 },
  loading: { textAlign: 'center', marginVertical: 10, fontSize: 16 },
  result: { marginBottom: 16, padding: 10, backgroundColor: '#fff', borderRadius: 4, elevation: 2 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
});

export default App;
