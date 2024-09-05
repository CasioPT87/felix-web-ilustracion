import { Section } from "../types";

export type JumpRules = Record<Section, JumpRulesSubject>;

export type JumpRulesSubject = Array<{
  imageIndex: number;
  belongsToColumn: number;
}>;

const jumpRules: JumpRules = {
  tecnologia: [
    { imageIndex: 1, belongsToColumn: 2 },
    { imageIndex: 8, belongsToColumn: 0 },
    { imageIndex: 12, belongsToColumn: 1 },
  ],
  informatica: [
    { imageIndex: 0, belongsToColumn: 2 }],
  biologia: [
    { imageIndex: 0, belongsToColumn: 1 },
    { imageIndex: 3, belongsToColumn: 1 },
    { imageIndex: 4, belongsToColumn: 2 }
  ],
  fisicayquimica: [],
  geografiaehistoria: [],
  geologia: [],
  otros: [],
  portada: [],
};

export default jumpRules;
