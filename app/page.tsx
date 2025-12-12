import React from 'react';
import { Metadata } from 'next';
import { getAllProducts, getCategories } from '@/lib/api';
import { Product } from '@/types/product';
import Header from '@/components/Header/Header';
import ProductListingPage from '@/components/ProductListingPage/ProductListingPage';

export const metadata: Metadata = {
  title: "Discover Our Products - Premium Fashion Collection | LOGO",
  description:
    "Browse through our extensive collection of premium fashion and lifestyle products. Find the perfect items that match your style and personality.",
};

export default async function Home() {
  let products: Product[] = [];
  let categories: Awaited<ReturnType<typeof getCategories>> = [] as Awaited<
    ReturnType<typeof getCategories>
  >;
  let hasError = false;

  try {
    [products, categories] = await Promise.all([
      getAllProducts(),
      getCategories(),
    ]);
  } catch (error) {
    console.error('Error loading page:', error);
    hasError = true;
  }

  return (
    <>
      <Header />
      <main>
        {hasError ? (
          <div
            style={{
              padding: '2rem',
              textAlign: 'center',
              minHeight: '50vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h1>Sorry, we&apos;re experiencing technical difficulties</h1>
            <p>
              Please try again later. Our team is working to resolve this issue.
            </p>
          </div>
        ) : (
          <ProductListingPage
            initialProducts={products}
            categories={categories}
          />
        )}
      </main>
    </>
  );
}