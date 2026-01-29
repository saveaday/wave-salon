// Google Analytics utility functions

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

let isGAInitialized = false;

/**
 * Initialize Google Analytics with the provided measurement ID
 * @param gaId - Google Analytics measurement ID (e.g., G-XXXXXXXXXX)
 */
export const initializeGA = (gaId: string | undefined): void => {
  if (!gaId || isGAInitialized) {
    return;
  }

  // Create gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', gaId);

  isGAInitialized = true;
  console.log(`Google Analytics initialized with ID: ${gaId}`);
};

/**
 * Track link click events
 * @param linkLabel - The label/name of the link
 * @param linkUrl - The URL of the link
 * @param linkType - The type of link (e.g., social, whatsapp)
 */
export const trackLinkClick = (
  linkLabel: string,
  linkUrl: string,
  linkType: string
): void => {
  if (!window.gtag) {
    return;
  }

  window.gtag('event', 'link_click', {
    link_label: linkLabel,
    link_url: linkUrl,
    link_type: linkType,
  });

  console.log('GA Event: link_click', { linkLabel, linkUrl, linkType });
};

/**
 * Track catalogue item view events
 * @param itemName - Name of the catalogue item
 * @param price - Price of the item
 * @param category - Category the item belongs to
 * @param variant - Optional variant information
 */
export const trackCatalogueItemView = (
  itemName: string,
  price: number,
  category: string,
  variant?: string
): void => {
  if (!window.gtag) {
    return;
  }

  const eventParams: Record<string, any> = {
    item_name: itemName,
    price: price,
    category: category,
    currency: 'AED',
  };

  if (variant) {
    eventParams.variant = variant;
  }

  window.gtag('event', 'view_item', eventParams);

  console.log('GA Event: view_item', eventParams);
};

/**
 * Track category expansion events
 * @param categoryName - Name of the category
 * @param itemCount - Number of items in the category
 */
export const trackCategoryExpand = (
  categoryName: string,
  itemCount: number
): void => {
  if (!window.gtag) {
    return;
  }

  window.gtag('event', 'category_expand', {
    category_name: categoryName,
    item_count: itemCount,
  });

  console.log('GA Event: category_expand', { categoryName, itemCount });
};
