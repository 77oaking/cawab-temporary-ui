/**
 * Production environment configuration.
 * In Phase 2, set `useMockData` to false and `apiUrl` to the deployed API origin.
 */
export const environment = {
  production: true,
  useMockData: true,
  apiUrl: 'https://api.cawab.org/api',
  defaultLanguage: 'en',
  contact: {
    email: 'cantonmentians.diary2020@gmail.com',
    phone: '+880 1938-365140'
  }
};
