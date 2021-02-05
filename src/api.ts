import {API_KEY} from '@env';
import {ITodoItem} from './types/index.d';

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

  delete(todoId: string, token: string) {
    try {
      const request = new Request(
        `${this.url}/todos/${todoId}.json?auth=${token}`,
        {
          method: 'DELETE',
        },
      );
      return useRequest(request);
    } catch (err) {
      console.log(err);
    }
  }

  get() {
    try {
      const request = new Request(this.url + '/todos.json', {
        method: 'get',
      });
      return useRequest(request);
    } catch (err) {
      console.log(err);
    }
  }
  createProduct(newTodo: ITodoItem, token: string, userId: string) {
    try {
      const request = new Request(`${this.url}/todos.json?auth=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTodo,
          ownerId: userId,
        }),
      });
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

function useRequest(request: Request) {
  const response = fetch(request);
  return response;
}

export const apiService = new ApiService(
  'https://js-simple-6efdf.firebaseio.com',
);

export default ApiService;

/*


updateProduct(id, title, description, imageUrl, token) {
    try {
      const request = new Request(
        `${this.url}/products/${id}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
          }),
        }
      );
      return useRequest(request);
    } catch (err) {
      console.log(err);
    }
  }

  createProduct(title, description, imageUrl, price, token, userId) {
    try {
      const request = new Request(`${this.url}/products.json?auth=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      });
      return useRequest(request);
    } catch (err) {
      console.log(err);
    }
  }


*/
