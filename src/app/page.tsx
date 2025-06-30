import { getAllProducts } from '../api/products/products';
import ProductList from '../components/ProductList';

export default async function HomePage() {
  const response = await getAllProducts();
  const products = response.data;
  return <ProductList products={products} />;
}

export const revalidate = 60; // Revalidate at most every 60 seconds
