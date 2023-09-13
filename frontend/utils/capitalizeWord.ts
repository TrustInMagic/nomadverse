export default function capitalizeWord(word: string): string {
  if (word && typeof word === 'string') {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  } else {
    return '';
  }
}
