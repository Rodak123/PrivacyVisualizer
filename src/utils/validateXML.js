const isType = (val, type) => {
  return val !== undefined && typeof val === type;
};

const areStrings = (strings) => {
  for (let i = 0; i < strings.length; i++) {
    const str = strings[i];
    if (!isType(str, 'string')) {
      return false;
    }
  }
  return true;
};

export const validateTextsXML = (xmlJson) => {
  const texts = xmlJson?.texts;

  if (!isType(texts, 'object'))
    return false;

  const {
    title = undefined,
    about = undefined,
    referenceLink = undefined,
    close = undefined,
    definition = undefined,
    benefits = undefined,
    consequences = undefined,
    searchTerms = undefined,
    sourceCode = undefined,
    learnMore = undefined,
    changeImportance = undefined
  } = texts;

  const strings = [title, about, referenceLink, close, definition, benefits, consequences, searchTerms, sourceCode, learnMore, changeImportance];
  if (!areStrings(strings))
    return false;

  return true;
};

export const validateCategoryXML = (xmlJson) => {
  const category = xmlJson?.category;

  if (!isType(category, 'object'))
    return false;

  const {
    name = undefined,
    definition = undefined,
    benefits = undefined,
    consequences = undefined,
    searchTerms = undefined,
    location = undefined,
  } = category;

  const strings = [name, definition, benefits, consequences];
  if (!areStrings(strings))
    return false;

  if (!validateLocationXML(location))
    return false;

  if (!validateSearchTermsXML(searchTerms))
    return false;

  return true;
};

const validateLocationXML = (location) => {
  if (location === undefined) return true;

  const {
    coarseLocation = undefined,
    preciseLocation = undefined,
    decimals = undefined,
  } = location;

  const strings = [coarseLocation, preciseLocation];
  if (!areStrings(strings))
    return false;

  if (!isType(decimals, 'object'))
    return false;

  const decimal = decimals?.decimal;
  if (!isType(decimal, 'object') || !Array.isArray(decimal) || decimal.length !== 7)
    return false;

  return true;
};

const validateSearchTermsXML = (searchTerms) => {
  const term = searchTerms?.term;
  return isType(term, 'string') || Array.isArray(term);
};