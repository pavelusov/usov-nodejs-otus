export interface INode {
  name: number;
  items?: INode[];
}

export interface IElement {
  depth: number;
  name: number;
}

export interface IFormatterProps extends IElement {
  isLast: boolean;
}
