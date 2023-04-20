export interface UnspentOutput {
  status: {
    block_hash: string;
    block_height: number;
    block_time: number;
    confirmed: boolean;
  };
  txid: string;
  value: number;
  vout: number;
}

export interface OrdinalInscription {
  inscriptionNumber: string;
  metadata: {
    address: string;
    content: string;
    'content length': string;
    'content type': string;
    'genesis fee': string;
    'genesis height': string;
    'genesis transaction': string;
    id: string;
    location: string;
    offset: string;
    output: string;
    'output value': string;
    preview: string;
    timestamp: string;
  };
}
