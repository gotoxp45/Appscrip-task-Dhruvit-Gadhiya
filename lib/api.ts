import { Product } from '@/types/product';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://fakestoreapi.com';

export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      // Cache and revalidate the response every hour
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn('Failed to fetch products:', res.status, res.statusText);
      return [];
    }

    const products: Product[] = await res.json();
    return products;
  } catch (error) {
    console.warn('Network error fetching products:', error);
    return [];
  }
}

