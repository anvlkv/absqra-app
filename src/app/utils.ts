export function unpackEnum(en: {}) {
  return [...Object.keys(en)].map(k => en[k]);
};
