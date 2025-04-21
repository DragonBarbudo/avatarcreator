
export interface CharacterPart {
  id: string;
  label: string;
  options: number;
}

export interface PartConfig {
  style: number;
  color: string;
}

export interface CharacterConfig {
  face: PartConfig;
  hair: PartConfig;
  eyes: PartConfig;
  mouth: PartConfig;
  shirt: PartConfig;
}

export interface PostMessagePayload {
  type: string;
  config: CharacterConfig;
  imageData?: string;
}
