declare module 'bootpay-js' {
  import BootPay from 'bootpay-js';

  type ObjectType = (e: Record<string, unknown>) => any;

  interface BootPayType extends BootPay {
    request: (
      e: Record<string, unknown>,
    ) => {
      error: (e: ObjectType) => { cancel: (e: ObjectType) => { done: (e: ObjectType) => any } };
    };
  }

  const src: BootPayType;
  export default src;
}
