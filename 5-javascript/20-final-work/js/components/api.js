export const getProducts = async () => {
  try {
    const response = await fetch('./data/data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
