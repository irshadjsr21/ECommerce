export default function() {
  const elem = document.querySelector('meta[name="csrf-token"]');
  if (!elem) {
    console.error('CSRF token not found.');
    return '';
  }
  return elem.getAttribute('content');
}
