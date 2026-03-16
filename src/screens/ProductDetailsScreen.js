import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

export default function ProductDetailsScreen() {

  const router = useRouter();
  const dispatch = useDispatch();

  const params = useLocalSearchParams();
  const product = JSON.parse(params.product);

  function addToCartProduct() {
    dispatch(addToCart(product));
    Alert.alert("Sucesso", "Produto adicionado ao carrinho!");
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: "#3498db", marginBottom: 10 }}>
          {"< Voltar"}
        </Text>
      </TouchableOpacity>

      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.name}>{product.title}</Text>

      <Text style={styles.price}>${product.price}</Text>

      <Text style={styles.description}>
        {product.description}
      </Text>

      <TouchableOpacity style={styles.button} onPress={addToCartProduct}>
        <Text style={styles.buttonText}>Adicionar ao carrinho 🛒</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },

  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 20
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },

  price: {
    fontSize: 20,
    color: "green",
    marginBottom: 15
  },

  description: {
    fontSize: 16,
    lineHeight: 22
  },

  button: {
    marginTop: 20,
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16
  }

});