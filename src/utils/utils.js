export const ClipboardText = async (value, message) => {
  await navigator.clipboard.writeText(value);
  message;
};
