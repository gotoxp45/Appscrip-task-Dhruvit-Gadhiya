'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard/ProductCard';
import Sidebar from '@/components/Sidebar/Sidebar';
import styles from './ProductListingPage.module.css';

interface ProductListingPageProps {
  initialProducts: Product[];
}

interface FilterState {
  categories: string[];
  priceRange: { min: number; max: number };
  occasion: string[];
  work: string[];
  fabric: string[];
  segment: string[];
  suitableFor: string[];
  rawMaterials: string[];
  pattern: string[];
}

type SortOption = 'recommended' | 'newest' | 'popular' | 'price-high' | 'price-low';

const ProductListingPage: React.FC<ProductListingPageProps> = ({
  initialProducts
}) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [products] = useState<Product[]>(initialProducts);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: { min: 0, max: 1000 },
    occasion: [],
    work: [],
    fabric: [],
    segment: [],
    suitableFor: [],
    rawMaterials: [],
    pattern: [],
  });
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [footerSectionsOpen, setFooterSectionsOpen] = useState({
    metaMuse: false,
    quickLinks: false,
    followUs: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setIsHydrated(true);
    }, 0);

    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setTimeout(() => {
        setIsSidebarOpen(true);
      }, 0);
    }
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    filtered = filtered.filter(product => 
      product.price >= filters.priceRange.min && 
      product.price <= filters.priceRange.max
    );

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
        filtered.sort((a, b) => {
          const ratingA = a.rating?.rate || 0;
          const ratingB = b.rating?.rate || 0;
          return ratingB - ratingA;
        });
        break;
      default:
        filtered.sort((a, b) => {
          const ratingA = a.rating?.rate || 0;
          const ratingB = b.rating?.rate || 0;
          return ratingB - ratingA;
        });
    }

    return filtered;
  }, [products, filters, sortBy]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleSortChange = useCallback((value: SortOption) => {
    setSortBy(value);
    setIsSortOpen(false);
  }, []);

  const toggleSortOpen = useCallback(() => {
    setIsSortOpen((prev) => !prev);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const toggleFooterSection = useCallback(
    (section: 'metaMuse' | 'quickLinks' | 'followUs') => {
      setFooterSectionsOpen((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    },
    []
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Product Collection",
            "description": "Browse through our extensive collection of premium fashion and lifestyle products",
            "url": "https://your-domain.com/products",
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": filteredAndSortedProducts.length,
              "itemListElement": filteredAndSortedProducts.slice(0, 10).map((product, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": product.title,
                  "description": product.description,
                  "image": product.image,
                  "offers": {
                    "@type": "Offer",
                    "price": product.price,
                    "priceCurrency": "USD"
                  }
                }
              }))
            }
          })
        }}
      />

      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>DISCOVER OUR PRODUCTS</h1>
          <p className={styles.pageDescription}>
            Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus 
            scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.
          </p>
        </header>

        <div className={styles.controls}>
          <div className={styles.itemInfo}>
            <span className={styles.itemCount}>{filteredAndSortedProducts.length} ITEMS</span>
            <button 
              className={styles.filterToggle}
              onClick={toggleSidebar}
              aria-label={isSidebarOpen ? 'Hide filters' : 'Show filters'}
              aria-expanded={isSidebarOpen}
            >
              <span className={styles.filterToggleIcon}>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <polyline
                    points="15 18 9 12 15 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className={styles.filterToggleText}>
                {isSidebarOpen ? 'HIDE FILTER' : 'SHOW FILTER'}
              </span>
            </button>
          </div>
          
          <div className={styles.sortContainer}>
            <div className={styles.sortDropdown}>
              <button
                type="button"
                className={styles.sortButton}
                onClick={toggleSortOpen}
                aria-haspopup="listbox"
                aria-expanded={isSortOpen}
              >
                <span className={styles.sortButtonLabel}>
                  {sortBy === 'recommended' && 'RECOMMENDED'}
                  {sortBy === 'newest' && 'NEWEST FIRST'}
                  {sortBy === 'popular' && 'POPULAR'}
                  {sortBy === 'price-high' && 'PRICE : HIGH TO LOW'}
                  {sortBy === 'price-low' && 'PRICE : LOW TO HIGH'}
                </span>
                <span className={styles.sortChevron}>▼</span>
              </button>

              {isSortOpen && (
                <ul
                  className={styles.sortMenu}
                  role="listbox"
                  aria-label="Sort products"
                >
                  <li className={styles.sortMenuItem}>
                    <button
                      type="button"
                      className={`${styles.sortMenuButton} ${sortBy === 'recommended' ? styles.sortMenuButtonActive : ''}`}
                      onClick={() => handleSortChange('recommended')}
                    >
                      <span className={styles.sortMenuCheck}>
                        {sortBy === 'recommended' ? '✓' : ''}
                      </span>
                      <span className={styles.sortMenuLabel}>RECOMMENDED</span>
                    </button>
                  </li>
                  <li className={styles.sortMenuItem}>
                    <button
                      type="button"
                      className={`${styles.sortMenuButton} ${sortBy === 'newest' ? styles.sortMenuButtonActive : ''}`}
                      onClick={() => handleSortChange('newest')}
                    >
                      <span className={styles.sortMenuCheck}>
                        {sortBy === 'newest' ? '✓' : ''}
                      </span>
                      <span className={styles.sortMenuLabel}>NEWEST FIRST</span>
                    </button>
                  </li>
                  <li className={styles.sortMenuItem}>
                    <button
                      type="button"
                      className={`${styles.sortMenuButton} ${sortBy === 'popular' ? styles.sortMenuButtonActive : ''}`}
                      onClick={() => handleSortChange('popular')}
                    >
                      <span className={styles.sortMenuCheck}>
                        {sortBy === 'popular' ? '✓' : ''}
                      </span>
                      <span className={styles.sortMenuLabel}>POPULAR</span>
                    </button>
                  </li>
                  <li className={styles.sortMenuItem}>
                    <button
                      type="button"
                      className={`${styles.sortMenuButton} ${sortBy === 'price-high' ? styles.sortMenuButtonActive : ''}`}
                      onClick={() => handleSortChange('price-high')}
                    >
                      <span className={styles.sortMenuCheck}>
                        {sortBy === 'price-high' ? '✓' : ''}
                      </span>
                      <span className={styles.sortMenuLabel}>PRICE : HIGH TO LOW</span>
                    </button>
                  </li>
                  <li className={styles.sortMenuItem}>
                    <button
                      type="button"
                      className={`${styles.sortMenuButton} ${sortBy === 'price-low' ? styles.sortMenuButtonActive : ''}`}
                      onClick={() => handleSortChange('price-low')}
                    >
                      <span className={styles.sortMenuCheck}>
                        {sortBy === 'price-low' ? '✓' : ''}
                      </span>
                      <span className={styles.sortMenuLabel}>PRICE : LOW TO HIGH</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={styles.mainContent}>
          {isHydrated && isSidebarOpen && (
            <Sidebar
              onFilterChange={handleFilterChange}
              isOpen={isSidebarOpen}
              onClose={closeSidebar}
            />
          )}

          <section className={styles.productsSection} aria-label="Products">
            <h2 className={styles.visuallyHidden}>Products List</h2>
            {filteredAndSortedProducts.length === 0 ? (
              <div className={styles.noProducts}>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search criteria</p>
              </div>
            ) : (
              <div className={styles.productsGrid}>
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <footer className={styles.footer}>
        <section className={styles.newsletter} aria-label="Newsletter signup">
          <div className={styles.newsletterInner}>
            <div className={styles.newsletterContent}>
              <h2 className={styles.newsletterTitle}>BE THE FIRST TO KNOW</h2>
              <p className={styles.newsletterDescription}>
                Sign up for updates from mettā muse.
              </p>
              <form className={styles.newsletterForm} aria-label="Newsletter subscription">
                <div className={styles.newsletterInputGroup}>
                  <input
                    type="email"
                    placeholder="Enter your e-mail..."
                    className={styles.newsletterInput}
                    aria-label="Email address"
                    required
                  />
                  <button 
                    type="submit" 
                    className={styles.newsletterButton}
                    aria-label="Subscribe to newsletter"
                  >
                    SUBSCRIBE
                  </button>
                </div>
              </form>
            </div>

            <div className={styles.contactInfo}>
              <h3 className={styles.contactTitle}>CONTACT US</h3>
              <p className={styles.contactPhone}>+44 221 133 5360</p>
              <p className={styles.contactEmail}>customercare@mettamuse.com</p>
              
              <div className={styles.currency}>
                <h4 className={styles.currencyTitle}>CURRENCY</h4>
                <div className={styles.currencySelector}>
                  <div className={styles.currencyFlagWrapper}>
                    <Image
                      src="/usa.png"
                      alt="USA flag"
                      width={24}
                      height={24}
                      className={styles.currencyFlag}
                    />
                  </div>
                  <span className={styles.currencyBullet}>◆</span>
                  <span className={styles.currencyCode}>USD</span>
                </div>
                <p className={styles.currencyNote}>
                  Transactions will be completed in Euros and a currency reference is available on hover.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <button
              type="button"
              className={styles.footerAccordionHeader}
              onClick={() => toggleFooterSection('metaMuse')}
              aria-expanded={footerSectionsOpen.metaMuse}
            >
              <h3 className={styles.footerTitle}>mettā muse</h3>
              <span
                className={`${styles.footerAccordionIcon} ${
                  footerSectionsOpen.metaMuse ? styles.footerAccordionIconOpen : ''
                }`}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>
            <div
              className={`${styles.footerAccordionContent} ${
                footerSectionsOpen.metaMuse ? styles.footerAccordionContentOpen : ''
              }`}
            >
              <ul className={styles.footerLinks}>
                <li><a href="/about">About Us</a></li>
                <li><a href="/stories">Stories</a></li>
                <li><a href="/artisans">Artisans</a></li>
                <li><a href="/boutiques">Boutiques</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/compliance">EU Compliances Docs</a></li>
              </ul>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <button
              type="button"
              className={styles.footerAccordionHeader}
              onClick={() => toggleFooterSection('quickLinks')}
              aria-expanded={footerSectionsOpen.quickLinks}
            >
              <h3 className={styles.footerTitle}>QUICK LINKS</h3>
              <span
                className={`${styles.footerAccordionIcon} ${
                  footerSectionsOpen.quickLinks ? styles.footerAccordionIconOpen : ''
                }`}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>
            <div
              className={`${styles.footerAccordionContent} ${
                footerSectionsOpen.quickLinks ? styles.footerAccordionContentOpen : ''
              }`}
            >
              <ul className={styles.footerLinks}>
                <li><a href="/orders">Orders & Shipping</a></li>
                <li><a href="/seller">Join/Login as a Seller</a></li>
                <li><a href="/payment">Payment & Pricing</a></li>
                <li><a href="/returns">Return & Refunds</a></li>
                <li><a href="/faq">FAQs</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <button
              type="button"
              className={styles.footerAccordionHeader}
              onClick={() => toggleFooterSection('followUs')}
              aria-expanded={footerSectionsOpen.followUs}
            >
              <h3 className={styles.footerTitle}>FOLLOW US</h3>
              <span
                className={`${styles.footerAccordionIcon} ${
                  footerSectionsOpen.followUs ? styles.footerAccordionIconOpen : ''
                }`}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>
            <div
              className={`${styles.footerAccordionContent} ${
                footerSectionsOpen.followUs ? styles.footerAccordionContentOpen : ''
              }`}
            >
              <div className={styles.socialLinks}>
                <a href="https://instagram.com" aria-label="Follow us on Instagram" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" aria-label="Follow us on LinkedIn" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className={styles.paymentAccepts}>
              <h4 className={styles.paymentTitle}>mettā muse ACCEPTS</h4>
              <div className={styles.paymentMethods}>
                <div >
                  <Image src="/Gpay.png" alt="GPay" width={40} height={24} />
                </div>
                <div >
                  <Image src="/mastercard.png" alt="Mastercard" width={40} height={24} />
                </div>
                <div>
                  <Image src="/paypal.png" alt="PayPal" width={40} height={24} />
                </div>
                <div>
                  <Image src="/amex.png" alt="Amex" width={40} height={24} />
                </div>
                <div>
                  <Image src="/ApplePay.png" alt="Apple Pay" width={40} height={24} />
                </div>
                <div>
                  <Image src="/pay.png" alt="OPay" width={40} height={24} />
                </div>
              </div>
            </div>
          </div>

          </div>
          
          <div className={styles.footerBottom}>
            <p>Copyright &copy; 2023 mettamuse. All rights reserved.</p>
          </div>
      </footer>
    </>
  );
};

export default ProductListingPage;
