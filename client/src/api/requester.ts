type Query = Record<string, string | number | boolean | undefined>;

type RequestOptions = {
    method?: string;
    headers?: HeadersInit;
    query?: Query;
    body?: any;
};

function buildUrl(urlOrPath: string, query?: Query) {
    let url = urlOrPath;
    if (query) {
        const params = new URLSearchParams();
        Object.entries(query).forEach(([k, v]) => {
            if (v !== undefined) params.append(k, String(v));
        });
        const qs = params.toString();
        if (qs) url += (url.includes('?') ? '&' : '?') + qs;
    }
    return url;
}

async function requester<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', headers = {}, body, query } = options;
    const url = buildUrl(path, query);

    const init: RequestInit = { method, headers: { ...(headers as any) } };

    if (body !== undefined && body !== null) {
        if (body instanceof FormData) {
            init.body = body as any;
        } 
        else if (typeof body === 'object') {
            init.body = JSON.stringify(body);
            (init.headers as any)['Content-Type'] = 'application/json';
        } 
        else {
            init.body = String(body) as any;
        }
    }

    const res = await fetch(url, init);
    const text = await res.text();
    const contentType = res.headers.get('content-type') || '';
    const data = contentType.includes('application/json') && text ? JSON.parse(text) : text;

    if (!res.ok) {
        const err: any = new Error(res.statusText || 'Request failed');
        err.status = res.status;
        err.data = data;
        throw err;
    }

    return data as T;
}

export const get = <T>(path: string, query?: Query) => requester<T>(path, { method: 'GET', query });
export const post = <T>(path: string, body?: any) => requester<T>(path, { method: 'POST', body });
export const put = <T>(path: string, body?: any) => requester<T>(path, { method: 'PUT', body });
export const del = <T>(path: string, body?: any) => requester<T>(path, { method: 'DELETE', body });

export default requester;