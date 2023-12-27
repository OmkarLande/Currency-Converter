import React, { useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import CurrencyButton from './components/CurrencyButton'; // Assuming you have this component
import { currencyByRupee } from './constants';
import Snackbar from 'react-native-snackbar';

function App(): React.JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      // Display a Snackbar if no input value
      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#ea7773',
        textColor: '#1e1e1e',
      });
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)} 🤑`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      // Display a Snackbar for invalid number
      return Snackbar.show({
        text: 'Not a valid number to convert!',
        backgroundColor: '#f4be2c',
        textColor: '#1e1e1e',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
      <View style={styles.topContainer}>
        <Text style={styles.headingText}>Currency Converter</Text>
        <View style={styles.rupeesContainer}>
          <Text style={styles.rupee}>₹</Text>
          <TextInput
            maxLength={14}
            value={inputValue}
            onChangeText={setInputValue}
            keyboardType="number-pad"
            placeholder="Enter Amount in Rupees"
            clearButtonMode="always" // for iOS
            placeholderTextColor="#95a5a6"
            style={styles.inputAmountField}
          />
        </View>
        {resultValue && <Text style={styles.resultTxt}>{resultValue}</Text>}
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          numColumns={3}
          data={currencyByRupee}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.button,
                targetCurrency === item.name && styles.selected,
              ]}
              onPress={() => buttonPressed(item)}
            >
              <CurrencyButton {...item} />
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headingText: {
    color: '#ecf0f1',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  resultTxt: {
    fontSize: 32,
    color: '#ecf0f1',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,
    fontSize: 22,
    color: '#ecf0f1',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,
    margin: 12,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#3498db',
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#2980b9',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App;
