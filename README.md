# task list challenge
_code challenge_

There are 3 sections to the readme, one for each part of the challenge. 
My response to `challenge 1` may be found [here on my portfolio site][live-demo] and [on github (src)][github]. 
While the database schema requested in `challenge 2` can be found [in the github repo as well][schema].
Finally `challenge 3` has it's reply [within this very readme down by the API section][API].
I enjoyed this test. I hope you enjoy scanning it :)


------------------------------------------------------------------------


### Clientside
_some notes about front end decisions_


![preview][gif]


------------------------------------------------------------------------


### API

##### [PUT] /task/{id}
_This endpoint can be used to uncheck/check, or even update other dependencies._

###### body
_optional params in the body are used to edit what you need_

```javascript
  {
    name: "string",
    tags: ["string"],
    needs: [1, 2, 3],
    done: true
  }
```
###### response
_200 the full updated task comes back_

```javascript
  {
    name: "string",
    tags: ["string"],
    needs: [1, 2, 3],
    done: true
  }
```

##### [POST] /task
_creates a new task_

###### body
_New task minimum parameters. New task is assumed `done:false`._
```javascript
  {
    name: "string",
    tags: ["string"],
    needs: [9000],
  }
```
###### success
_200 the full new task comes back_

```javascript
  {
    name: "string",
    tags: ["string"],
    needs: [9000],
    done: false
  }
```

##### Errors
_a quick write up_
```javascript
//4xx
  {
    message: "invalid {parameterName}",
    help: "https://wonderschool.com/swagger"
  }
//5xx
  {
    message: "an error occured on the server",
    help: "https://wonderschool.com/status/healthcheck"
  }
```


----------

[schema]: https://github.com/Wambosa/wonderschool/blob/master/schema.sql
[github]: github.com/Wambosa/wonderschool
[live-demo]: http://shondiaz.com/wonderschool/
[api]: https://github.com/Wambosa/wonderschool/blob/master/README.md#API
[pretty-check]: https://lokesh-coder.github.io/pretty-checkbox/
[gif]: https://user-images.githubusercontent.com/6006222/50050847-2c6a4080-00cc-11e9-9b86-3f6e2c8f2ee7.gif