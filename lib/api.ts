import { Product } from '@/types/product';

const API_BASE_URL = 'https://fakestoreapi.com';

// Server-side only fetch of products, on every request
export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const products: Product[] = await response.json();
  return products;
}

