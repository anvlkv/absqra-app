import { RouteParams } from '../app/app-common/api-service/api.service';


export interface ApiRoute {
  path: string,
  params: string[],
  typeName: string
}

export interface RequestParams {
  route: ApiRoute;
  params?: RouteParams;
  query?: RouteParams;
}
