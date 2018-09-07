import { RouteParams } from '../app/app-common/api-service/api.service';
import { ApiRoute } from 'api';

export interface CallConfig {
  route: ApiRoute,
  params?: RouteParams,
  query?: RouteParams
}
