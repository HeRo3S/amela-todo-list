import Home from "../pages/Home";

interface RouteProperty {
  path: string;
  component: () => JSX.Element;
}

const routes: RouteProperty[] = [{ path: `/`, component: Home }];

export default routes;
