import { useMutation } from "convex/react";
import type {
  FunctionArgs,
  FunctionReference,
  FunctionReturnType,
} from "convex/server";
import { useCallback, useReducer } from "react";

type Status = "idle" | "loading" | "success" | "error";

interface MutationState<TData, TError = Error> {
  status: Status;
  data: TData | undefined;
  error: TError | undefined;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

type MutationAction<TData, TError> =
  | { type: "LOADING" }
  | { type: "SUCCESS"; data: TData }
  | { type: "ERROR"; error: TError }
  | { type: "RESET" };

const IDLE_STATE = {
  status: "idle",
  data: undefined,
  error: undefined,
  isIdle: true,
  isLoading: false,
  isSuccess: false,
  isError: false,
} satisfies MutationState<unknown>;

function reducer<TData, TError>(
  _: MutationState<TData, TError>,
  action: MutationAction<TData, TError>,
): MutationState<TData, TError> {
  switch (action.type) {
    case "LOADING":
      return {
        status: "loading",
        data: undefined,
        error: undefined,
        isIdle: false,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case "SUCCESS":
      return {
        status: "success",
        data: action.data,
        error: undefined,
        isIdle: false,
        isLoading: false,
        isSuccess: true,
        isError: false,
      };
    case "ERROR":
      return {
        status: "error",
        data: undefined,
        error: action.error,
        isIdle: false,
        isLoading: false,
        isSuccess: false,
        isError: true,
      };
    case "RESET":
      return IDLE_STATE as MutationState<TData, TError>;
  }
}

export function useMutationEx<TMutation extends FunctionReference<"mutation">>(
  mutation: TMutation,
): [
  (args: FunctionArgs<TMutation>) => Promise<FunctionReturnType<TMutation>>,
  MutationState<FunctionReturnType<TMutation>> & { reset: () => void },
] {
  type TData = FunctionReturnType<TMutation>;
  type TVariables = FunctionArgs<TMutation>;

  const convexMutate = useMutation(mutation);
  const [state, dispatch] = useReducer(
    reducer<TData, Error>,
    IDLE_STATE as MutationState<TData>,
  );

  const mutate = useCallback(
    async (variables: TVariables) => {
      dispatch({ type: "LOADING" });
      try {
        const data = await convexMutate(variables);
        dispatch({ type: "SUCCESS", data });
        return data;
      } catch (err) {
        dispatch({
          type: "ERROR",
          error: err instanceof Error ? err : new Error(String(err)),
        });
        throw err;
      }
    },
    [convexMutate],
  );

  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  return [mutate, { ...state, reset }];
}
