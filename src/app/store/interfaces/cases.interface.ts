export interface File {
  key: string;
  url: string;
}
export interface Case {
  client: string;
  correlative: number;
  files: File[];
  isFinish: boolean;
  clientName?: string;
}