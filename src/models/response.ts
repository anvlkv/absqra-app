export class ResponseBody {
  source?: string;
  response: string | number | boolean;

  constructor(body: ResponseBody) {
    try {
      Object.keys(body).forEach(p => {
        this[p] = body[p];
      });
    } catch (e) {
      console.error(body);
    }

  }
}
