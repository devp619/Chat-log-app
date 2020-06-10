## Task

Build a Chatlog. 

Chose any Javascript Framework/Library (React/Angular/Vanilla) JS to do this task.

1. 2 JSON files namely, `messages.json` and `members.json` are provided.
2. Create a mock API using any mock servers, node servers, etc. 
3. Using HTTP fetch method, get these data.
4. Resolve both to an array of chatlog messages in the following format, sorted by time.

```json
[
  {
    "messageId": "12356",
    "userId": "613651251",
    "fullName": "Robin Balmforth",
    "timestamp": "2017-02-23T14:57:20.629Z",
    "email": "robin@example.com",
    "message": "Hello, World!",
    "avatar": null
  },
  ...
]
```
5. Display the `avatar` where applicable
6. Display the `email` on hover of `avatar`
7. Format the `timestamp` to be human readable
8. Display fullName on top or below the message. 
9. Push on a public GitHub repository.

