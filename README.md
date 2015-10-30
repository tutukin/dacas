# dacas

Cassandra DAO builder with promises

__NOTE: right now it is not working at all!__

requires node >=4.2

```javascript
  const dacas = require('dacas');

  dacas.connect('keyspace', {contactPoints: ['127.0.0.1']})
  .then(work, die);

  function work (connection) {
    // connection may provide some useful info

    dacas.schema('User', {
      id: {
        type: 'uuid',
        primary: true
      },
      name: String,
      // etc...
    });

    let user = dacas.model('User').create({name: 'John Doe'});

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
