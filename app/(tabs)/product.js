import { useLocalSearchParams } from "expo-router";
import ProductDetailsScreen from "../../src/screens/ProductDetailsScreen";

export default function ProductPage() {
  const { product } = useLocalSearchParams();

  return (
    <ProductDetailsScreen
      route={{ params: { product: JSON.parse(product) } }}
    />
  );
}