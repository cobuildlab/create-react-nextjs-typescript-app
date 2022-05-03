import { auth0 } from '../../../src/utils/auth';

export default auth0.handleAuth({
  async callback(req, res) {
    try {
      await auth0.handleCallback(req, res, {
        // eslint-disable-next-line
        afterCallback: async (req, res, session, state) => {
          const { idToken, user } = session;
          console.log('handleAuth:', {
            idToken: idToken,
            user: user,
          });
          //   await handleAuthentication(idToken, user);
          return {
            ...session,
          };
        },
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
