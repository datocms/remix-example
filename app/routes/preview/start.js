import { redirect } from 'remix';
import { getSession, commitSession } from '~/sessions';

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  session.set('preview', 'yes');

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};
