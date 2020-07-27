const { SNOWPACK_PUBLIC_MONICA_API_TOKEN, SNOWPACK_PUBLIC_MONICA_API_URL } = import.meta.env;

export async function client<T>(url: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch('/api' + url, {
      ...options,
      headers: { 'Authorization': 'Bearer ' + SNOWPACK_PUBLIC_MONICA_API_TOKEN }
    });
    if (!res.ok) {
      throw res;
    }
    const json = await res.json();
    return json.data ?? json;
}
