// GitHub language colors based on linguist repository
// https://github.com/github/linguist/blob/master/lib/linguist/languages.yml

export const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  'C#': '#239120',
  C: '#555555',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#fa7343',
  Kotlin: '#A97BFF',
  Scala: '#c22d40',
  R: '#198CE7',
  MATLAB: '#e16737',
  Perl: '#0298c3',
  Shell: '#89e051',
  PowerShell: '#012456',
  HTML: '#e34c26',
  CSS: '#1572B6',
  SCSS: '#c6538c',
  Less: '#1d365d',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  'Objective-C': '#438eff',
  'Objective-C++': '#6866fb',
  Dart: '#00B4AB',
  Haskell: '#5e5086',
  Erlang: '#B83998',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  'F#': '#b845fc',
  OCaml: '#3be133',
  Assembly: '#6E4C13',
  Fortran: '#4d41b1',
  COBOL: '#002080',
  JSON: '#292929',
  YAML: '#cb171e',
  XML: '#0060ac',
  SQL: '#e38c00',
  Groovy: '#e69f56',
  Lua: '#000080',
  Vim: '#199f4b',
  Dockerfile: '#384d54',
  Makefile: '#427819',
  CMake: '#DA3434',
  default: '#586069'
};

export const getLanguageColor = (language: string | null | undefined): string => {
  if (!language) return languageColors.default;

  if (languageColors[language]) {
    return languageColors[language];
  }

  const lowerLanguage = language.toLowerCase();
  const matchedKey = Object.keys(languageColors).find(
    key => key.toLowerCase() === lowerLanguage
  );

  if (matchedKey) {
    return languageColors[matchedKey];
  }

  return languageColors.default;
};
