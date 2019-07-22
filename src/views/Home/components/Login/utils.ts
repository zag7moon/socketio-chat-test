/**
 * Check for the length of the entered login (from 0 to 15)
 *
 * @param username Passing username.
 * @returns The result of test if the condition is passed returns true else false.
 */

export const isUserNameValid = (username: string) => {
  const login = username.trim().length;
  if (login > 0 && login <= 15) {
    return true;
  }
  return false;
};
