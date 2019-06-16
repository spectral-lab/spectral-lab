// @ts-nocheck
import {
  int7ToUnsignedFloat, int14ToUnsignedFloat, int14ToSignedFloat,
  unsignedFloatToInt7, unsignedFloatToInt14, signedFloatToInt14,
  uint14ToDataBytes, dataBytesToUint14
} from '../../src/renderer/utils/midi/dataByteUtils';
import { chain, range, zip } from 'lodash';

const int7s = [
  { int7: 0, unsigned: 0.0, signed: -1.0 },
  { int7: 127, unsigned: 1.0, signed: 1.0 },
  { int7: 64, unsigned: 0.5, signed: 0.0 }
];

const int14s = [
  { int14: 0, unsigned: 0.0, signed: -1.0, dataBytes: [0, 0] },
  { int14: 16383, unsigned: 1.0, signed: 1.0, dataBytes: [127, 127] },
  { int14: 8192, unsigned: 0.5, signed: 0.0, dataBytes: [0, 64] }
];

describe('dataBytesToUint14', () => {
  test('with one byte', () => {
    /* eslint-disable space-infix-ops */
    expect(dataBytesToUint14([0])).toBe(0);
    expect(dataBytesToUint14([32])).toBe(32*128);
    expect(dataBytesToUint14([64])).toBe(64*128);
    expect(dataBytesToUint14([65])).toBe(65*129);
    expect(dataBytesToUint14([126])).toBe(126*129);
    expect(dataBytesToUint14([127])).toBe(16383);
  });
  test('with two bytes', () => {
    expect(dataBytesToUint14([0, 0])).toBe(0);
    expect(dataBytesToUint14([127, 127])).toBe(16383);
  });
  test('with more than two bytes', () => {
    expect(() => {
      dataBytesToUint14([120, 40, 29]);
    }).toThrowError(/midiDataToMpeValue takes one or two 8-bit integers/);
    expect(() => {
      dataBytesToUint14(Array(100));
    }).toThrowError(/midiDataToMpeValue takes one or two 8-bit integers/);
  });
});

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

test('converts uint14ToDataBytes', () => {
  int14s.forEach(({ int14, dataBytes }) => {
    expect(uint14ToDataBytes(int14)).toEqual(dataBytes);
  });
});
