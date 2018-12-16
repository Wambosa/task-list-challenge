# wonderschool
_code challenge_

There are 3 sections to the readme, one for each part of the challenge. 
My response to `challenge 1` may be found [here on my portfolio site][wonderschool] and [on github (src)][github]. 
While the database schema requested in `challenge 2` can be found [in the github repo as well][schema].
Finally `challenge 3` has it's reply [within this very readme down by the API section][API].
I enjoyed this test. I hope you enjoy scanning it :)


------------------------------------------------------------------------


### Clientside
_some notes about front end decisions_


![preview][gif]


##### conflicted decisions

###### not use the svg checkbox
[CSS was used to style the checkbox][pretty-check] instead of my own custom code.
It was quite fast and produced the "same" user experience with less code and one less asset to manage.
I feel like diverging too much from what was asked might be a downfall, yet, I can't help but make it "better".


###### umd dependencies _(universal module definitions)_
It isn't _"the right way"_ I'd say to make mosts apps.
My thinking is two fold; _"Lets knock this out today so we can get to the phone call soon."_
and _"Hey, I wonder if this will work?"_. As mentioned before, 
I may be taking too much risk building it this way instead of the traditional 
`create-react-app` with it's superior support. Hopefully you think its cool instead of scary
that javascript can be so flexible, diverse, and powerful. _(deploy size is 35kb)_

###### changed some payload keys
it was driving me nuts that they didn't match the database. I let go of `group` vs `tag`.

------------------------------------------------------------------------


### Schema
_some notes about the [schema.sql file found in this repo][schema]_

##### sqlite
sqlite because this is a rapid one day prototype :)
I want to execute the code to make sure it is sane.

##### datatypes
`varchar` over `nvarchar` because faster to type and smaller footprint.
The advantage of unicode nvarchar is not required since this is not multilingual yet

`timestamp` instead of `datetime` because sqlite makes the `DEFAULT CURRENT_TIMESTAMP`
there is a larger footprint. space savings techniques by using epoch is possible, however less readable.

##### normalization
_I didn't mean to go all 5th form_

Since this data is so small, it was easy and cheap to do.
This is usually not the goal though since space is so cheap, typically performance is a bigger concern.
Especially if the data is published to us, I would not try to normalize 3rd party stuff.


------------------------------------------------------------------------


### API
_Lets pretend the vanity domain is wonderschool.com.
assumption: we know who the current user is because of an apikey header._

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
[wonderschool]: shondiaz.com/wonderschool
[api]: https://github.com/Wambosa/wonderschool/blob/master/README.md#API
[pretty-check]: https://lokesh-coder.github.io/pretty-checkbox/
[gif]: https://user-images.githubusercontent.com/6006222/50050847-2c6a4080-00cc-11e9-9b86-3f6e2c8f2ee7.gif