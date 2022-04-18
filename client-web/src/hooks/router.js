import { useLocation } from 'react-router-dom';

export function useQuery({ paramName }) {
  const searchParams = new URLSearchParams(useLocation().search);

  return searchParams.get(paramName);
}
