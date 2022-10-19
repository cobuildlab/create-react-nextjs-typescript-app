import { getSession } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  token?: string | undefined,
  error?: { message: string }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = getSession(req, res);

  res.status(200).json({ token: session?.idToken });
  
}
