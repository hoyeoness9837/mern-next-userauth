import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Error() {
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, [third]);

  const router = useRouter();

  return <div>error</div>;
}
