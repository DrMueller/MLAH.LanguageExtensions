import { TwoArgFunc } from '../types';

export class ArrayExtensions {
  public static getItemsNotInOtherArray<T>(
    thisArray: T[],
    otherArray: T[],
    callbackFn: TwoArgFunc<T, T, boolean>): T[] {
    const entriesNotInOtherArray = thisArray.filter(entry => !otherArray.some(otherEntry => callbackFn(entry, otherEntry)));
    return entriesNotInOtherArray;
  }

  public static getItemsInOtherArray<T>(
    thisArray: T[],
    otherArray: T[],
    callbackFn: TwoArgFunc<T, T, boolean>): T[] {
    const entriesNotInOtherArray = thisArray.filter(entry => otherArray.some(otherEntry => callbackFn(entry, otherEntry)));
    return entriesNotInOtherArray;
  }
}
