export const findImage = (itemsSrc: JSON) => {
  const rawItems = itemsSrc as unknown as string;
  const parsed = JSON.parse(rawItems);

  const urls: string[] = [];

  for (const item of parsed) {
    const productUrl = item.productItem?.product?.imageUrl;
    if (productUrl) urls.push(productUrl);
  }
  return urls;
};
