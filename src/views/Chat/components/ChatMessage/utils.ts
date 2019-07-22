/**
 * Checks the number of users (1 or more).
 *
 * @param amount number of users.
 * @returns The result of test returns a string indicating members in the chat.
 */

export const getAmountUsers = (amount: number) => {
  if (amount === 1) {
    return 'In this chat one member.';
  }
  return `This chat has ${amount} members`;
};
