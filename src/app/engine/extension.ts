export const minString = (str: string, len: number) => {
  const strLen = str.length || 0;
  const resStr = str.slice(0, len) + '...' + str.slice(strLen - 5, strLen);
  return resStr;
};

export const getDefaultImg = () => {
  return  '/assets/images/default-image.pngs';
}
