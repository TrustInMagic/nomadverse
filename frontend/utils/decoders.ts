const urlDecoder = (url: string) => {
  const decoded = url.replace(/&#x2F;/g, '/');
  return decoded;
};

const specialCharDecoder = (text: string) => {
  const decoded = text.replace(/&#x27;/g, "'").replace(/&gt;/, '>');
  return decoded;
};

export { urlDecoder, specialCharDecoder };
