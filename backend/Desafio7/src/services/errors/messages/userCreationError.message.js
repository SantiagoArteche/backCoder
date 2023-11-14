export const generateUserErrorInfo = (user) => {
  return `Una o mas propiedades fueron enviadas incompletas o no son validas
          Lista de propiedades requeridas:
          --> first_name: type String, recibido ${user.first_name}
          --> email: type String, recibido ${user.email}
          --> last_name: type String, recibido ${user.last_name}
          --> age: type Number, recibido ${user.age}
          --> password: type String, recibido ${user.pasword}
          --> email: type String, recibido ${user.email}
          `;
};
