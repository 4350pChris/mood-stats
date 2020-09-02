import { writable, derived } from "svelte/store";

export interface Route {
  path: string
  component: any
  middleware: PageJS.Callback[]
  params?: PageJS.Context["params"]
}

export interface RegisteredRoutes {
  [path: string]: Route
}

const { subscribe, update } = writable<RegisteredRoutes>({});

export const routes = {
  subscribe,
  register(route: Route) {
    update(r => {
      r[route.path] = route;
      return r;
    });
  }
};

// default must be an empty object otherwise we will get a null reference
export const activeRoute = writable<Route>({} as Route);