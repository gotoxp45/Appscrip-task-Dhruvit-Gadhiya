import { Product } from '@/types/product';
import fs from "fs";
import path from "path";

export async function getAllProducts(): Promise<Product[]> {
  try {
    const filePath = path.join(process.cwd(), "lib/data.json");
    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return products;
  } catch (error) {
    console.warn('Network error fetching products:', error);
    return [];
  }
}

