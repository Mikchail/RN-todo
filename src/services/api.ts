import Firebase from '@react-native-firebase/app';
import {ITodoItem} from '../types/index.d';
const API_KEY = Firebase.app().options.apiKey;
class ApiService {
  private url: string;
  constructor(baseUrl: string) {
    this.url = baseUrl;
  }

  post(post: ITodoItem) {
    try {
      const request = new Request(this.url + '/todos.json', {
        method: 'post',
        body: JSON.stringify(post),
      });
      return useRequest(request);
    } catch (err) {
      console.error(err);
    }
  }

  deleteTodo(userId: string, todoId: string, token: string) {
    try {
      const request = new Request(
        `${this.url}/todos/${userId}/${todoId}.json?auth=${token}`,
        {
          method: 'DELETE',
        },
      );
      return useRequest(request);
    } catch (err) {
      console.log(err);
    }
  }

  get(userId: string) {
    try {
      const request = new Request(`${this.url}/todos/${userId}.json`, {
        method: 'get',
      });
      return useRequest(request);
    } catch (err) {
      console.log(err);
    }
  }
  createProduct(newTodo: Omit<ITodoItem, 'id'>, token: string, userId: string) {
    try {
      const request = new Request(
        `${this.url}/todos/${userId}.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...newTodo,
            ownerId: userId,
          }),
        },
      );
      return useRequest(request);
    } catch (err) {
      console.log(err);
    }
  }

  updateProduct(userId: string, token: string, data: Partial<ITodoItem>) {
    try {
      const request = new Request(
        `${this.url}/todos/${userId}/${data.id}.json?auth=${token}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
          }),
        },
      );
      return useRequest(request);
    } catch (err) {
      console.log(err);
    }
  }

  signUp(email: string, password: string) {
    try {
      const request = new Request(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        },
      );

      return useRequest(request);
    } catch (err) {
      throw new Error(err);
    }
  }

  verificationEmail(token: string) {
    try {
      const request = new Request(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken: token,
            returnSecureToken: true,
          }),
        },
      );

      return useRequest(request);
    } catch (err) {
      throw new Error(err);
    }
  }

  login(email: string, password: string) {
    try {
      const request = new Request(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        },
      );
      return useRequest(request);
    } catch (err) {
      throw new Error(err);
    }
  }
}

function useRequest(request: Request): Promise<Response> {
  const response = fetch(request);
  return response;
}

export const apiService = new ApiService(
  'https://js-simple-6efdf.firebaseio.com',
);

export default ApiService;
