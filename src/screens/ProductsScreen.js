import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import api from "../services/api";

export default function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function loadProducts() {
    try {

      let url = "/products";

      if (category === "masculino") {
        url = "/products/category/mens-shirts";
      }

      if (category === "feminino") {
        url = "/products/category/womens-dresses";
      }

      const response = await api.get(url);

      setProducts(response.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
}
  useEffect(() => {
    loadProducts();
  }, [category]);

  const filteredProducts = products.filter((product) => {

    const matchSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "all" ||
      (category === "masculino" && product.category === "men's clothing") ||
      (category === "feminino" && product.category === "women's clothing");

    return matchSearch && matchCategory;
  });

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo de Produtos</Text>

      <TextInput
        style={styles.search}
        placeholder="Buscar produto..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.categories}>

        <TouchableOpacity onPress={() => setCategory("all")}>
          <Text style={styles.category}>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCategory("masculino")}>
          <Text style={styles.category}>Masculino</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCategory("feminino")}>
          <Text style={styles.category}>Feminino</Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhum produto encontrado.
          </Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/product",
                params: { product: JSON.stringify(item) }
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15
  },

  category: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3498db"
  },

  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center"
  },

  card: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },

    elevation: 3
  },

  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10
  },

  name: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5
  },

  price: {
    fontSize: 16,
    color: "#2ecc71",
    fontWeight: "bold"
  }

});