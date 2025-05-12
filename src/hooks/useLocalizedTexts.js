import { useEffect, useState, useCallback, useContext, useRef } from 'react';
import { LocaleContext } from '../context/LocaleContext';

export function useLocalizedTexts({ file, validator, parser }) {
  const { fetchLocaleXML, locale } = useContext(LocaleContext);
  const [lastLocale, setLastLocale] = useState(null);
  const [texts, setTexts] = useState(null);

  const validatorRef = useRef(validator);
  const parserRef = useRef(parser);

  useEffect(() => {
    validatorRef.current = validator;
    parserRef.current = parser;
  }, [validator, parser]);

  const loadTexts = useCallback(async () => {
    setTexts(null);
    const xmlJson = await fetchLocaleXML(file);

    if (xmlJson && (!validatorRef.current || validatorRef.current(xmlJson))) {
      setTexts(parserRef.current ? parserRef.current(xmlJson) : xmlJson);
    } else {
      setTexts(null);
    }
  }, [file, fetchLocaleXML]);

  useEffect(() => {
    if (locale == lastLocale) return;
    setLastLocale(locale);
    loadTexts();
  }, [loadTexts, locale, lastLocale]);

  return texts;
}
