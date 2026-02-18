export class NonceManager {
  private lastNonce = 0;

  getNonce(): number {
    let nonce = Date.now();
    
    // Add small randomness (0-999ms) to avoid PM2 worker collisions
    nonce += Math.floor(Math.random() * 1000);
    
    if (nonce <= this.lastNonce) {
      nonce = ++this.lastNonce;
    } else {
      this.lastNonce = nonce;
    }
    return nonce;
  }
}