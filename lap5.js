import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const bikes = [
  { id: '1', name: 'Pinarello', price: 1800, discount: 1500, image: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/a8901347f95c85dfb70f786a54fc8618', category: 'All', description: 'This is a high-quality sport bike.' },
  { id: '2', name: 'Pina Mountain', price: 1700, discount: 1350, image: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/1c09d8030cd459053ef8494412c32804', category: 'Mountain', description: 'Mountain bike suitable for rough terrains.' },
  { id: '3', name: 'Pina Bike', price: 1500, discount: 1350, image: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/295b63a48eba8af4409f6007a0c15c20', category: 'All', description: 'All-around bike for everyday use.' },
  { id: '4', name: 'Pinarello', price: 1900, discount: 1490, image: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/756f5ffd332f519980f3ea3d5cb5e529', category: 'Roadbike', description: 'Road bike with aerodynamic design.' },
  { id: '5', name: 'Pina Bike', price: 2700, discount: 2450, image: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/295b63a48eba8af4409f6007a0c15c20', category: 'Mountain', description: 'Premium mountain bike for professionals.' },
  { id: '6', name: 'Pinarello', price: 1350, discount: 1200, image: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/1c09d8030cd459053ef8494412c32804', category: 'Roadbike', description: 'Affordable road bike with great features.' },
];


function HomeScreen({ navigation }) {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.premiumText}>A premium online store for sporters and their stylish choice</Text>
        <Image
          source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/a8901347f95c85dfb70f786a54fc8618' }}
          style={styles.image}
        />
      </View>

      <Text style={styles.powerBikeText}>POWER BIKE SHOP</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BikeList', { name })}
        disabled={!name.trim()}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
}

function BikeListScreen({ route, navigation }) {
  const { name } = route.params;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBikes = bikes.filter(bike => selectedCategory === 'All' || bike.category === selectedCategory);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BikeDetail', { bike: item })}>
      <View style={styles.bikeCard}>
        <Image source={{ uri: item.image }} style={styles.bikeImage} />
        <Text style={styles.bikeName}>{item.name}</Text>
        <Text style={styles.bikePrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>The world's Best Bike</Text>

      <View style={styles.categoryTabs}>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === 'All' && styles.selectedCategory]}
          onPress={() => setSelectedCategory('All')}
        >
          <Text style={styles.categoryText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === 'Roadbike' && styles.selectedCategory]}
          onPress={() => setSelectedCategory('Roadbike')}
        >
          <Text style={styles.categoryText}>Roadbike</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === 'Mountain' && styles.selectedCategory]}
          onPress={() => setSelectedCategory('Mountain')}
        >
          <Text style={styles.categoryText}>Mountain</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBikes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.bikeList}
      />
    </View>
  );
}


function BikeDetailScreen({ route }) {
  const { bike } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: bike.image }} style={styles.detailImage} />
      <Text style={styles.bikeName}>{bike.name}</Text>
      <Text style={styles.bikeDiscount}>15% OFF | ${bike.discount}</Text>
      <Text style={styles.bikePrice}>${bike.price}</Text>
      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.bikeDescription}>{bike.description}</Text>

      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BikeList" component={BikeListScreen} />
        <Stack.Screen name="BikeDetail" component={BikeDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  premiumText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#555',
  },
  image: {
    width: 200,
    height: 200,
  },
  powerBikeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#E74C3C',
  },
  categoryTabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  selectedCategory: {
    backgroundColor: '#E74C3C',
  },
  categoryText: {
    color: '#555',
  },
  bikeList: {
    justifyContent: 'center',  // Căn giữa các sản phẩm
    flexDirection: 'row',      // Đặt các sản phẩm theo hàng ngang
    flexWrap: 'wrap',          // Để các sản phẩm tự xuống hàng khi không đủ chỗ
  },
   bikeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    width: '45%',              // Chiếm 45% chiều rộng để căn vừa 2 sản phẩm mỗi hàng
  },
  bikeImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  bikeName: {
    fontSize: 16,
    fontWeight: 'bold',
     textAlign: 'center',
    marginBottom: 5,
  },
  bikePrice: {
    color: '#E74C3C',
    fontSize: 14,
  },
  detailImage: {
    width: '70%',
    height: 200,
    justifyContent: 'center',
    marginBottom: 20,
  },
  bikeDiscount: {
    color: '#28A745',
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  bikeDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
