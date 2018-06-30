import { ApiRoute, RouteParams } from './api.service';
import { ReFetchQuery } from './data.service';

export interface CallConfig {
  route: ApiRoute,
  params?: RouteParams,
  query?: RouteParams,
  /**
   * @Deprecated please abandon this idea.
   */
  refetch?: ReFetchQuery[]
}
