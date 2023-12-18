import { observable } from "@trpc/server/observable";
import { publicProcedure, router } from "../trpc";
import EventEmitter from "events";

const ee = new EventEmitter();
export const webSockets = router({
  wsSubscription: publicProcedure.subscription(({}) => {
    return observable<string>((emit) => {
      const testFuntion = () => {
        emit.next('mutate successfully')
      };

      ee.on('test', testFuntion)

      return () => ee.off('test', testFuntion)
    })
  }),
  tesMutation: publicProcedure.mutation(({}) => {
    ee.emit('test')
  })
});
