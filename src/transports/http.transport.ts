import { TransportsTypes as TT } from '../types';

import { ENDPOINTS_URLS, mergeRequestInit } from '../utils';

export class HttpTransport {
  public isTestnet: boolean;

  private timeout: number | null;

  private server: {
    mainnet: { api: string | URL; rpc: string | URL };
    testnet: { api: string | URL; rpc: string | URL };
  };

  private fetchOptions: Omit<RequestInit, 'body' | 'method'>;

  private onRequest?: (request: Request) => TT.IMaybePromise<Request | void | null | undefined>;

  private onResponse?: (response: Response) => TT.IMaybePromise<Response | void | null | undefined>;

  constructor(options?: TT.IHttpTransportOptions) {
    this.isTestnet = options?.isTestnet ?? false;

    // Explicitly check if timeout is provided to distinguish null (no timeout) from undefined (use default)
    this.timeout = options && 'timeout' in options ? options.timeout : 3_000;

    this.server = {
      mainnet: {
        api: options?.server?.mainnet?.api ?? ENDPOINTS_URLS.mainnet.api,
        rpc: options?.server?.mainnet?.rpc ?? ENDPOINTS_URLS.mainnet.rpc,
      },
      testnet: {
        api: options?.server?.testnet?.api ?? ENDPOINTS_URLS.testnet.api,
        rpc: options?.server?.testnet?.rpc ?? ENDPOINTS_URLS.testnet.rpc,
      },
    };

    this.fetchOptions = options?.fetchOptions ?? {};

    this.onRequest = options?.onRequest;

    this.onResponse = options?.onResponse;
  }

  async request<T>(
    endpoint: 'info' | 'exchange' | 'explorer',
    payload: unknown,
    signal?: AbortSignal,
    method: 'GET' | 'POST' = 'POST',
  ): Promise<T> {
    try {
      const url = new URL(
        endpoint,
        this.server[this.isTestnet ? 'testnet' : 'mainnet'][
          endpoint === 'explorer' ? 'rpc' : 'api'
        ],
      );

      const init = mergeRequestInit(
        {
          body: method === 'POST' ? JSON.stringify(payload) : undefined,
          headers: {
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Content-Type': 'application/json',
          },
          keepalive: true,
          method: method,
          signal: this.timeout ? AbortSignal.timeout(this.timeout) : undefined,
        },
        this.fetchOptions,
        { signal },
      );

      let request = new Request(url, init);

      if (this.onRequest) {
        const customRequest = await this.onRequest(request);
        if (customRequest instanceof Request) request = customRequest;
      }

      let response = await fetch(request);

      if (this.onResponse) {
        const customResponse = await this.onResponse(response);
        if (customResponse instanceof Response) response = customResponse;
      }

      if (!response.ok || !response.headers.get('Content-Type')?.includes('application/json')) {
        const body = await response.text().catch((): string | undefined => undefined);
        throw new Error(body);
      }

      const body = await response.json();

      if (body?.type === 'error') {
        throw new Error(body?.message);
      }

      return body;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error(error as string);
    }
  }
}
