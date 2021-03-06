import { IMaybe } from '.';
import { None, Some } from './implementation';

export class Maybe {
  public static createNone<T>(): IMaybe<T> {
    return new None<T>();
  }

  public static createSome<T>(value: T): IMaybe<T> {
    return new Some<T>(value);
  }

  public static createFromValue<T>(value: T): IMaybe<T> {
    if (!value) {
      return new None<T>();
    }

    return new Some<T>(value);
  }
}
