import { IKeyValuePair } from '../types';

export class EnumExtensions {
  public static splitEnum(enumType: any): IKeyValuePair<number, string>[] {
    const parsedEnumKeys = Object.keys(enumType).map(f => {
      return parseInt(f, 10);
    });

    const numericEnumKeys = parsedEnumKeys.filter(f => {
      return f.toString() !== 'NaN';
    });

    const result = numericEnumKeys.map(key => {
      const enumValue = enumType[key];
      return <IKeyValuePair<number, string>>{
        key: key,
        value: enumValue
      };
    });

    return result;
  }
}
