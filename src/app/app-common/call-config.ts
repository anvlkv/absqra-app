import { RouteParams } from './api.service';
import { ReFetchQuery } from './data-service/data.service';
import { ApiRoute } from 'api';

export interface CallConfig {
  route: ApiRoute,
  params?: RouteParams,
  query?: RouteParams,
  /**
   * @Deprecated please abandon this idea.
   */
  refetch?: ReFetchQuery[]
}
