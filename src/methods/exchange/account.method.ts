import { Address } from 'viem';

/**---Add Agent Method---*/
export interface IAddAgentMethodParams {
  agentName: string;
  agent: Address;
  forAccount: string;
  signature?: string;
  validUntil: number;
  nonce?: number;
  agentPrivateKey?: string;
  signer?: string;
}
