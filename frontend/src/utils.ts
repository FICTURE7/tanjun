export function validateRequired(value: string, setErrorValue: (value: string) => void) {
  if (!value) {
    setErrorValue('Required');
    return false;
  }

  setErrorValue('');
  return true;
}

export function formatTitle(title: string) {
  return `tanjun • ${title}`;
}
