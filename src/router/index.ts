import page from 'page';
import Router from './Router.svelte';
import Route from './Route.svelte';
import NotFound from './NotFound.svelte';
import { activeRoute } from './store';

const redirect = (path: string) => page.redirect(path);
const push = (path: string) => page.show(path);

const active = (node: HTMLAnchorElement) => {
  const destroy = activeRoute.subscribe(({ path }) =>
    node.classList.toggle("active", node.getAttribute("href") === path)
  )

  return { destroy }
}

export { Router, Route, NotFound, redirect, push, active };