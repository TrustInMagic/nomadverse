const urlDecoder = (url: string) => {
  const decoded = url.replace(/&#x2F;/g, '/');
  return decoded;
};

export default urlDecoder;
