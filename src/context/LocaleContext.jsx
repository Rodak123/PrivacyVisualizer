import React from 'react';

export const DEFAULT_LOCALE = 'en-us';

export const LocaleContext = React.createContext({
  languages: [DEFAULT_LOCALE],
  locale: DEFAULT_LOCALE,
  changeLocale: (index) => { },
  fetchLocaleXML: async (file) => { }
});