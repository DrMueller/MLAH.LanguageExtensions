import { IMaybe } from '..';

import { GenericAction, Action } from '../../types/callbacks';

export class None<T> implements IMaybe<T> {
  public evaluate(_?: GenericAction<T>, whenNone?: Action) {
    if (whenNone) {
      whenNone();
    }
  }

  public get isSome(): boolean {
    return false;
  }
}
