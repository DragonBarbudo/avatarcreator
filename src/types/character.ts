
export interface CharacterConfig {
  eyes: {
    style: number;
    color: string;
  };
  hair: {
    frontStyle: number;
    backStyle: number;
    color: string;
  };
  brows: {
    style: number;
    color: string;
  };
  nose: {
    style: number;
    color: string;
  };
  mouth: {
    style: number;
    color: string;
  };
  face: {
    style: number;
    color: string;
  };
  shirt: {
    style: number;
    color: string;
  };
}

export interface CharacterPart {
  id: string;
  label: string;
  options: number;
  defaultColor: string;
  hasSubParts?: boolean;
  subParts?: {
    front?: number;
    back?: number;
  };
}

export interface ColorPalette {
  [key: string]: string[];
}

export interface PostMessagePayload {
  type: 'save';
  config: CharacterConfig;
  imageData: string;
}
