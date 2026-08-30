export function normalizeGlossarySearchText(value) {
  return value.normalize("NFKC").toLocaleLowerCase().replace(/[.。．\s]+/g, "");
}

export function matchesGlossarySearch(entry, query) {
  const normalizedQuery = normalizeGlossarySearchText(query);
  if (!normalizedQuery) return false;
  return [entry.name, entry.english, entry.abbreviation]
    .map(normalizeGlossarySearchText)
    .some((value) => value.includes(normalizedQuery));
}
