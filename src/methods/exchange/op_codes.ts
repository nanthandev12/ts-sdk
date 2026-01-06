export const EXCHANGE_OP_CODES: Record<string, number> = {
  /**---Account Actions---*/
  addAgent: 1201,

  /**---Trading Actions---*/
  placeOrder: 1301,
  cancelByOid: 1302,
  cancelAll: 1311,
  cancelByCloid: 1312,
};
