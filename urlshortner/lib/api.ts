export type UrlRecord = {
  _id: string;
  originalUrl: string;
  shortCode: string;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set. Add it to .env.local or your deployment env.");
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || "Request failed");
  }

  return payload as T;
}

export async function fetchUrls() {
  return request<{ data: UrlRecord[] }>("/urls");
}

export async function createUrl(originalUrl: string, expiresAt: string | null) {
  return request<{ data: UrlRecord }>("/create_url", {
    method: "POST",
    body: JSON.stringify({ originalUrl, expiresAt }),
  });
}

export async function deleteUrl(id: string) {
  return request<{ message: string }>(`/urls/${id}`, {
    method: "DELETE",
  });
}
