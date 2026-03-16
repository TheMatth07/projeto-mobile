import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { CartContext } from "../../src/context/CartContext";

export default function CartScreen() {

  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho 🛒</Text>

      {cart.length === 0 ? (
        <Text>Seu carrinho ainda está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.product}>
                
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                />

                <View style={styles.info}>
                  <Text style={styles.name}>{item.title}</Text>
                  <Text style={styles.price}>${item.price}</Text>

                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Text style={styles.removeText}>Remover ❌</Text>
                  </TouchableOpacity>

                </View>

              </View>
            )}
          />

          <Text style={styles.total}>
            Total: ${total.toFixed(2)}
          </Text>
        </>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },

  product: {
    flexDirection: "row",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 10
  },

  image: {
    width: 60,
    height: 60,
    marginRight: 10
  },

  info: {
    flex: 1,
    justifyContent: "center"
  },

  name: {
    fontSize: 16,
    fontWeight: "bold"
  },

  price: {
    color: "green",
    marginTop: 4
  },

  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20
  },

  removeButton: {
    marginTop: 6,
    backgroundColor: "#ff4d4d",
    padding: 6,
    borderRadius: 5,
    alignSelf: "flex-start"
  },

  removeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold"
  }

});