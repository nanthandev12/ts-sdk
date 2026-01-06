export class NonceManager {
  private lastNonce = 0;

  getNonce(): number {
    let nonce = Date.now();
    if (nonce <= this.lastNonce) {
      nonce = ++this.lastNonce;
    } else {
      this.lastNonce = nonce;
    }
    return nonce;
  }
}
