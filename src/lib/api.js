
export async function api(url, method = "GET", body = null, token = null) {
    const options = { method, headers: { "Content-Type": "application/json" } };
  
    if (body) options.body = JSON.stringify(body);
    if (token) options.headers["Authorization"] = `Bearer ${token}`;
  
    const res = await fetch(process.env.NEXT_PUBLIC_API + url, options);
    return await res.json();
  }
  