
export interface CharacterConfig {
  hair: {
    style: number;
    color: string;
  };
  face: {
    style: number;
    color: string;
  };
  eyes: {
    style: number;
    color: string;
  };
  mouth: {
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
}

export interface ColorPalette {
  [key: string]: string[];
}

export interface PostMessagePayload {
  type: 'save';
  config: CharacterConfig;
  imageData: string;
}
