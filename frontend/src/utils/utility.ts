export const limitText = (text: string, limit: number) => {
  return text.length > limit ? `${text.substring(0, limit)}...` : text
};