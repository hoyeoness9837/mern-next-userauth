import { useRouter } from 'next/router';

export default function Error() {
  const router = useRouter();

  return <div>error</div>;
}
