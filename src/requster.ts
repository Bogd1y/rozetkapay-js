export type ApiResponse<TSuccess, TError> = {
  raw: Response;
  data: TSuccess;
  success: true;
} | {
  raw: Response;
  data: TError;
  success: false;
}

export type MakeRequestPayload = {
  url: string,
  headers: Record<string, string>
} & ({ method: 'GET'; body?: never } | { method: 'DELETE'; body?: string } | { method: Exclude<'POST' | 'PUT' | 'PATCH' | 'DELETE', 'GET'>; body: string });

export async function makeRequest<TSuccess, TError>({ headers = {}, method = 'POST', body, url }: MakeRequestPayload): Promise<ApiResponse<TSuccess, TError>> {

  const options: RequestInit = {
    headers,
    method,
  };

  if (body && method !== 'GET') {
    options.body = body;
  }
  
  const res = await fetch(url, options);
  
  if (!res.ok) {
    const contentType = res.headers.get('content-type');

    if (!res.body) {
      throw new Error('Failed with status' + res.status)
    }
    if (!contentType?.includes('application/json')) {
      throw new Error('Failed with status ' + res.status + ' ' + await res.text())
    }

    const errorData: TError = await res.json(); // Enforce TError type here
    return {
      raw: res,
      data: errorData,
      success: false,
    };
  } else {
    return {
      raw: res,
      data: await res.json(),
      success: true,
    };
  }
}