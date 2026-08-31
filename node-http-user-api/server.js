import http from "http";

const PORT = 3000;

const users = [
  {
    id: 1,
    name: "Ali",
    age: 25,
  },
  {
    id: 2,
    name: "Qasim",
    age: 22,
  },
];

function validateUser(user) {
  if (!user.name) {
    return "Name is required!";
  }

  if (!user.age) {
    return "Age is required!";
  }

  if (typeof user.name !== "string") {
    return "Name must be a string type";
  }

  if (typeof user.age !== "number") {
    return "Age must be number!";
  }

  if (user.age < 0) {
    return "Age cant be negative";
  }

  return null;
}

function validatePatchUser(user) {
  if (user.name !== undefined) {
    if (typeof user.name !== "string") {
      return "Name must be a string";
    }
  }

  if (user.age !== undefined) {
    if (typeof user.age !== "number" || Number.isNaN(user.age)) {
      return "Age must be a valid number";
    }

    if (user.age < 0) {
      return "Age cannot be negative";
    }
  }

  return null;
}

function getUserId(value) {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}


function sendJSON(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}


function getRequestBody(req) {

  return new Promise((resolve,reject) => {

    let body = ''

    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => {
      resolve(body)
    })

    req.on('error', () => {
      reject(error)
    })
  })
}



const server = http.createServer( async (req, res) => {
  
  const url = new URL(req.url, `http://${req.headers.host}`)
  const parts = url.pathname.split('/')

  // GET /
  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("User Management API");

  // GET /users
  } else if (req.method === "GET" && url.pathname === "/users") {

    const name = url.searchParams.get('name')
    const age = url.searchParams.get('age')
    const page = Number(url.searchParams.get('page')) || 1
    const limit = Number(url.searchParams.get('limit')) || 10
    const sort = url.searchParams.get('sort')

    let filteredUsers = [...users]


     if(name && age) {

      const filteredUsers = users.find(user => user.name.toLowerCase() === name.toLowerCase() && user.age === Number(age))

      sendJSON(req,200,filteredUsers)

      return
    }


    if(name) {

      const filteredUsers = users.find(user => user.name.toLowerCase() === name.toLowerCase())

      sendJSON(req,200,filteredUsers)

      return
    }

    if(age) {

      const ageNumber = Number(age)

   if (!Number.isInteger(ageNumber) || ageNumber < 0) {

    sendJSON(res, 400, {
      error: "Age must be a valid positive number!"
    });

    return;
  }


      const filteredUsers = users.find(user => user.age === ageNumber)

      sendJSON(req,200,filteredUsers)

      return
    }

    if(sort === 'name') {

      filteredUsers.sort((a,b) =>
      a.name.localeCompare(b.name))

    } else if(sort === 'age') {

      filteredUsers.sort((a,b) => a.age - b.age)
    }

    const start = (page - 1) * limit

    const paginatedUsers = filteredUsers.slice(start, start + limit)
    const totalPages = Math.ceil(filteredUsers.length / limit)


    sendJSON(res, 200, {
      data: paginatedUsers,
      pagination: {
        page: page,
        limit: limit,
        total: paginatedUsers.length,
        totalPages: totalPages
      }
    });

  // GET /users/:id
  } else if (req.method === "GET" && parts[1] === "users" && parts[2]) {
    const id = getUserId(parts[2]);

    if (id === null) {
      sendJSON(res, 400, {
        error: "Invalid user ID!",
      });

      return;
    }

    const user = users.find((user) => user.id === id);

    if (!user) {
      sendJSON(res, 404, {
        error: "User not found!",
      });

      return;
    }

    sendJSON(res, 200, user);

  // POST /users
  } else if (req.method === "POST" && req.url === "/users") {
  

      try {

        const body = await getRequestBody(req``)
        const user = JSON.parse(body);
        const error = validateUser(user);

        if (error) {
          sendJSON(res, 400, {
            error: error,
          });

          return;
        }

        const newId =
          users.length > 0
            ? Math.max(...users.map((user) => user.id)) + 1
            : 1;

        user.id = newId;
        users.push(user);

        const response = {
          message: "User created!",
          user: user,
        };

        sendJSON(res, 201, response);

      } catch (error) {
        sendJSON(res, 400, {
          error: "Invalid JSON!",
        });
      }
    

  // PUT /users/:id
  } else if (req.method === "PUT" && parts[1] === "users" && parts[2]) {
    const id = getUserId(parts[2]);

    if (id === null) {
      sendJSON(res, 400, {
        error: "Invalid user ID!",
      });

      return;
    }

    const user = users.find((user) => user.id === id);

    if (!user) {
      sendJSON(res, 404, {
        error: "User not found!",
      });

      return;
    }

  
      try {

        const body = await getRequestBody(req)
        const updatedUser = JSON.parse(body);
        const error = validateUser(updatedUser);

        if (error) {
          sendJSON(res, 400, {
            error: error,
          });

          return;
        }

        user.name = updatedUser.name;
        user.age = updatedUser.age;

        const response = {
          message: "User updated",
          user: user,
        };

        sendJSON(res, 200, response);

      } catch (error) {
        sendJSON(res, 400, {
          error: "Invalid JSON!",
        });
      }
    

  // PATCH /users/:id
  } else if (req.method === "PATCH" && parts[1] === "users" && parts[2]) {
    const id = getUserId(parts[2]);

    if (id === null) {
      sendJSON(res, 400, {
        error: "Invalid user ID!",
      });

      return;
    }

    const user = users.find((user) => user.id === id);

    if (!user) {
      sendJSON(res, 404, {
        error: "User not found!",
      });

      return;
    }

    let body = "";

    
      try {

        const body = await getRequestBody(req)
        const updatedUser = JSON.parse(body);
        const error = validatePatchUser(updatedUser);

        if (error) {
          sendJSON(res, 400, {
            error: error,
          });

          return;
        }

        if (updatedUser.name !== undefined) {
          user.name = updatedUser.name;
        }

        if (updatedUser.age !== undefined) {
          user.age = updatedUser.age;
        }

        sendJSON(res, 200, {
          message: "User updated!",
          user: user,
        });

      } catch (error) {
        sendJSON(res, 400, {
          error: "Invalid JSON!",
        });
      }
    

  // DELETE /users/:id
  } else if (req.method === "DELETE" && parts[1] === "users" && parts[2]) {
    const id = getUserId(parts[2]);

    if (id === null) {
      sendJSON(res, 400, {
        error: "Invalid user ID!",
      });

      return;
    }

    const userExists = users.some((user) => user.id === id);

    if (!userExists) {
      sendJSON(res, 404, {
        error: "User not found!",
      });

      return;
    }

    const user = users.find((user) => user.id === id);

    const remainingUsers = users.filter((user) => user.id !== id);

    users.length = 0;
    users.push(...remainingUsers);

    sendJSON(res, 200, {
      message: "User deleted!",
      user: user,
    });

  // Unknown route
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Route not found!");
  }
});

server.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`);
});