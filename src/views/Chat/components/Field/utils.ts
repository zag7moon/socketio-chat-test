/**
 * Check for the length of the entered message (from 0 to 150)
 *
 * @param message Passing message.
 * @returns The result of test if the condition is passed returns true else false.
 */

export const isMessageValid = (message: string) => {
  const msg = message.trim().length;
  if (msg > 0 && msg <= 150) {
    return true;
  }
  return false;
};
