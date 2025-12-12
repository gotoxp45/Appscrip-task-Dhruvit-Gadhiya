import React from 'react';
import { Product } from '@/types/product';
import SafeImage from '@/components/SafeImage/SafeImage';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageAlt = `${product.title} - ${product.category} product image`;
  
  const generateSeoImageName = (title: string, category: string) => {
    return `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${category.toLowerCase()}-product`;
  };

  return (
    <div className={styles.productCard} itemScope itemType="https://schema.org/Product">
      <div className={styles.imageContainer}>
        <SafeImage
          src={product.image}
          alt={imageAlt}
          fill
          className={styles.productImage}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          loading="lazy"
          data-seo-name={generateSeoImageName(product.title, product.category)}
        />
        <button className={styles.wishlistBtn} aria-label={`Add ${product.title} to wishlist`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle} itemProp="name">
          {product.title}
        </h3>
        
        <div className={styles.productMeta}>
          <p className={styles.productCategory} itemProp="category">
            {product.category}
          </p>
          
          {product.rating && (
            <div className={styles.rating} itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
              <span className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`${styles.star} ${i < Math.round(product.rating!.rate) ? styles.filled : ''}`}
                  >
                    ★
                  </span>
                ))}
              </span>
              <span className={styles.ratingText} itemProp="ratingValue">
                {product.rating.rate}
              </span>
              <meta itemProp="ratingCount" content={product.rating.count.toString()} />
            </div>
          )}
        </div>
        
        <div className={styles.priceContainer}>
          <span className={styles.price} itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <span className={styles.currency}>$</span>
            <span className={styles.amount} itemProp="price">{product.price.toFixed(2)}</span>
            <meta itemProp="priceCurrency" content="USD" />
            <meta itemProp="availability" content="https://schema.org/InStock" />
          </span>
        </div>
        
        <p className={styles.productDescription} itemProp="description">
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
