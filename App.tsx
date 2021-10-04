import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

const App: React.FC = () => {
  return (
    <SafeAreaView>
      <Text style={styles.title}>Hello World!</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
})

export default App
