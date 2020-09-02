import page from 'page';
import Router from './Router.svelte';
import Route from './Route.svelte';
import NotFound from './NotFound.svelte';

const redirect = (path: string) => page.redirect(path);
const push = (path: string) => page.show(path);

export { Router, Route, NotFound, redirect, push };