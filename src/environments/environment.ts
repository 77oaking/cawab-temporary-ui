/**
 * Development environment configuration.
 *
 * PHASE 1 (current): UI only. `apiUrl` is unused because services read from
 * local mock JSON in /assets/data. `useMockData` is true.
 *
 * PHASE 2 (future): point `apiUrl` at the Next.js + TypeScript API, flip
 * `useMockData` to false, and every service automatically switches from mock
 * JSON to live HTTP calls — no component changes required.
 */
export const environment = {
  production: false,
  useMockData: true,
  apiUrl: 'http://localhost:3000/api',
  defaultLanguage: 'en',
  contact: {
    email: 'cantonmentians.diary2020@gmail.com',
    phone: '+880 1938-365140'
  }
};
