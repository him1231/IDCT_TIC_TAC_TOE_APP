const baseUrl = '221.124.103.231:3000';

const urlPath = {
  getToken: '/getToken',
  login: '/login',
  logout: '/logout',
  signUp: '/signUp',
  create: '/create',
  rooms: '/rooms',
  join: '/join',
  leave: '/leave',
  room: '/room',
};

let csrfToken = '';

const formBody = (obj: {[key: string]: string}) => {
  var formBody = [];
  for (var property in obj) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(obj[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
};

const getUrl = (key: keyof typeof urlPath) => {
  return 'http://' + baseUrl + urlPath[key];
};

const getToken = async () => {
  return await fetch(getUrl('getToken'))
    .then(response => response.json())
    .then(json => {
      return json.csrfToken as string;
    })
    .catch(error => {
      console.error(error);
      return '';
    });
};

export const logout = async () => {
  return await fetch(getUrl('logout'))
    .then(() => {
      return;
    })
    .catch(error => {
      console.error(error);
      return;
    });
};

export const login = async (username: string, pass: string) => {
  await logout();
  csrfToken = await getToken();
  if (csrfToken === '') {
    return false;
  }

  return await fetch(getUrl('login'), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRF-Token': csrfToken,
    },
    body: formBody({
      username,
      pass,
    }),
  })
    .then(response => response.json())
    .then(json => {
      if (json.redirect !== undefined) {
        return true;
      }
      return false;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
};

export const signUp = async (username: string, pass: string, pass2: string) => {
  await logout();
  csrfToken = await getToken();
  if (csrfToken === '') {
    return false;
  }
  return await fetch(getUrl('signUp'), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRF-Token': csrfToken,
    },
    body: formBody({
      username,
      pass,
      pass2,
    }),
  })
    .then(response => response.json())
    .then(json => {
      if (json.redirect !== undefined) {
        return 'success';
      } else if (json.error !== undefined) {
        return json.error;
      }
      return 'unknow error';
    })
    .catch(error => {
      console.error(error);
      return 'error';
    });
};

type RoomState = 'Waiting' | 'Playing' | 'Finished';

export type Room = {
  players: (string | null)[];
  state: RoomState;
  winner: string;
  turn: number;
  nextPlayer: boolean;
  lastTurn: any[];
  board: string[][];
  spectators: {[key: string]: string};
  _id: '61b22425b413289cf85038db';
  name: 'testRoomName';
  creator: 'testacc';
  date: '2021-12-09T15:43:33.937Z';
  __v: 1;
};

export const create = async (name: string) => {
  return await fetch(getUrl('create'), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRF-Token': csrfToken,
    },
    body: formBody({
      name,
    }),
  })
    .then(response => response.json())
    .then(json => {
      return json as Room;
    })
    .catch(error => {
      console.error(error);
      return undefined;
    });
};

export const rooms = async () => {
  return await fetch(getUrl('rooms'))
    .then(response => response.json())
    .then(json => {
      console.log('rooms response json', json);

      return json as Room[];
    })
    .catch(error => {
      console.error(error);
      return [];
    });
};

export const room = async () => {
  return await fetch(getUrl('room'))
    .then(response => response.json())
    .then(json => {
      if (json.error === undefined) {
        return json as Room;
      } else {
        return undefined;
      }
    })
    .catch(error => {
      console.error(error);
      return undefined;
    });
};

export const join = async (id: string) => {
  return await fetch(getUrl('join'), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRF-Token': csrfToken,
    },
    body: formBody({
      id,
    }),
  })
    .then(response => response.json())
    .then(json => {
      if (json.error === undefined) {
        return json as Room;
      } else {
        return undefined;
      }
    })
    .catch(error => {
      console.error(error);
      return undefined;
    });
};

export const leave = async () => {
  return await fetch(getUrl('leave'), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRF-Token': csrfToken,
    },
  })
    .then(response => response.json())
    .then(json => {
      return json as Room;
    })
    .catch(error => {
      console.error(error);
      return undefined;
    });
};
