export interface IWalkerOptions {
  depth: number;
  maxDepth: number;
  depthArg: string;
  searchPath: string;
  queue: IElement[]
}

export interface IElement {
  depth: number;
  name: string;
}

export interface IFormatterProps extends IElement {
  isLast: boolean;
}
