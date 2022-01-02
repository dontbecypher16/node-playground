//handlers/users.ts --> CREATE

const create = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password,
    }
    try {
        const newUser = await store.create(user)
        var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err + user)
    }
}

//handlers/users.ts --> AUTHENTICATE

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  }
  try {
      const u = await store.authenticate(user.username, user.password)
      var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
      res.json(token)
  } catch(error) {
      res.status(401)
      res.json({ error })
  }
}

//handlers/books.ts --> CREATE

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

    try {
        const book: Book = {
            title: req.body.title,
            author: req.body.author,
            total_pages: req.body.total_pages,
            summary: req.body.summary
        }

        const newBook = await store.create(book)
        res.json(newBook)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

//handler/books.ts --> DELETE

const destroy = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
    } catch (error) {
        res.status(400)
        res.json({ error })
    }
}


// Make sure users can only edit their own information. The important thing to remember for this is that the token carries the user information - including their id. This is a useful extra challenge because in real world apps, the primary use for JWTs is for authorization, or, figuring out if a person is allowed to do the action they are trying to do. Typically apps will give users roles, and different roles (like ADMIN, or GUEST) have different abilities within the app. Authorization can get pretty tricky so that's as far as I'm going to for now, but its nice to dip a toe into the idea of authorization in this challenge. You'll notice that this example is simplistic, and doesn't do everything that would be required in a real situation, but its just to open up the idea of what can be done with JWTs and authorization.

handlers/users.ts --> UPDATE

const update = async (req: Request, res: Response) => {
    const user: User = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password: req.body.password,
    }
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        if(decoded.id !== user.id) {
            throw new Error('User id does not match!')
        }
    } catch(err) {
        res.status(401)
        res.json(err)
        return
    }

    try {
        const updated = await store.create(user)
        res.json(updated)
    } catch(err) {
        res.status(400)
        res.json(err + user)
    }
}

