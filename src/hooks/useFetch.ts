import { useEffect, useState } from 'react'

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  useEffect(() => {
    fetch(url, { credentials: 'include' })
      .then(res => res.json())
      .then(json => setData(json as T))
  }, [url])
  return { data }
}
