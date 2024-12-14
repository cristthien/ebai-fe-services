type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

export type CustomError = {
  status: number; // HTTP status code
  message: string; // Error message
  error?: string; // Optional additional error info
};

const handleApiResponse = <Response>(response: any): Response => {
  return response;
};
export const isClient = () => typeof window !== "undefined";
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  options?: CustomOptions
): Promise<Response> => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }

  const baseHeaders: { [key: string]: string } =
    body instanceof FormData ? {} : { "Content-Type": "application/json" };

  const baseUrl =
    options?.baseUrl === undefined
      ? process.env.NEXT_PUBLIC_API_URL
      : options.baseUrl;
  console.log(baseUrl);
  if (isClient()) {
    const sessionToken = localStorage.getItem("access_token");
    if (sessionToken) {
      baseHeaders.Authorization = `Bearer ${sessionToken}`;
    }
  }
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },

    body,
    method,
  });

  const jsonResponse = await res.json();
  if (!res.ok) {
    // Quăng lỗi với mã HTTP và body
    throw {
      status: res.status, // Mã HTTP
      message: jsonResponse?.message || "Unknown error", // Thông điệp lỗi từ body
      error: jsonResponse?.error || undefined, // Optional: thông tin thêm
    } as CustomError;
  }

  return handleApiResponse<Response>(jsonResponse); // Xử lý response ở đây
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  patch<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PATCH", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default http;
