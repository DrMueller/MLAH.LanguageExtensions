import { GenericAction } from '../types';

export interface ISubscribableEvent<TEventArgs> {
  subscribe(callback: GenericAction<TEventArgs>): void;
  unsubscribe(callback: GenericAction<TEventArgs>): void;
}
