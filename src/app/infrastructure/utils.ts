import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function htmlToText(html: string): string {
  const element = document.createElement('div');
  element.innerHTML = html;

  const textContent = element.textContent;
  const innerText = element.innerText;

  return textContent ?? innerText ?? '';
}

export function symbolsToText(text: string): string {
  const specials: Record<string, string> = {
    '“': '"',
    '”': '"',
    '’': "'",
    '‘': "'",
    ',': ',',
    '—': '-',
    '…': '...',
    '«': '<<',
    '»': '>>',
    '–': '-',
    ' ': ' ',
    ' ': ' ',
    ' ': ' ',
  };

  return text.replace(
    /[“”’‘—,…«»–\u2007\u202F\u00A0]/g,
    (char) => specials[char] || '',
  );
}
