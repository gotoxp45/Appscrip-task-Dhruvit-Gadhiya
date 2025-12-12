'use client';

import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface FilterState {
  categories: string[];
  idealFor: string[];
  priceRange: { min: number; max: number };
  occasion: string[];
  work: string[];
  fabric: string[];
  segment: string[];
  suitableFor: string[];
  rawMaterials: string[];
  pattern: string[];
}

type CheckboxFilterKey = Exclude<keyof FilterState, 'priceRange'>;

const Sidebar: React.FC<SidebarProps> = ({ categories, onFilterChange, isOpen, onClose }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    idealFor: [],
    priceRange: { min: 0, max: 1000 },
    occasion: [],
    work: [],
    fabric: [],
    segment: [],
    suitableFor: [],
    rawMaterials: [],
    pattern: [],
  });

  const [isCustomizable, setIsCustomizable] = useState(false);

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleCheckboxChange = (
    filterType: CheckboxFilterKey,
    value: string,
    checked: boolean
  ) => {
    const newFilters = { ...filters };
    const currentArray = newFilters[filterType] as string[];
    
    if (checked) {
      if (!currentArray.includes(value)) {
        (newFilters[filterType] as string[]) = [...currentArray, value];
      }
    } else {
      (newFilters[filterType] as string[]) = currentArray.filter(item => item !== value);
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const filterSections: {
    id: CheckboxFilterKey;
    title: string;
    options: string[];
  }[] = [
    {
      id: 'idealFor',
      title: 'IDEAL FOR',
      options: ['Men', 'Women', 'Baby & Kids']
    },
    {
      id: 'occasion',
      title: 'OCCASION',
      options: ['Casual', 'Formal', 'Party', 'Wedding', 'Sports']
    },
    {
      id: 'work',
      title: 'WORK',
      options: ['Office', 'Work from Home', 'Business Travel', 'Outdoor']
    },
    {
      id: 'fabric',
      title: 'FABRIC',
      options: ['Cotton', 'Silk', 'Polyester', 'Wool', 'Linen', 'Denim']
    },
    {
      id: 'segment',
      title: 'SEGMENT',
      options: ['Luxury', 'Premium', 'Standard', 'Budget']
    },
    {
      id: 'suitableFor',
      title: 'SUITABLE FOR',
      options: ['Summer', 'Winter', 'Monsoon', 'All Season']
    },
    {
      id: 'rawMaterials',
      title: 'RAW MATERIALS',
      options: ['Organic', 'Recycled', 'Sustainable', 'Synthetic']
    },
    {
      id: 'pattern',
      title: 'PATTERN',
      options: ['Solid', 'Striped', 'Printed', 'Embroidered', 'Plain']
    }
  ];

  const clearSectionFilters = (sectionId: CheckboxFilterKey) => {
    const newFilters: FilterState = {
      ...filters,
      [sectionId]: [],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.itemCount}>
            <span className={styles.count}>3425 ITEMS</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close filters">
            ✕
          </button>
        </div>

          <div className={styles.filtersContainer}>
          <div className={styles.filterSection}>
            <label className={styles.customizableRow}>
              <input
                type="checkbox"
                checked={isCustomizable}
                onChange={(e) => setIsCustomizable(e.target.checked)}
                className={styles.filterCheckbox}
              />
              <span className={styles.checkboxCustom}></span>
              <span className={styles.customizableLabel}>CUSTOMIZABLE</span>
            </label>
          </div>
          {filterSections.map((section) => (
            <div key={section.id} className={styles.filterSection}>
              <button
                className={styles.filterTitle}
                onClick={() => toggleSection(section.id)}
                aria-expanded={expandedSections.has(section.id)}
              >
                <span>{section.title}</span>
                <span className={`${styles.arrow} ${expandedSections.has(section.id) ? styles.arrowUp : ''}`}>
                  ▼
                </span>
              </button>
              <div className={styles.filterSummary}>All</div>

              {expandedSections.has(section.id) && (
                <div className={styles.filterOptions}>
                  <div className={styles.selectAll}>
                    <button
                      type="button"
                      className={styles.unselectAll}
                      onClick={() => clearSectionFilters(section.id)}
                    >
                      Unselect all
                    </button>
                  </div>
                  {section.options.map((option) => (
                    <label key={option} className={styles.filterOption}>
                      <input
                        type="checkbox"
                        checked={filters[section.id].includes(option)}
                        onChange={(e) => handleCheckboxChange(
                          section.id,
                          option,
                          e.target.checked
                        )}
                        className={styles.filterCheckbox}
                      />
                      <span className={styles.checkboxCustom}></span>
                      <span className={styles.optionText}>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
