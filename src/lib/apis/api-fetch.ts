type ApiEnvName = "API" | "API_URL" | "CV_API_URL";

type ApiFetchOptions = RequestInit & {
  context: string;
  envName?: ApiEnvName;
};

function getApiBaseUrl(envName: ApiEnvName, context: string) {
  const baseUrl = process.env[envName];

  if (!baseUrl) {
    throw new Error(`[${context}] Missing ${envName} environment variable.`);
  }

  return baseUrl.replace(/\/+$/, "");
}

async function readErrorBody(response: Response) {
  try {
    const body = await response.text();
    return body.slice(0, 500);
  } catch {
    return "";
  }
}

export async function apiFetchJson<T>(
  path: string,
  { context, envName = "API", ...init }: ApiFetchOptions
): Promise<T> {
  const baseUrl = getApiBaseUrl(envName, context);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const method = init.method ?? "GET";
  const response = await fetch(`${baseUrl}${normalizedPath}`, init);

  if (!response.ok) {
    const body = await readErrorBody(response);

    console.error(`[${context}] API request failed`, {
      method,
      path: normalizedPath,
      status: response.status,
      statusText: response.statusText,
      body,
    });

    throw new Error(
      `[${context}] API request failed with ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}
