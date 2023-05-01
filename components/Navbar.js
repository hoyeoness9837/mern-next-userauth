import Link from '../src/Link';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import styles from './layout.module.css';

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5'>
            <Link href='/'>Mern-Next-Auth</Link>
          </Typography>
          <div className={styles.navlinks}>
            {status === 'authenticated' && (
              <>
                <Link href={`/mypage/${session.user.email}/`}>
                  <Avatar>{session.user.email[0]}</Avatar>
                </Link>
                <Button color='white' onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            )}
            {status !== 'authenticated' && (
              <>
                <Link href='/auth/signin'>
                  <Button color='white'>Sign In</Button>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
