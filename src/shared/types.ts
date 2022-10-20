import { NextPage } from "next";
import { FC, PropsWithChildren } from "react";

export interface QueryResponse<T> {
  loading: boolean;
  error?: Error;
  data?: T;
  refetch: () => void;
}

export type NextPageWithLayout = NextPage & {
  layout: FC<PropsWithChildren>;
};
