import SanityClientConstructor from '@sanity/client';

export const sanityClient = new SanityClientConstructor({
  projectId: 'dm8xzyw3',
  dataset: 'production',
  apiVersion: '2022-01-18',
  useCdn: true,
});
