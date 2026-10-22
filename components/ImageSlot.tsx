import { Ph } from './Ph';

// Grey box standing in for an image. `label` says what goes there; the alt text slot is the
// same label until real imagery (and real alt text) arrives.
export function ImageSlot({ label, ratio = 'aspect-[16/9]' }: { label: string; ratio?: string }) {
  return (
    <figure className={`img-slot ${ratio}`} role="img" aria-label={`Image placeholder: ${label}`}>
      <Ph label={label} />
    </figure>
  );
}
