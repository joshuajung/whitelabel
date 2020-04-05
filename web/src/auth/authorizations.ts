import { Audience } from "./Audience";

const authorizations: Array<{ route: string; allowedAudiences: Audience[] }> = [
  { route: "/counters/[id]", allowedAudiences: [Audience.SignedIn] },
  { route: "/counters", allowedAudiences: [Audience.SignedIn] },
];

export default authorizations;
