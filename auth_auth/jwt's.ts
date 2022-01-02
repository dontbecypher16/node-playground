// Encoded token example
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c


//Decoded
 // Would edit the payload and secret

// HEADER: //ALGORITHM & TOKEN TYPE

{

  "alg": "HS256",

  "typ": "JWT"

}

//PAYLOAD: //DATA

{

  "sub": "1234567890",

  "name": "John Doe",

  "iat": 1516239022

}

// VERIFY SIGNATURE

HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  // my 256 bit secret here
) 
//secret base64 encoded

////////////////////////////////////////////////////////////////////////////

// The video above shows in theory how to require a token to be present in order to perform an action. However, there is one big way that the solution above would not be sufficient for a real app, and that is how the JWT is passed to the API. In the video, you may have noticed that I get the token from req.body.token. And this technically works and is easy when testing with Postman and other tools. But in real life, the token will not be part of the request body. Instead, tokens live as part of the request header.

// There are many reasons for this, like added security. But that discussion is a bit outside the scope of this course, what we will focus on instead is how to get the token out of the header and use it in our logic. When we use JWTs, we pass them as a special header called the Authorization header using this format:

Authorization: Bearer <token>

// Where Bearer is a string separated by the token with a space.

// Getting the header

// In Node, we can locate the authorization header sent with a request like this:

const authorizationHeader = req.headers.authorization

// Very similar to the way we get the request body.



// Parsing the header

// Then, to get the token out of the authorization header, we need to do a little bit of Javascript string parsing. Remember that the word "Bearer" and the token are together as string, separated by a space. We can separate them with this logic:

const token = authorizationHeader.split(' ')[1]

// Where we split the string by the space, and take the second item. The second item is the token.

// Putting it all together

// Now we have a way to get the token from its correct location in the authorization header, so the code from the video could be revised to look like this:

const create = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

   // ....rest of method is unchanged
}

// And this would work. But to be even more professional about this, let's make this process of requiring token verification easily replicable by turning it into a function.

// Making a custom Express middleware

// In the handler file, we are going to add a new function called verifyAuthToken. I'll first show you the function, most of the logic is a direct copy from the create method above:

const verifyAuthToken = (req: Request, res: Response, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        next()
    } catch (error) {
        res.status(401)
    }
}

// Things to note:

// This function takes in three arguments, req and res (exactly like a route handler) and another called next. This is how we create a custom Express middleware.

// We complete the function, not with a return but by calling next. If the token could not be verified, we will send that 401 error.

// Now, we can tell Express to use this middleware, like this:

const mount = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', verifyAuthToken, create)
    app.put('/users/:id', verifyAuthToken, update)
    app.delete('/users/:id', verifyAuthToken, destroy)
}

// So, for the CREATE route, you can see that the request will come in and verifyAuthToken will be called before the handler's create method.

// And that's it! You've created a custom Express middleware!