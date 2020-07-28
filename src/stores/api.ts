const { SNOWPACK_PUBLIC_MONICA_API_TOKEN } = import.meta.env;

type ApiResponse<T> = {
  data: T;
  meta?: {
    last_page: number;
  }
  error?: { message: string; error_code: number; }
}
export class MonicaClient<TModel extends TUpdateModel & { id: number }, TUpdateModel> {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async request<T>(path?: string, options: RequestInit & { limit?: number, query?: Record<string, string> } = {}) {
    let fullPath = `/api/${this.url}`;
    if (path) {
      fullPath += `/${path}`;
    }
    fullPath += `?limit=${options.limit ?? 15}`
    if (options.query) {
      const query = Object.entries(options.query).map(([key, val]) => `${key}=${val}`).join('&');
      fullPath += '&' + query;
    }
    const res = await fetch(fullPath, {
      ...options,
      headers: { 'Authorization': 'Bearer ' + SNOWPACK_PUBLIC_MONICA_API_TOKEN, 'Redirect': 'follow' }
    });

    const json: ApiResponse<T> = await res.json();

    if (!res.ok) {
      throw json.error.message;
    }

    return { data: json.data, last: json.meta?.last_page };
  }

  async getAll() {
    const res = await this.request<TModel[]>();
    const promises: Promise<TModel[]>[] = [];
    if (res.last > 1) {
      for (let page = 2; page <= res.last; page++) {
        promises.push(this.request<TModel[]>('', { query: { page: page.toString() } }).then(r => r.data));
      }
      const all = await Promise.all(promises);
      return [...res.data, ...all.flat(1)];
    } else {
      return res.data;
    }
  }

  async getSingle(id: number) {
    const { data } = await this.request<TModel>(id.toString());
    return data;
  }

  async create(entry: TUpdateModel) {
    const formdata = new FormData();
    Object.entries(entry).forEach(([key, val]) => formdata.append(key, val.toString()));
    const { data } = await this.request<TModel>('', { method: 'POST', body: formdata })
    return data;
  }

  async delete(id: number) {
    const { data } = await this.request<TModel>(id.toString(), { method: 'DELETE' });
    return data;
  }

  async edit(entry: TUpdateModel & { id: number }) {
    const { id } = entry;
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const body = new URLSearchParams();
    Object.entries(entry).forEach(([key, val]) => body.append(key, val.toString()));
    const requestOptions = {
      method: 'PUT',
      headers,
      body,
    };
    const { data } = await this.request<TModel>(id.toString(), requestOptions)
    return data;
  }
}
