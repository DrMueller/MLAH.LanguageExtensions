import { IMaybe } from '..';
import { GenericAction, Action } from '../../types/callbacks';

export class Some<T> implements IMaybe<T> {
  public constructor(private value: T) {
  }

  public evaluate(whenSome?: GenericAction<T>, _?: Action) {
    if (whenSome) {
      whenSome(this.value);
    }
  }

  public get isSome(): boolean {
    return true;
  }
}
