import { GenericAction, Action } from '../types/callbacks';

export interface IMaybe<T> {
  isSome: boolean;
  evaluate(whenSome?: GenericAction<T>, whenNone?: Action): void;
}
