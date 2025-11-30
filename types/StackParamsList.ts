import Movie from "./Movie";

export type StackParamsList = {
  Main: undefined;
  Details: { movie: Movie };
  All: { title: string; type: string };
  Settings: undefined;
};
