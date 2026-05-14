import { AuthService } from '../services/auth-service'


export const authFetch = (url: string) => {

  return fetch(url, {
    method: 'GET',
    headers: {
      // This mimics the Bearer token standard
      'Authorization': `Bearer ${AuthService.getBearerToken()}`,
      'Content-Type': 'application/json'
    }
  });
}