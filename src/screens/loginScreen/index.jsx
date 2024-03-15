import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'postgres://postgres.dilhnddpgnwywgmrlhey:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnaW96Z3V6ZnV3Y2htcGdpdnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAzMjA0NjIsImV4cCI6MjAyNTg5NjQ2Mn0._9_KOdLMK9I_XTFf1B3DphacS3UMxF-eM-4b6sTwY1M';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) console.log('Inloggningsfel:', error);
    else console.log('Användare inloggad:', user, 'Session:', session);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Välkommen!</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="E-post"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Lösenord"
        secureTextEntry
      />
      <Button title="Logga in" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
