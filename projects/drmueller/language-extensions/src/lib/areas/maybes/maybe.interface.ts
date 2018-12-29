import { GenericAction, Action } from '../types/callbacks';

export interface IMaybe<T> {
  evaluate(whenSome?: GenericAction<T>, whenNone?: Action): void;
}
