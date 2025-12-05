import axios from 'axios';
import type { RequestParameters, Variables } from 'relay-runtime';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { getCookie } from 'typescript-cookie';

const API_URL = import.meta.env.VITE_GRAPHQL_URL || 'https://api-minesweeper.paraplu.app/';

axios.defaults.withCredentials = true;

const csrfCookieName = 'csrftoken';

async function fetchGraphQL(params: RequestParameters, variables: Variables) {
  const queryText = params.text;

  if (!queryText) {
    throw new Error('No query text provided to fetchGraphQL');
  }

  const response = await axios.post(
    `${API_URL}graphql/`,
    {
      query: queryText,
      variables,
    },
    {
      headers: {
        'X-CSRFToken': (await ensureCSRFToken()) || '',
      },
    }
  );

  return response.data;
}

function getCSRFTokenFromCookie(): string | null {
  return getCookie(csrfCookieName) ?? null;
}

async function ensureCSRFToken(): Promise<string | null> {
  const token = getCSRFTokenFromCookie();
  if (!token) {
    try {
      // Make a HEAD request to Django to set the CSRF cookie
      await axios.get(`${API_URL}csrf_token/`, {});
    } catch (error) {
      console.warn('Failed to ensure CSRF token:', error);
      // Continue without CSRF token
    }
    return getCSRFTokenFromCookie();
  } else {
    return token;
  }
}

const network = Network.create(fetchGraphQL);
const store = new Store(new RecordSource());

export const environment = new Environment({
  network,
  store,
});
