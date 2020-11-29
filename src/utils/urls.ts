export const makeProductUrl = (id: number | string, slug: string) => {
  return `/clothing/${id}-${slug}`;
};
