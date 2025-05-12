# How to add a language

1. Copy `en-us` (or any other language) and rename it to the language (like `cs-cz`)
2. Translate the texts in all the .xml files
3. Change `languages.json` like so:
```json
{
  "languages": [
     ...any previous languages
    "en-us", <- this comma has to be here
    "your-language" <- no comma at the end
  ]
}
```
4. Pull a request so that the changes can get applied
