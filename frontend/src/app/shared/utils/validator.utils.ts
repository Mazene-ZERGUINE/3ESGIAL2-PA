export function minLengthValidator(control: any): null | { minLength: true } {
  const value = String(control.value).trim() || '';
  if (value.length > 0) {
    return null;
  }

  return { minLength: true };
}
