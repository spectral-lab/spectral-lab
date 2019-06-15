// @ts-nocheck
import {
  int7ToUnsignedFloat, int14ToUnsignedFloat, int14ToSignedFloat,
  unsignedFloatToInt7, unsignedFloatToInt14, signedFloatToInt14
} from '../src/renderer/utils/midi/dataByteUtils';
import { chain, range, zip } from 'lodash';

const int7s = [
  { int7: 0, unsigned: 0.0, signed: -1.0 },
  { int7: 127, unsigned: 1.0, signed: 1.0 },
  { int7: 64, unsigned: 0.5, signed: 0.0 }
];

const int14s = [
  { int14: 0, unsigned: 0.0, signed: -1.0 },
  { int14: 16383, unsigned: 1.0, signed: 1.0 },
  { int14: 8192, unsigned: 0.5, signed: 0.0 }
];

test('int7ToUnsignedFloat', () => {
  int7s.forEach(({ int7, unsigned }) => {
    expect(int7ToUnsignedFloat(int7)).toEqual(unsigned);
  });

  chain(range(128))
    .map(int7ToUnsignedFloat)
    .thru(vs => zip(vs.slice(0, -1), vs.slice(1)))
    .map(([a, b]) => b - a)
    .thru(ds => Array.from(new Set(ds)))
    .value()
    .every(v => expect(v).toBeCloseTo(0.0078));
});
test('int14ToUnsignedFloat', () => {
  int14s.forEach(({ int14, unsigned }) => {
    expect(int14ToUnsignedFloat(int14)).toEqual(unsigned);
  });

  chain(range(16384))
    .map(int14ToUnsignedFloat)
    .thru(vs => zip(vs.slice(0, -1), vs.slice(1)))
    .map(([a, b]) => b - a)
    .thru(ds => Array.from(new Set(ds)))
    .value()
    .every(v => expect(v).toBeCloseTo(0.000061));
});
test('int14ToSignedFloat', () => {
  int14s.forEach(({ int14, signed }) => {
    expect(int14ToSignedFloat(int14)).toEqual(signed);

    chain(range(16384))
      .map(int14ToSignedFloat)
      .thru(vs => zip(vs.slice(0, -1), vs.slice(1)))
      .map(([a, b]) => b - a)
      .thru(ds => Array.from(new Set(ds)))
      .value()
      .every(v => expect(v).toBeCloseTo(0.00012, 0.00001));
  });
});
test('unsignedFloatToInt7', () => {
  int7s.forEach(({ int7, unsigned }) => {
    expect(unsignedFloatToInt7(unsigned)).toEqual(int7);
  });
});
test('unsignedFloatToInt14', () => {
  int14s.forEach(({ int14, unsigned }) => {
    expect(unsignedFloatToInt14(unsigned)).toEqual(int14);
  });
});
test('signedFloatToInt14', () => {
  int14s.forEach(({ int14, signed }) => {
    expect(signedFloatToInt14(signed)).toEqual(int14);
  });
});
