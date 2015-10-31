# dacas

Cassandra DAO builder with promises

__NOTE: right now it is not working at all!__

requires node >=4.2

## Design goals

- [ ] Object to row mapper with Schema;
- [ ] Async operations return (native) Promises;
- [ ] Simple interface, thin code;
- [x] Uses [cassandra-driver](https://github.com/datastax/nodejs-driver);
- [ ] Easy debugging;
- [ ] Schema migrations, probably with an external module;
- [ ] Here should be some goal!

```javascript
  const db = require('dacas');

  db.connect('keyspace', {contactPoints: ['127.0.0.1']})
  .then(work, die);

  function work (db /* ??? */) {
    db.schema('User', {
      id: {
        type: db.Types.UUID,
        primary: true
      },
      name: String,
      // etc...
    });

    let user = db.model('User').create({name: 'John Doe'});

    user.save()
    .then(user => {
      console.dir( user.toObject() );
    }, die);

  }

  function die (err) {
    console.log('Got an error [%s] %s', err.name, err.message);
    process.exit();
  }
```
