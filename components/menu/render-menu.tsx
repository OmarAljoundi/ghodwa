import Navigation from "./navigation";
import { GetHomePageConfiguration } from "../lib/home.query";

export default function RenderMenu() {
  return <Navigation dataPromise={GetHomePageConfiguration()} />;
}
