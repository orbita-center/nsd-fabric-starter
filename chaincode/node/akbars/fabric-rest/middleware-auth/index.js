//3rd-party auth-store
const credentials = [{
    username: 'admin',
    password: undefined,
    org: 'org1'
  }];
  
  module.exports = function auth(username, password, orgname) {
    const user = credentials.find(obj => obj.username === username && obj.org === orgname && obj.password === password);
    return user ? Promise.resolve(user) : Promise.reject({status: 401, message: 'invalid credentials'});
  };